import sys
import os
import re
import time
import random
from youtube_transcript_api import YouTubeTranscriptApi

def sanitize_filename(filename):
    # Remove characters that are not allowed in filenames
    clean = re.sub(r'[\\/*?:"<>|]', "", filename)
    # Standardize spaces to underscores and remove period prefixes from title parts
    clean = re.sub(r'^\d+\.\s*', '', clean) # Remove leading numbers like "1. "
    return clean.strip().replace(" ", "_").replace("__", "_")

def format_timestamp(seconds):
    minutes = int(seconds // 60)
    seconds = int(seconds % 60)
    return f"{minutes:02d}:{seconds:02d}"

def get_transcripts():
    # Setup paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    input_file = os.path.join(script_dir, 'playlist_items.txt')
    output_dir = os.path.join(project_root, 'transcripts')
    
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
        print(f"Created directory: {output_dir}")
        
    if not os.path.exists(input_file):
        print(f"Error: {input_file} not found at {input_file}")
        return

    # Read video list
    with open(input_file, 'r') as f:
        lines = [line.strip() for line in f if line.strip()]

    # Lines are: Title, ID, Title, ID, ...
    videos = []
    for i in range(0, len(lines), 2):
        if i + 1 < len(lines):
            videos.append({'title': lines[i], 'id': lines[i+1]})

    print(f"Loaded {len(videos)} videos from playlist.")

    # Initialize the API client as used previously
    api = YouTubeTranscriptApi()
    
    successful_count = 0
    
    for index, video in enumerate(videos, 1):
        sanitized_title = sanitize_filename(video['title'])
        filename = f"{index:02d}_{sanitized_title}.md"
        output_path = os.path.join(output_dir, filename)
        
        # Check if we already have it and it's valid (not an error file)
        if os.path.exists(output_path):
            with open(output_path, 'r') as existing:
                content = existing.read()
                # If it has the transcript header and no error string, skip it
                if "## Transcript" in content and "Error fetching transcript" not in content and len(content) > 2000:
                    print(f"[{index}/{len(videos)}] Skipping (valid file exists): {video['title']}")
                    continue

        print(f"[{index}/{len(videos)}] Fetching transcript for: {video['title']} ({video['id']})")
        
        retries = 2
        success = False
        
        for attempt in range(retries):
            try:
                # Base delay before any attempt
                base_delay = random.uniform(20, 40)
                if attempt > 0:
                    # Exponential backoff for retries
                    retry_delay = 120 * (2 ** (attempt - 1))
                    print(f"    Waiting {retry_delay} seconds (retry attempt {attempt})...")
                    time.sleep(retry_delay)
                else:
                    print(f"    Waiting {base_delay:.2f} seconds to avoid IP block...")
                    time.sleep(base_delay)
                
                # Fetch transcript
                transcript_data = api.fetch(video['id'])
                
                with open(output_path, 'w') as out:
                    out.write(f"# {video['title']}\n\n")
                    out.write(f"Video URL: https://www.youtube.com/watch?v={video['id']}\n\n")
                    out.write(f"## Transcript\n\n")
                    
                    for snippet in transcript_data:
                        try:
                            start = snippet['start']
                            text = snippet['text']
                        except (TypeError, KeyError):
                            start = snippet.start
                            text = snippet.text
                            
                        timestamp = format_timestamp(start)
                        text = text.replace('\n', ' ')
                        out.write(f"[{timestamp}] {text}\n")
                        
                print(f"    Successful! Saved to: {filename}")
                successful_count += 1
                success = True
                break # Exit retry loop on success
                
            except Exception as e:
                error_str = str(e).lower()
                is_block = any(word in error_str for word in ["429", "blocked", "ipblocked", "captcha", "too many requests"])
                
                if is_block:
                    print(f"    Attempt {attempt+1} BLOCKED. Error message contains blocking keyword.")
                    if attempt == retries - 1:
                        # On final failure
                        with open(output_path, 'w') as out:
                            out.write(f"# {video['title']}\n\n")
                            out.write(f"Video URL: https://www.youtube.com/watch?v={video['id']}\n\n")
                            out.write(f"*(Error fetching transcript after {retries} attempts: IP was blocked)*\n")
                    else:
                        print(f"    Retrying after backoff...")
                else:
                    # Non-blocking error
                    print(f"    Failed! Non-blocking Error: {e}")
                    with open(output_path, 'w') as out:
                        out.write(f"# {video['title']}\n\n")
                        out.write(f"Video URL: https://www.youtube.com/watch?v={video['id']}\n\n")
                        out.write(f"*(Error fetching transcript: {str(e)})*\n")
                    break # Exit retry loop for other errors

    print(f"\nFinal: {successful_count} new transcripts processed and saved to {output_dir}")

if __name__ == "__main__":
    get_transcripts()
