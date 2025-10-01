# Carlos Zorrilla - Architectural Portfolio

A modern, responsive portfolio website showcasing architectural work and professional experience.

## Features

- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Clean, professional design with smooth animations
- **Portfolio Gallery**: Easy-to-navigate showcase of architectural projects
- **Contact Form**: Functional contact form with validation
- **Fast Loading**: Optimized for performance and quick loading times

## Technologies Used

- HTML5
- CSS3 (with Grid and Flexbox)
- Vanilla JavaScript
- Google Fonts (Inter)
- Responsive Design Principles

## Getting Started

### Local Development

1. Clone or download this repository
2. Open `index.html` in your web browser
3. The site will run locally without any build process required

### Customization

#### Adding Your Projects

Edit the `portfolioData` array in `script.js` to add your own projects:

```javascript
const portfolioData = [
    {
        id: 1,
        title: "Your Project Title",
        description: "Project description",
        category: "Category",
        image: "images/your-image.jpg"
    },
    // Add more projects...
];
```

#### Personal Information

Update the following sections in `index.html`:
- Hero section with your name and tagline
- About section with your professional summary
- Contact information
- Footer

#### Styling

Modify `styles.css` to customize colors, fonts, and layout:
- Color scheme in CSS variables
- Font sizes and spacing
- Animation timings

## Deployment to GitHub Pages

### Method 1: Simple Deployment

1. Create a new repository on GitHub
2. Upload all files to the repository
3. Go to repository Settings → Pages
4. Under "Source", select "Deploy from a branch"
5. Select the main branch and root folder
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io/repository-name`

### Method 2: Using GitHub Desktop

1. Clone the repository to your local machine
2. Make any customizations needed
3. Commit and push changes to GitHub
4. Enable GitHub Pages in repository settings as above

## File Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── README.md           # This file
└── images/             # Portfolio images (create this folder)
    ├── project1.jpg
    ├── project2.jpg
    └── ...
```

## Adding Images

1. Create an `images` folder in the root directory
2. Add your portfolio images to this folder
3. Update the `image` property in the `portfolioData` array to point to your images
4. Recommended image size: 800x600px for optimal display

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Tips

- Optimize images before uploading (use tools like TinyPNG)
- Keep JavaScript files minified
- Use appropriate image formats (JPEG for photos, PNG for graphics)
- Consider implementing lazy loading for images

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Carlos Zorrilla  
Email: your.email@example.com  
Location: Available for projects worldwide

---

Built with modern web technologies and optimized for GitHub Pages deployment.
