# v3i1ix | Portfolio/Card Site

![Site Preview](/data/images/firefox_fPrlxZZ6x6.png) <!-- Add your own screenshot URL -->

A modern personal portfolio/card site with dark theme aesthetics, featuring dynamic gradient backgrounds and smooth interactions. Hosted on GitHub Pages.

**Live Demo**: [https://v3i1ix.info/](https://v3i1ix.info/)

## Features

- 🎨 Custom high-resolution gradient background (fixed position)
- 📱 Responsive design for all screen sizes
- ✨ Smooth scroll animations
- 📦 Modular content sections (About, Projects, Blog)
- 📧 Functional contact form
- ⚡ Optimized performance for static content

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Hosting**: GitHub Pages
- **Tools**: 
  - Gradient background image (replaces CSS `linear-gradient`)
  - CSS Flexbox/Grid layouts
  - Web-optimized assets
  - Vanilla JS animations

## Setup & Installation

1. Clone repository:
```bash
git clone https://github.com/yourusername/your-repo.git
```

2. Replace placeholder content:
- Update `index.html` with your personal information
- Replace `background-image.jpg` in `/assets` with your gradient
- Modify colors in `css/styles.css`

3. Deploy to GitHub Pages:
- Push to `main` branch
- Enable GitHub Pages in repo settings (Branch: `gh-pages` or `main`)

### Note
*If you will be using GitHub pages for hosting, you will need to ensure that all paths include your* `/project-name/`
*before the path as GitHub pages identifies the root as* `https://www.github.com/your-username/`,
*which will not work if you do no specify the project name.*
*You will notice I have provided JavaScript in all* `html` *files that will allow you to dynamically set these prefixes*
*dependent on whether you are doing localhost testing (if you have your own domain it acts essentially the same as localhost)*
*or if you are using pages' default domain.*
```html
<script>
    (function() {
        // const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const base = document.createElement('base');
        // base.href = isLocal ? '/' : '/mcfarmarchive/';
        // could potentially just do base.href = ‘/’;
        base.href = '/';
        document.head.appendChild(base);
    })();
</script>
```
*As I have my own domain for my use case, I have commented out the conditional operators.*
*If you will be using the default pages' url, simply uncomment the* `const` *and* `base.href` *lines in each html file.*

## Customization

### Key Files:
- `css/styles.css` - Main styles including background setup:
  ```css
  body {
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      min-height: 100vh;
      /* background: linear-gradient(
      160deg,
      rgb(6, 6, 6),
      rgb(0, 0, 0)
    ); */
    background-image: url(/data/images/v3i1ixPortfolioBackground.png);
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
  }
  ```
- `js/main.js` - Interactive elements and animations
- `assets/` - Background images and icons

### Color Scheme:
```css
:root {
    --main-white: #ffffff;
    --main-green: rgb(0, 255, 0);
    --second-green: green;
    --main-gray: #010101;
    background-color: var(--main-gray); /*background-image failsafe*/
}
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit changes (`git commit -m 'Add some feature'`)
4. Push to branch (`git push origin feature/improvement`)
5. Open a Pull Request

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Credits

- Gradient background design by v3i1ix
- Inspired by the matrix

**To use**:
1. Copy this code into a new `README.md` file
2. Replace placeholder values (especially in **Credits** and **Features** sections)
3. Add your own screenshot URL
4. Update the color scheme variables to match your site's actual colors
5. Modify the "Technologies Used" section based on your actual stack