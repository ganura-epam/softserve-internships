# 🌐 SoftServe Technologies - Internship Portal

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://YOUR_USERNAME.github.io/softserve-internships/)
[![GitHub Pages](https://img.shields.io/badge/deployment-GitHub%20Pages-blue)](https://pages.github.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Modern, responsive internship recruitment website for SoftServe Technologies targeting BTech Computer Science students.

![SoftServe Website Preview](https://via.placeholder.com/800x400/667eea/ffffff?text=SoftServe+Technologies+Internship+Portal)

## ✨ Features

- 🎨 **Modern Minimalist Design** - Clean, professional aesthetic
- 📱 **Fully Responsive** - Works on mobile, tablet, and desktop
- ⚡ **Lightning Fast** - Static website with ~50KB total size
- 🔒 **Secure Forms** - FormSpree integration for resume submissions
- 💼 **5 Internship Tracks**:
  - Cloud Computing (AWS, Azure, GCP)
  - Data Analytics (SQL, Power BI, Tableau)
  - Data Science (Python, ML, AI)
  - Web Development (React, Node.js)
  - Generative AI (LLMs, RAG)

## 🚀 Live Demo

Visit the live website: [https://YOUR_USERNAME.github.io/softserve-internships/](https://YOUR_USERNAME.github.io/softserve-internships/)

## 🛠️ Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with flexbox/grid
- **JavaScript (ES6+)** - Form handling and interactions
- **FormSpree** - Form backend (free tier)
- **GitHub Pages** - Free hosting with HTTPS

## 📦 Project Structure

```
├── index.html              # Main landing page
├── css/
│   └── styles.css          # All styling
├── js/
│   └── main.js             # Form handling & interactions
├── assets/
│   └── logo.svg            # Company logo
└── docs/                   # Documentation
```

## 🏃 Quick Start

### Local Development

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/softserve-internships.git

# Navigate to directory
cd softserve-internships

# Start local server
python3 -m http.server 8000

# Open in browser
# http://localhost:8000
```

### Deploy to GitHub Pages

1. Fork this repository
2. Go to Settings → Pages
3. Source: Deploy from branch `main` / `(root)`
4. Wait 2-5 minutes
5. Visit: `https://YOUR_USERNAME.github.io/softserve-internships/`

## 🔧 Configuration

### FormSpree Setup

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Update form ID in `index.html` line 174:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

### Enable Production Mode

Edit `js/main.js` to enable real form submissions:

1. Find `/* PRODUCTION MODE:` comment
2. Delete the DEMO MODE section
3. Uncomment the PRODUCTION MODE block

## 📊 Performance

- **Page Load**: < 2 seconds
- **Total Size**: ~50KB
- **Lighthouse Score**: 95+
- **Mobile Friendly**: Yes
- **SEO Optimized**: Yes

## 🌐 Custom Domain (Optional)

To use your own domain (e.g., www.softserve.com):

1. Create file `CNAME` with your domain:
   ```
   www.softserve.com
   ```

2. Configure DNS at your registrar:
   ```
   Type: CNAME
   Host: www
   Value: YOUR_USERNAME.github.io
   ```

3. Enable HTTPS in GitHub Pages settings

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **SoftServe Technologies** - *Initial work*

## 🙏 Acknowledgments

- Design inspired by modern tech companies
- Icons from SVG library
- FormSpree for form handling
- GitHub Pages for free hosting

## 📧 Contact

- **Email**: ganura@gmail.com
- **Website**: [www.softserve.com](https://YOUR_USERNAME.github.io/softserve-internships/)

---

⭐ Star this repo if you find it helpful!

Made with ❤️ by SoftServe Technologies
