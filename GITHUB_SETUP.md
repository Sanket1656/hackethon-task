# 🚀 GitHub Repository Setup Guide

This guide will help you set up your GitHub repository and push your code.

## 📋 Prerequisites

- Git installed on your computer
- GitHub account created
- Project files ready to push

## 🔧 Step-by-Step Setup

### Step 1: Initialize Git Repository

Open your terminal in the project directory and run:

```bash
git init
```

This creates a new Git repository in your project folder.

### Step 2: Configure Git (First Time Only)

If you haven't configured Git before, set your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 3: Add All Files

Add all project files to Git:

```bash
git add .
```

This stages all files for commit. The `.gitignore` file ensures sensitive files are excluded.

### Step 4: Create Initial Commit

Commit your files with a message:

```bash
git commit -m "Initial commit: PDF Upload & Tracking System"
```

### Step 5: Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click the "+" icon in the top right
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `pdf-upload-tracking-system`
   - **Description**: "A full-stack MERN application for uploading and tracking PDF files"
   - **Visibility**: Public
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

### Step 6: Connect Local Repository to GitHub

Copy the commands from GitHub's "push an existing repository" section, or use:

```bash
git remote add origin https://github.com/Sanket1656/pdf-upload-tracking-system.git
git branch -M main
git push -u origin main
```

### Step 7: Verify Upload

1. Refresh your GitHub repository page
2. You should see all your files uploaded
3. Verify that `.env` and `uploads/` files are NOT visible (they're in `.gitignore`)

## 🔒 Security Checklist

Before pushing, ensure:

- [ ] `.env` file is deleted or not tracked
- [ ] `server/.env` is in `.gitignore`
- [ ] `server/uploads/` contains only `.gitkeep`
- [ ] No sensitive data in code
- [ ] `.env.example` files are present
- [ ] All passwords/keys are removed

## 📝 Making Changes

After the initial setup, use these commands for updates:

### 1. Check Status
```bash
git status
```

### 2. Add Changes
```bash
# Add specific files
git add filename.js

# Or add all changes
git add .
```

### 3. Commit Changes
```bash
git commit -m "Description of changes"
```

### 4. Push to GitHub
```bash
git push
```

## 🌿 Working with Branches

### Create a New Branch
```bash
git checkout -b feature-name
```

### Switch Between Branches
```bash
git checkout main
git checkout feature-name
```

### Merge Branch to Main
```bash
git checkout main
git merge feature-name
```

### Push Branch to GitHub
```bash
git push -u origin feature-name
```

## 🔄 Pulling Changes

If you're working on multiple devices or with collaborators:

```bash
# Pull latest changes
git pull origin main

# Or fetch and merge separately
git fetch origin
git merge origin/main
```

## 📦 Common Git Commands

| Command | Description |
|---------|-------------|
| `git status` | Check current status |
| `git log` | View commit history |
| `git diff` | See changes before commit |
| `git reset HEAD~1` | Undo last commit (keep changes) |
| `git reset --hard HEAD~1` | Undo last commit (discard changes) |
| `git stash` | Temporarily save changes |
| `git stash pop` | Restore stashed changes |

## 🐛 Troubleshooting

### "Permission denied" Error

If you get authentication errors:

1. **Use Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate new token with `repo` scope
   - Use token as password when pushing

2. **Or Setup SSH**:
   ```bash
   ssh-keygen -t ed25519 -C "your.email@example.com"
   cat ~/.ssh/id_ed25519.pub
   ```
   - Copy the output
   - Add to GitHub Settings → SSH and GPG keys

### "Repository not found" Error

Verify the remote URL:
```bash
git remote -v
```

Update if needed:
```bash
git remote set-url origin https://github.com/Sanket1656/pdf-upload-tracking-system.git
```

### Accidentally Committed Sensitive Files

Remove from Git history:
```bash
git rm --cached server/.env
git commit -m "Remove .env from tracking"
git push
```

### Large Files Error

GitHub has a 100MB file size limit. For large files:
- Use Git LFS (Large File Storage)
- Or store files elsewhere (AWS S3, etc.)

## 📚 Git Best Practices

1. **Commit Often**: Make small, focused commits
2. **Write Clear Messages**: Describe what and why
3. **Use Branches**: Keep main branch stable
4. **Pull Before Push**: Avoid conflicts
5. **Review Changes**: Use `git diff` before committing
6. **Don't Commit Secrets**: Use `.gitignore` and `.env`

## 🔗 Useful Resources

- [Git Documentation](https://git-scm.com/doc)
- [GitHub Guides](https://guides.github.com/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials)

## 📞 Need Help?

- Check GitHub's [Help Documentation](https://docs.github.com/)
- Visit [Stack Overflow](https://stackoverflow.com/questions/tagged/git)
- Ask in GitHub Community Discussions

## 🎯 Next Steps

After setting up GitHub:

1. ✅ Repository is created and code is pushed
2. 📖 Update README if needed
3. 🚀 Deploy to Vercel (see [DEPLOYMENT.md](DEPLOYMENT.md))
4. 🔒 Set up environment variables
5. 🧪 Test the deployed application
6. 📢 Share your project!

---

**Happy Coding! 🎉**