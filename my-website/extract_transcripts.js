const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, 'docs');
const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

for (const file of files) {
    const filePath = path.join(docsDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    // Find where the JSON starts. Look for "responseContext"
    const contextIndex = content.indexOf('"responseContext":');
    if (contextIndex === -1) continue;

    // Find the opening brace before responseContext
    const startIndex = content.lastIndexOf('{', contextIndex);
    if (startIndex === -1) continue;

    const markdownPart = content.substring(0, startIndex);
    const jsonPart = content.substring(startIndex);

    try {
        const data = JSON.parse(jsonPart);

        let texts = [];
        function findTexts(obj) {
            if (Array.isArray(obj)) {
                obj.forEach(findTexts);
            } else if (typeof obj === 'object' && obj !== null) {
                if (obj.transcriptSegmentRenderer && obj.transcriptSegmentRenderer.snippet && obj.transcriptSegmentRenderer.snippet.runs) {
                    const text = obj.transcriptSegmentRenderer.snippet.runs.map(r => r.text).join('');
                    texts.push(text);
                } else {
                    for (const key of Object.keys(obj)) {
                        findTexts(obj[key]);
                    }
                }
            }
        }
        findTexts(data);

        let transcriptText = texts.join(' ');

        console.log(`Extracted ${transcriptText.length} characters from ${file}`);

        let newContent = markdownPart;
        if (transcriptText.length > 0) {
            newContent += "\n\n## Transcript\n\n" + transcriptText + "\n";
        } else {
            // fallback: wrap JSON in code block
            newContent += "\n\n```json\n" + jsonPart.substring(0, 1000) + "\n... (JSON truncated)\n```\n";
        }

        fs.writeFileSync(filePath, newContent);

    } catch (e) {
        console.error(`Failed to parse JSON in ${file}`, e.message);
        // wrap in json if parse failed
        const newContent = markdownPart + "\n\n```json\n" + jsonPart.substring(0, 1000) + "\n... (JSON truncated)\n```\n";
        fs.writeFileSync(filePath, newContent);
    }
}
