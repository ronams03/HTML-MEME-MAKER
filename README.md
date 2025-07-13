# 🎭 Meme Maker - Create Amazing Memes

A fully functional web-based meme creator with drag-and-drop text positioning, custom templates, and high-quality downloads.

## ✨ Features

### 🖼️ Template Selection
- **Built-in Templates**: 11 popular meme templates with colorful placeholders
- **Custom Upload**: Upload your own images as meme templates
- **Dynamic Dropdown**: All templates (built-in and uploaded) appear in the dropdown

### 📝 Text Customization
- **Multiple Text Fields**: Top, bottom, and middle text support
- **Font Selection**: 25+ font options including classic meme fonts
- **Font Size Control**: Adjustable font size from 12px to 72px
- **Drag & Drop**: Click and drag text on the canvas to reposition it

### 🎨 Visual Features
- **Real-time Preview**: See changes instantly as you type
- **High-quality Download**: 2x resolution output for crisp images
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful gradient background with glassmorphism effects

### 💾 Download & Upload
- **PNG Download**: High-quality meme export
- **Custom Templates**: Upload your own images with custom titles
- **Template Management**: All uploaded templates are saved in the session

## 🚀 How to Use

### 1. Choose a Template
- Select from the dropdown menu to pick a built-in template
- Or click the "+" button to upload your own image

### 2. Add Text
- Enter text in the top, bottom, and/or middle text fields
- Text automatically appears on the preview canvas
- Use the font selector to change the text style
- Adjust font size with the slider

### 3. Position Text
- Click and drag text on the canvas to move it around
- Text will stay within canvas boundaries
- Multiple lines are automatically wrapped

### 4. Download Your Meme
- Click the "💾 Download Meme" button
- Your meme will download as a high-quality PNG file

### 5. Upload Custom Templates
- Click the "+" button in the top-right corner
- Enter a title for your template
- Select an image file
- Click "Upload Meme"
- Your template will appear in the dropdown and be automatically selected

## 🛠️ Technical Details

- **Pure JavaScript**: No external dependencies
- **Canvas API**: For image manipulation and text rendering
- **File API**: For image uploads
- **CSS3**: Modern styling with gradients and animations
- **Responsive**: Mobile-friendly design

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🎯 File Structure

```
meme-maker/
├── index.html      # Main HTML file
├── style.css       # Styles and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## 🎨 Customization

### Adding More Fonts
Edit the `font-select` options in `index.html` to add more Google Fonts.

### Changing Template Colors
Modify the `templates` array in `script.js` to change the placeholder colors.

### Adjusting Canvas Size
Update the canvas dimensions in both `init()` and `render()` methods.

## 🚀 Getting Started

1. Open `index.html` in a web browser
2. Or serve the files using a local server:
   ```bash
   python3 -m http.server 8000
   # Then visit http://localhost:8000
   ```

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Meme Making! 🎉**