import os
import re

# This script is intended to be run by the AI agent to process files using its integrated LLM capabilities.
# Since the agent has a 'view_file' and 'replace_file_content' tools, it can act as the 'LLM transformer'.
# However, for a systematic approach, I will list the files and process them one by one.

DOCS_DIR = "/home/anya/Backend from first principles/my-website/docs/transcripts"

def get_all_md_files(directory):
    md_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith(".md"):
                md_files.append(os.path.join(root, file))
    return md_files

def process_transcripts():
    files = get_all_md_files(DOCS_DIR)
    print(f"Found {len(files)} files to transform.")
    for file_path in files:
        print(f"TRANSFORM_TARGET: {file_path}")

if __name__ == "__main__":
    process_transcripts()
