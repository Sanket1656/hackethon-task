# 🤝 Contributing to PDF Upload & Tracking System

Thank you for considering contributing to this project! We welcome contributions from everyone.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

## 📜 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or insulting comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

## 🚀 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates.

**When reporting bugs, include:**
- Clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)
- Error messages or logs

**Example:**
```markdown
**Bug**: File upload fails for files larger than 50MB

**Steps to Reproduce:**
1. Select a PDF file larger than 50MB
2. Click "Upload File"
3. Observe error message

**Expected**: File should upload successfully
**Actual**: Error "File too large"

**Environment:**
- OS: Windows 11
- Browser: Chrome 120
- Node: v18.17.0
```

### Suggesting Features

We love feature suggestions! Please provide:
- Clear description of the feature
- Use case and benefits
- Possible implementation approach
- Any relevant examples or mockups

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages**
6. **Push to your fork**
7. **Open a Pull Request**

## 🛠️ Development Setup

### Prerequisites

- Node.js v16 or higher
- MongoDB (local or Atlas)
- Git
- Code editor (VS Code recommended)

### Setup Steps

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/pdf-upload-tracking-system.git
   cd pdf-upload-tracking-system
   ```

2. **Install Dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend
   cd server
   npm install
   cd ..
   ```

3. **Setup Environment Variables**
   ```bash
   # Backend
   cd server
   cp .env.example .env
   # Edit .env with your MongoDB URI
   cd ..
   
   # Frontend (optional)
   cp .env.example .env
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev
   
   # Terminal 2 - Frontend
   npm run dev
   ```

5. **Verify Setup**
   - Backend: http://localhost:5000
   - Frontend: http://localhost:5173

## 🔄 Pull Request Process

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] New features include tests
- [ ] Documentation is updated
- [ ] Commit messages follow guidelines
- [ ] No merge conflicts with main branch

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
Describe testing performed

## Screenshots (if applicable)
Add screenshots here

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests passing
```

### Review Process

1. Maintainers will review your PR
2. Address any requested changes
3. Once approved, PR will be merged
4. Your contribution will be credited

## 📝 Coding Standards

### JavaScript/React

- Use ES6+ features
- Follow functional programming principles
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

**Example:**
```javascript
// Good
const calculateUploadProgress = (loaded, total) => {
  return Math.round((loaded * 100) / total);
};

// Avoid
const calc = (l, t) => {
  return Math.round((l * 100) / t);
};
```

### File Structure

```
src/
├── components/     # React components
├── services/       # API services
├── utils/          # Utility functions
└── assets/         # Static assets
```

### Component Guidelines

- One component per file
- Use functional components with hooks
- PropTypes or TypeScript for type checking
- Separate logic from presentation

**Example:**
```javascript
// Good component structure
import React, { useState, useEffect } from 'react';

const FileUploader = ({ onUploadComplete }) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  // Component logic here

  return (
    <div className="uploader">
      {/* JSX here */}
    </div>
  );
};

export default FileUploader;
```

### CSS/Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Keep custom CSS minimal
- Use consistent spacing

## 💬 Commit Message Guidelines

### Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Good commits
git commit -m "feat(upload): add drag and drop support"
git commit -m "fix(api): resolve CORS issue in production"
git commit -m "docs(readme): update installation instructions"

# Avoid
git commit -m "fixed stuff"
git commit -m "updates"
```

## 🧪 Testing

### Running Tests

```bash
# Frontend tests
npm test

# Backend tests
cd server
npm test
```

### Writing Tests

- Write tests for new features
- Update tests for bug fixes
- Aim for good coverage
- Test edge cases

## 🐛 Debugging

### Common Issues

**MongoDB Connection Failed**
```bash
# Check if MongoDB is running
mongod --version

# Verify connection string in .env
```

**Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env
```

**Module Not Found**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📚 Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Git Best Practices](https://git-scm.com/book/en/v2)

## 🎯 Areas for Contribution

We especially welcome contributions in:

- [ ] User authentication system
- [ ] File preview functionality
- [ ] Search and filter features
- [ ] Performance optimizations
- [ ] Test coverage improvements
- [ ] Documentation enhancements
- [ ] Accessibility improvements
- [ ] Mobile responsiveness
- [ ] Dark mode support
- [ ] Internationalization (i18n)

## 💡 Getting Help

- **Questions?** Open a discussion on GitHub
- **Stuck?** Check existing issues or create a new one
- **Need guidance?** Reach out to maintainers

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Credited in release notes
- Mentioned in project documentation

## 📞 Contact

- **GitHub Issues**: For bugs and features
- **Discussions**: For questions and ideas
- **Email**: For private matters

---

**Thank you for contributing! 🎉**

Your efforts help make this project better for everyone.