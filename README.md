# CS & Dev Notes 📚

Welcome to the **CS & Dev Notes** project! This repository is designed to be a comprehensive, first-principles-based knowledge base for various Computer Science and Development subjects.

## 📁 Project Structure

All documentation is located in the `my-website/docs/` directory and follows a hierarchical structure:

```bash
my-website/docs/
├── Subject Name/           # e.g., Backend Engineering, DevOps
│   ├── _category_.json     # Mandatory for sidebar labeling
│   ├── Version 1/          # Individual version folder
│   │   ├── _category_.json # Mandatory for version labeling
│   │   └── intro.md        # Document file
│   └── Version 2/
└── ...
```

---

## 🚀 How to Add New Documentation

### 1. Adding a New Subject
To add a completely new subject (e.g., "Frontend Development"):
1. Create a new folder in `my-website/docs/`:
   ```bash
   mkdir "my-website/docs/Frontend Development"
   ```
2. Create a `_category_.json` file inside that folder to define its label and position in the sidebar:
   ```json
   {
     "label": "Frontend Development",
     "position": 7
   }
   ```
3. Add a subject card to the homepage in `my-website/src/pages/index.tsx` within the `FeatureList` array to make it accessible from the landing page.

### 2. Adding a New Version
If you want to start a new version of notes for an existing subject:
1. Create a new folder inside the subject folder:
   ```bash
   mkdir "my-website/docs/Subject Name/Version 3"
   ```
2. Create a `_category_.json` file inside the new version folder:
   ```json
   {
     "label": "Version 3",
     "position": 3
   }
   ```

### 3. Adding or Pasting a New Document
To add a new note or document:
1. Create a `.md` file in the appropriate version folder:
   ```bash
   touch "my-website/docs/Subject Name/Version X/My_New_Note.md"
   ```
2. Standard Markdown is supported.
3. **Important**: By default, Docusaurus will use the filename as the URL and title. You can customize this by adding frontmatter at the top of the file:
   ```markdown
   ---
   title: My Custom Title
   description: A brief summary of this note.
   ---
   # My New Note
   ```

### 4. Customizing the Sidebar
You can control the order of documents within a folder by prefixing the filename with a number (e.g., `01_Intro.md`, `02_Deep_Dive.md`) or by adding a `sidebar_position` to the file's frontmatter.

---

## 🛠️ Build & Verify
After making changes, always verify that the documentation renders correctly:

1. Navigate to the website directory:
   ```bash
   cd my-website
   ```
2. Run the build command:
   ```bash
   npm run build
   ```
3. Check for any "Broken link" warnings in the console output. If the build finishes with `[SUCCESS]`, your changes are ready!

---

## 🤖 For AI Agents
Guidelines and project context for AI agents can be found in the `agents/` directory.
- `IDENTITY.md`: Project mission and brand tone.
- `KNOWLEDGE_STRUCTURE.md`: Deep dive into the versioning and categorization logic.
- `GUIDELINES.agents`: Technical rules for file operations and builds.
