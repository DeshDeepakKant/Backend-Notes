const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'transcripts');
const outputDir = path.join(__dirname, 'clean-transcripts');

if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

const files = fs.readdirSync(inputDir)
    .filter(f => f.endsWith('.md'))
    .sort();

console.log(`Found ${files.length} files to process...\n`);

for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);

    const raw = fs.readFileSync(inputPath, 'utf-8').trim();

    // Extract the title from filename: remove number prefix and extension, replace underscores
    const title = file
        .replace(/^\d+_?/, '')       // remove leading number
        .replace(/\.md$/, '')        // remove extension
        .replace(/_/g, ' ');         // underscores -> spaces

    let transcriptText = '';

    try {
        const data = JSON.parse(raw);

        const segments = [];

        function extract(obj) {
            if (Array.isArray(obj)) {
                obj.forEach(extract);
            } else if (obj && typeof obj === 'object') {
                // Main transcript segment structure
                if (
                    obj.transcriptSegmentRenderer &&
                    obj.transcriptSegmentRenderer.snippet &&
                    obj.transcriptSegmentRenderer.snippet.runs
                ) {
                    const text = obj.transcriptSegmentRenderer.snippet.runs
                        .map(r => r.text || '')
                        .join('');
                    const startMs = parseInt(
                        obj.transcriptSegmentRenderer.startMs || '0', 10
                    );
                    segments.push({ startMs, text });
                } else {
                    for (const key of Object.keys(obj)) {
                        extract(obj[key]);
                    }
                }
            }
        }

        extract(data);

        // Sort segments by timestamp
        segments.sort((a, b) => a.startMs - b.startMs);

        // Format as readable paragraphs — group every ~5 segments into a paragraph
        const CHUNK = 5;
        const paragraphs = [];
        for (let i = 0; i < segments.length; i += CHUNK) {
            const chunk = segments.slice(i, i + CHUNK);
            paragraphs.push(chunk.map(s => s.text).join(' '));
        }

        transcriptText = paragraphs.join('\n\n');

        const segCount = segments.length;
        const wordCount = transcriptText.split(/\s+/).length;
        console.log(`✅ ${file} — ${segCount} segments, ~${wordCount} words`);

    } catch (err) {
        console.error(`❌ ${file} — JSON parse failed: ${err.message}`);
        // Save raw content wrapped in a code block as fallback
        transcriptText = '> ⚠️ Could not parse transcript data.\n';
    }

    const markdown = `# ${title}\n\n${transcriptText}\n`;
    fs.writeFileSync(outputPath, markdown, 'utf-8');
}

console.log(`\n✅ Done! Clean transcripts saved to: clean-transcripts/`);
