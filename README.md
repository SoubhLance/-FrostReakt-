# ❄️ FrostReflekt ❄️

<div align="center">
  <h3>Freeze the moment. Reflekt the vibe.</h3>
  <p><em>Transform your images with mesmerizing frost and glass effects</em></p>
  
  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
  ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
  ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
  ![Canvas API](https://img.shields.io/badge/Canvas_API-FF6B6B?style=for-the-badge&logo=html5&logoColor=white)
</div>

---

## 🌟 Overview

FrostReflekt is a stunning web-based image editor that applies ethereal frost and glass effects to your photos. With its glassmorphism UI and floating particle animations, it creates an immersive winter wonderland experience while providing powerful image manipulation capabilities.

```mermaid
graph TD
    A[🖼️ Upload Image] --> B[🎨 Apply Effects]
    B --> C[❄️ Frost Intensity]
    B --> D[💧 Glass Blur]
    B --> E[✨ Glass Opacity]
    C --> F[🖥️ Real-time Preview]
    D --> F
    E --> F
    F --> G[💾 Download Result]
    
    style A fill:#AFDDE5,stroke:#0FA4AF,stroke-width:3px
    style F fill:#0FA4AF,stroke:#003135,stroke-width:3px
    style G fill:#024950,stroke:#AFDDE5,stroke-width:3px
```

## ✨ Features

### 🎯 Core Functionality
- **Drag & Drop Upload**: Intuitive file handling with visual feedback
- **Real-time Preview**: Instant effect visualization using HTML5 Canvas
- **Frost Effects**: Adjustable blue tinting with radial gradients
- **Glass Effects**: Glassmorphism with customizable blur and opacity
- **Custom Background**: Upload your own background images
- **One-click Download**: High-quality PNG export

### 🎨 Visual Design
- **Glassmorphism UI**: Modern frosted glass interface
- **Floating Particles**: Animated snowflakes and sparkles
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and keyframe animations
- **Dynamic Backgrounds**: Gradient overlays with shimmer effects

```mermaid
flowchart LR
    subgraph "🎨 Effect Pipeline"
        A[Original Image] --> B[Blur Filter]
        B --> C[Blue Frost Overlay]
        C --> D[Radial Gradient]
        D --> E[Glass Reflection]
        E --> F[Final Output]
    end
    
    style A fill:#ffffff,stroke:#0FA4AF
    style F fill:#AFDDE5,stroke:#003135,stroke-width:3px
```

## 🏗️ Architecture

The application follows a clean modular architecture:

```mermaid
classDiagram
    class FrostReflekt {
        -canvas: HTMLCanvasElement
        -ctx: CanvasRenderingContext2D
        -originalImage: HTMLImageElement
        +constructor()
        +initializeElements()
        +setupEventListeners()
        +processFile(file)
        +applyEffects()
        +downloadImage()
        +createFloatingParticles()
    }
    
    class FileHandler {
        +handleDragOver()
        +handleDragLeave()
        +handleDrop()
        +handleFileSelect()
    }
    
    class EffectProcessor {
        +applyBlurEffect()
        +applyFrostOverlay()
        +applyGlassEffect()
        +createGradients()
    }
    
    class UIController {
        +updateSliderValue()
        +resetEffects()
        +createCanvas()
    }
    
    FrostReflekt --> FileHandler
    FrostReflekt --> EffectProcessor
    FrostReflekt --> UIController
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser with Canvas API support
- Local web server (for file uploads)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/frostReflekt.git
   cd frostReflekt
   ```

2. **Start a local server**
   ```bash
   # Using LiveServer [Live server extension to be installed]
   php -S localhost:5500
   ```

3. **Open in browser**
   ```
   http://localhost:5500
   ```

### Usage Flow

```mermaid
journey
    title User Experience Journey
    section Image Upload
      Open FrostReflekt: 5: User
      Drag & Drop Image: 5: User
      Image Loads: 4: System
    section Effect Customization
      Adjust Frost Intensity: 5: User
      Fine-tune Glass Blur: 4: User
      Set Glass Opacity: 4: User
      Preview Updates: 5: System
    section Export
      Click Download: 5: User
      Generate PNG: 4: System
      File Downloaded: 5: User
```

## 🎛️ Controls Reference

| Control | Range | Description |
|---------|-------|-------------|
| **❄️ Frost Intensity** | 0-100 | Blue tinting strength |
| **💧 Glass Blur** | 0-20px | Background blur amount |
| **✨ Glass Opacity** | 10-80% | Glass effect transparency |

### Keyboard Shortcuts
- `Escape`: Reset all effects
- `Enter`: Download current image
- `Space`: Upload new image

## 🛠️ Technical Stack

```mermaid
graph TB
    subgraph "Frontend Technologies"
        A[HTML5 Canvas API]
        B[CSS3 Glassmorphism]
        C[Vanilla JavaScript ES6+]
        D[File API]
        E[Canvas 2D Context]
    end
    
    subgraph "Features"
        F[Real-time Rendering]
        G[Drag & Drop]
        H[Image Processing]
        I[Responsive Design]
    end
    
    A --> F
    B --> I
    C --> G
    D --> G
    E --> H
    
    style A fill:#ff9999
    style B fill:#66b3ff
    style C fill:#99ff99
    style D fill:#ffcc99
    style E fill:#ff99cc
```

## 📁 File Structure

```
frostReflekt/
├── 📄 index.html          # Main HTML structure
├── 🎨 styles.css          # Glassmorphism styling
├── ⚡ script.js           # Core functionality
├── 🖼️ 22123.jpg          # Default background image
└── 📖 README.md           # This file
```

## 🎨 Effect Processing

The image effects are applied using Canvas composite operations:

```mermaid
sequenceDiagram
    participant U as User
    participant C as Canvas
    participant E as Effect Engine
    
    U->>C: Upload Image
    C->>E: Initialize Processing
    
    loop Effect Application
        E->>E: Apply Blur Filter
        E->>E: Add Frost Overlay (overlay mode)
        E->>E: Create Radial Gradient (screen mode)
        E->>E: Apply Glass Effect (normal mode)
        E->>E: Add Highlights (screen mode)
    end
    
    E->>C: Render Final Image
    C->>U: Display Preview
```

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | 60+ | ✅ Full |
| Firefox | 55+ | ✅ Full |
| Safari | 12+ | ✅ Full |
| Edge | 79+ | ✅ Full |

## 🎭 Customization

### Adding New Effects

```javascript
// Example: Add sepia effect
applyCustomEffect() {
    this.ctx.filter = 'sepia(1) hue-rotate(200deg)';
    this.ctx.drawImage(this.originalImage, 0, 0, 
                       this.canvas.width, this.canvas.height);
}
```

### Styling Customization

The CSS uses custom properties for easy theming:

```css
:root {
    --primary-color: #0FA4AF;
    --secondary-color: #AFDDE5;
    --accent-color: #003135;
    --glass-opacity: 0.15;
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-effect`)
3. Commit changes (`git commit -m 'Add amazing effect'`)
4. Push to branch (`git push origin feature/amazing-effect`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by modern glassmorphism design trends
- Canvas API for powerful image manipulation
- CSS animations for smooth user experience

---

<div align="center">
  <p>Made with ❄️ by [SoubhLance](https://github.com/SoubhLance)</p>
  <p><em>Transform your images into winter wonderlands</em></p>
</div>
