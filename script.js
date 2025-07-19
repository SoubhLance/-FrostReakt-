class FrostReflekt {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.originalImage = null;
        this.initializeElements();
        this.setupEventListeners();
        this.createFloatingParticles();
    }

    initializeElements() {
        this.uploadZone = document.getElementById('uploadZone');
        this.fileInput = document.getElementById('fileInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.resetBtn = document.getElementById('resetBtn');
        
        this.blueSlider = document.getElementById('blueSlider');
        this.blurSlider = document.getElementById('blurSlider');
        this.opacitySlider = document.getElementById('opacitySlider');
        
        this.blueValue = document.getElementById('blueValue');
        this.blurValue = document.getElementById('blurValue');
        this.opacityValue = document.getElementById('opacityValue');

        // Background image elements
        this.imageUploadZone = document.getElementById('imageUploadZone');
        this.backgroundImageInput = document.getElementById('backgroundImageInput');
        this.backgroundImage = document.querySelector('.background-image');
    }

    setupEventListeners() {
        // File upload events
        this.uploadZone.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        
        // Drag and drop events
        this.uploadZone.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.uploadZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.uploadZone.addEventListener('drop', (e) => this.handleDrop(e));
        
        // Control events
        this.blueSlider.addEventListener('input', () => this.updateSliderValue('blue'));
        this.blurSlider.addEventListener('input', () => this.updateSliderValue('blur'));
        this.opacitySlider.addEventListener('input', () => this.updateSliderValue('opacity'));
        
        this.blueSlider.addEventListener('input', () => this.applyEffects());
        this.blurSlider.addEventListener('input', () => this.applyEffects());
        this.opacitySlider.addEventListener('input', () => this.applyEffects());
        
        this.resetBtn.addEventListener('click', () => this.resetEffects());
        this.downloadBtn.addEventListener('click', () => this.downloadImage());

        // Background image upload events
        this.imageUploadZone.addEventListener('click', () => this.backgroundImageInput.click());
        this.backgroundImageInput.addEventListener('change', (e) => this.handleBackgroundImageSelect(e));
    }

    handleBackgroundImageSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.backgroundImage.style.backgroundImage = `url(${e.target.result})`;
                this.imageUploadZone.classList.add('has-image');
            };
            reader.readAsDataURL(file);
        }
    }

    handleDragOver(e) {
        e.preventDefault();
        this.uploadZone.classList.add('dragover');
    }

    handleDragLeave(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
    }

    handleDrop(e) {
        e.preventDefault();
        this.uploadZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.processFile(files[0]);
        }
    }

    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.processFile(file);
        }
    }

    processFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please select a valid image file');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.originalImage = img;
                this.createCanvas();
                this.applyEffects();
                this.downloadBtn.disabled = false;
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    createCanvas() {
        if (this.canvas) {
            this.canvas.remove();
        }
        
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'previewCanvas';
        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size to match image
        const maxWidth = 600;
        const maxHeight = 500;
        let { width, height } = this.originalImage;
        
        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        this.previewContainer.innerHTML = '';
        this.previewContainer.appendChild(this.canvas);
    }

    applyEffects() {
        if (!this.originalImage || !this.ctx) return;

        const blueIntensity = parseInt(this.blueSlider.value);
        const blurAmount = parseInt(this.blurSlider.value);
        const glassOpacity = parseInt(this.opacitySlider.value);

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Apply blur filter if needed
        this.ctx.filter = blurAmount > 0 ? `blur(${blurAmount}px)` : 'none';
        
        // Draw original image
        this.ctx.drawImage(this.originalImage, 0, 0, this.canvas.width, this.canvas.height);
        
        // Reset filter for overlay effects
        this.ctx.filter = 'none';
        
        // Apply blue frost overlay
        if (blueIntensity > 0) {
            this.ctx.globalCompositeOperation = 'overlay';
            this.ctx.fillStyle = `rgba(100, 150, 255, ${blueIntensity / 200})`;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Add frost gradient
            this.ctx.globalCompositeOperation = 'screen';
            const gradient = this.ctx.createRadialGradient(
                this.canvas.width / 2, this.canvas.height / 2, 0,
                this.canvas.width / 2, this.canvas.height / 2, Math.max(this.canvas.width, this.canvas.height) / 2
            );
            gradient.addColorStop(0, `rgba(200, 220, 255, ${blueIntensity / 300})`);
            gradient.addColorStop(1, `rgba(100, 150, 255, ${blueIntensity / 400})`);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Apply glass effect
        if (glassOpacity > 0) {
            this.ctx.globalCompositeOperation = 'normal';
            
            // Create glass reflection effect
            const glassGradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
            glassGradient.addColorStop(0, `rgba(255, 255, 255, ${glassOpacity / 100})`);
            glassGradient.addColorStop(0.3, `rgba(255, 255, 255, ${glassOpacity / 200})`);
            glassGradient.addColorStop(0.7, `rgba(255, 255, 255, ${glassOpacity / 300})`);
            glassGradient.addColorStop(1, `rgba(255, 255, 255, ${glassOpacity / 150})`);
            
            this.ctx.fillStyle = glassGradient;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Add subtle highlights
            this.ctx.globalCompositeOperation = 'screen';
            const highlight = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
            highlight.addColorStop(0, `rgba(255, 255, 255, ${glassOpacity / 500})`);
            highlight.addColorStop(1, 'rgba(255, 255, 255, 0)');
            this.ctx.fillStyle = highlight;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
        
        // Reset composite operation
        this.ctx.globalCompositeOperation = 'source-over';
    }

    updateSliderValue(type) {
        const sliderMap = {
            'blue': { slider: this.blueSlider, display: this.blueValue },
            'blur': { slider: this.blurSlider, display: this.blurValue },
            'opacity': { slider: this.opacitySlider, display: this.opacityValue }
        };
        
        const { slider, display } = sliderMap[type];
        display.textContent = slider.value;
    }

    resetEffects() {
        this.blueSlider.value = 50;
        this.blurSlider.value = 5;
        this.opacitySlider.value = 30;
        
        this.updateSliderValue('blue');
        this.updateSliderValue('blur');
        this.updateSliderValue('opacity');
        
        this.applyEffects();
    }

    downloadImage() {
        if (!this.canvas) return;
        
        const link = document.createElement('a');
        link.download = `frostified-${Date.now()}.png`;
        link.href = this.canvas.toDataURL('image/png');
        link.click();
    }

    createFloatingParticles() {
        const particleCount = window.innerWidth > 768 ? 20 : 10;
        const particles = ['❄️', '🌟', '✨', '🔮', '💫', '⭐', '🌙', '☁️'];
        
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.innerHTML = particles[Math.floor(Math.random() * particles.length)];
                particle.style.left = Math.random() * 100 + 'vw';
                particle.style.top = Math.random() * 100 + 'vh';
                particle.style.fontSize = (Math.random() * 20 + 10) + 'px';
                particle.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
                particle.style.animationDelay = Math.random() * 2 + 's';
                particle.style.opacity = Math.random() * 0.7 + 0.3;
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 10000);
            }, i * 200);
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FrostReflekt();
    
    // Recreate particles every 15 seconds
    setInterval(() => {
        if (Math.random() > 0.3) { // 70% chance
            new FrostReflekt().createFloatingParticles();
        }
    }, 15000);
});
