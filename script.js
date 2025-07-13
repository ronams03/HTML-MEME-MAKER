class MemeMaker {
    constructor() {
        this.canvas = document.getElementById('meme-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.templateSelect = document.getElementById('template-select');
        this.fontSelect = document.getElementById('font-select');
        this.fontSize = document.getElementById('font-size');
        this.fontSizeValue = document.getElementById('font-size-value');
        this.textInputs = [
            document.getElementById('text-1'),
            document.getElementById('text-2'),
            document.getElementById('text-3')
        ];
        this.downloadBtn = document.getElementById('download-btn');
        this.toggleUploadBtn = document.getElementById('toggle-upload-btn');
        this.uploadPanel = document.querySelector('.upload-floating');
        this.customTitle = document.getElementById('custom-title');
        this.customImage = document.getElementById('custom-image');
        this.uploadBtn = document.getElementById('upload-btn');

        this.currentImage = null;
        this.texts = [
            { text: '', x: 50, y: 50, dragging: false, isDragging: false },
            { text: '', x: 50, y: 220, dragging: false, isDragging: false },
            { text: '', x: 50, y: 150, dragging: false, isDragging: false }
        ];
        
        // Meme templates - will create placeholder images for demonstration
        this.templates = [
            { title: 'Distracted Boyfriend', color: '#ff6b6b' },
            { title: 'Drake Pointing', color: '#4ecdc4' },
            { title: 'Woman Yelling at Cat', color: '#45b7d1' },
            { title: 'Two Buttons', color: '#96ceb4' },
            { title: 'Change My Mind', color: '#feca57' },
            { title: 'This Is Fine', color: '#ff9ff3' },
            { title: 'Expanding Brain', color: '#54a0ff' },
            { title: 'Surprised Pikachu', color: '#ffd32a' },
            { title: 'Mocking SpongeBob', color: '#ff9f43' },
            { title: 'Success Kid', color: '#00d2d3' },
            { title: 'Run Away Balloon', color: '#5f27cd' }
        ];

        this.init();
    }

    init() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.loadTemplates();
        this.bindEvents();
        this.render();
    }

    loadTemplates() {
        this.templateSelect.innerHTML = '<option value="">Select a template...</option>';
        this.templates.forEach((template, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = template.title;
            this.templateSelect.appendChild(option);
        });
    }

    bindEvents() {
        this.templateSelect.addEventListener('change', () => this.loadImage());
        this.textInputs.forEach((input, index) => {
            input.addEventListener('input', () => {
                this.texts[index].text = input.value.toUpperCase();
                this.render();
            });
        });
        this.fontSelect.addEventListener('change', () => this.render());
        this.fontSize.addEventListener('input', () => {
            this.fontSizeValue.textContent = `${this.fontSize.value}px`;
            this.render();
        });
        this.downloadBtn.addEventListener('click', () => this.downloadMeme());
        this.toggleUploadBtn.addEventListener('click', () => {
            this.uploadPanel.style.display = this.uploadPanel.style.display === 'flex' ? 'none' : 'flex';
        });
        this.uploadBtn.addEventListener('click', () => this.uploadTemplate());
        this.canvas.addEventListener('mousedown', (e) => this.startDragging(e));
        this.canvas.addEventListener('mousemove', (e) => this.drag(e));
        this.canvas.addEventListener('mouseup', () => this.stopDragging());
        this.canvas.addEventListener('mouseleave', () => this.stopDragging());
    }

    loadImage() {
        const index = this.templateSelect.value;
        if (index === '') {
            this.currentImage = null;
            this.render();
            return;
        }
        
        const template = this.templates[index];
        
        // If template has a URL (uploaded image), load it directly
        if (template.url) {
            const img = new Image();
            img.crossOrigin = 'Anonymous';
            img.onload = () => {
                this.currentImage = img;
                this.canvas.width = 480;
                this.canvas.height = 270;
                this.render();
            };
            img.onerror = () => {
                // Fallback to placeholder if image fails to load
                this.createPlaceholderImage(index);
            };
            img.src = template.url;
        } else {
            // Create placeholder image for built-in templates
            this.createPlaceholderImage(index);
        }
    }

    createPlaceholderImage(index) {
        // Create a canvas with placeholder content
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        tempCanvas.width = 480;
        tempCanvas.height = 270;
        
        // Create gradient background using template color
        const gradient = tempCtx.createLinearGradient(0, 0, 480, 270);
        gradient.addColorStop(0, this.templates[index].color);
        gradient.addColorStop(1, this.adjustBrightness(this.templates[index].color, -30));
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, 480, 270);
        
        // Add some visual elements to make it look more like a meme template
        tempCtx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        tempCtx.fillRect(20, 20, 440, 230);
        
        // Add template name
        tempCtx.fillStyle = 'white';
        tempCtx.font = 'bold 28px Arial';
        tempCtx.textAlign = 'center';
        tempCtx.fillText(this.templates[index].title, 240, 135);
        
        // Add subtitle
        tempCtx.font = '16px Arial';
        tempCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        tempCtx.fillText('Meme Template', 240, 160);
        
        // Convert to image
        const img = new Image();
        img.onload = () => {
            this.currentImage = img;
            this.render();
        };
        img.src = tempCanvas.toDataURL();
    }
    
    adjustBrightness(hex, percent) {
        const num = parseInt(hex.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }

    render() {
        if (!this.currentImage) {
            // Show placeholder when no image is selected
            this.ctx.fillStyle = '#f0f0f0';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#666';
            this.ctx.font = '20px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Select a template to start creating your meme!', this.canvas.width / 2, this.canvas.height / 2);
            this.downloadBtn.disabled = true;
            return;
        }
        
        this.downloadBtn.disabled = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.currentImage, 0, 0, this.canvas.width, this.canvas.height);

        this.ctx.font = `${this.fontSize.value}px ${this.fontSelect.value}`;
        this.ctx.fillStyle = 'white';
        this.ctx.strokeStyle = 'black';
        this.ctx.lineWidth = 3;
        this.ctx.textAlign = 'center';

        this.texts.forEach((textObj) => {
            if (textObj.text) {
                this.drawText(textObj);
            }
        });
    }

    drawText(textObj) {
        const words = textObj.text.split(' ');
        const lines = [];
        let currentLine = '';
        const maxWidth = this.canvas.width - 40;
        
        for (let word of words) {
            const testLine = currentLine + word + ' ';
            const metrics = this.ctx.measureText(testLine);
            if (metrics.width > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = word + ' ';
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        
        const lineHeight = parseInt(this.fontSize.value) * 1.2;
        const totalHeight = lines.length * lineHeight;
        let startY = textObj.y - (totalHeight / 2);
        
        lines.forEach((line, index) => {
            const y = startY + (index * lineHeight);
            this.ctx.fillText(line, textObj.x, y);
            this.ctx.strokeText(line, textObj.x, y);
        });
    }

    startDragging(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        this.texts.forEach((textObj, index) => {
            if (textObj.text) {
                const metrics = this.ctx.measureText(textObj.text);
                const textHeight = parseInt(this.fontSize.value);
                const words = textObj.text.split(' ');
                const lines = [];
                let currentLine = '';
                const maxWidth = this.canvas.width - 40;
                
                for (let word of words) {
                    const testLine = currentLine + word + ' ';
                    const metrics = this.ctx.measureText(testLine);
                    if (metrics.width > maxWidth && currentLine !== '') {
                        lines.push(currentLine);
                        currentLine = word + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine);
                
                const lineHeight = parseInt(this.fontSize.value) * 1.2;
                const totalHeight = lines.length * lineHeight;
                const startY = textObj.y - (totalHeight / 2);
                const endY = startY + totalHeight;
                
                if (x >= textObj.x - metrics.width/2 && x <= textObj.x + metrics.width/2 &&
                    y >= startY && y <= endY) {
                    textObj.dragging = true;
                    textObj.isDragging = true;
                }
            }
        });
    }

    drag(e) {
        const rect = this.canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);

        this.texts.forEach((textObj) => {
            if (textObj.dragging) {
                textObj.x = Math.max(20, Math.min(this.canvas.width - 20, x));
                textObj.y = Math.max(parseInt(this.fontSize.value), Math.min(this.canvas.height - 20, y));
                this.render();
            }
        });
    }

    stopDragging() {
        this.texts.forEach((textObj) => {
            textObj.dragging = false;
            textObj.isDragging = false;
        });
    }

    downloadMeme() {
        if (!this.currentImage) return;
        
        // Create a high-resolution canvas for download
        const downloadCanvas = document.createElement('canvas');
        const downloadCtx = downloadCanvas.getContext('2d');
        const scale = 2; // 2x resolution for better quality
        downloadCanvas.width = this.canvas.width * scale;
        downloadCanvas.height = this.canvas.height * scale;

        // Draw image
        downloadCtx.drawImage(this.currentImage, 0, 0, downloadCanvas.width, downloadCanvas.height);

        // Draw text
        downloadCtx.font = `${parseInt(this.fontSize.value) * scale}px ${this.fontSelect.value}`;
        downloadCtx.fillStyle = 'white';
        downloadCtx.strokeStyle = 'black';
        downloadCtx.lineWidth = 3 * scale;
        downloadCtx.textAlign = 'center';

        this.texts.forEach((textObj) => {
            if (textObj.text) {
                const words = textObj.text.split(' ');
                const lines = [];
                let currentLine = '';
                const maxWidth = downloadCanvas.width - 40 * scale;
                
                for (let word of words) {
                    const testLine = currentLine + word + ' ';
                    const metrics = downloadCtx.measureText(testLine);
                    if (metrics.width > maxWidth && currentLine !== '') {
                        lines.push(currentLine);
                        currentLine = word + ' ';
                    } else {
                        currentLine = testLine;
                    }
                }
                lines.push(currentLine);
                
                const lineHeight = parseInt(this.fontSize.value) * 1.2 * scale;
                const totalHeight = lines.length * lineHeight;
                let startY = textObj.y * scale - (totalHeight / 2);
                
                lines.forEach((line, index) => {
                    const y = startY + (index * lineHeight);
                    downloadCtx.fillText(line, textObj.x * scale, y);
                    downloadCtx.strokeText(line, textObj.x * scale, y);
                });
            }
        });

        const link = document.createElement('a');
        link.download = 'meme.png';
        link.href = downloadCanvas.toDataURL('image/png', 1.0);
        link.click();
    }

    uploadTemplate() {
        const file = this.customImage.files[0];
        const title = this.customTitle.value.trim() || 'Custom Template';
        
        if (!file) {
            alert('Please select an image file.');
            return;
        }
        
        if (!title) {
            alert('Please enter a title for your template.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = () => {
            // Add the new template to the list with a random color
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#ffd32a', '#ff9f43', '#00d2d3', '#5f27cd'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            this.templates.push({ title, url: reader.result, color: randomColor });
            this.loadTemplates();
            
            // Select the newly uploaded template
            this.templateSelect.value = this.templates.length - 1;
            this.loadImage();
            
            // Clear the upload form
            this.uploadPanel.style.display = 'none';
            this.customTitle.value = '';
            this.customImage.value = '';
            
            // Show success message
            alert(`Template "${title}" uploaded successfully!`);
        };
        reader.readAsDataURL(file);
    }
}

// Initialize the meme maker when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MemeMaker();
});