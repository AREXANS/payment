(function() {
    // Create Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.id = 'aura-particles';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1'; // Behind content

    document.body.appendChild(canvas);

    let width, height;
    let particles = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class AuraParticle {
        constructor() {
            this.reset();
            // Initial random placement
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.alpha = 0; // Start invisible
            this.fadeIn = true;
        }

        reset() {
            this.x = Math.random() * width;
            this.y = height + 100; // Start from bottom
            this.vx = (Math.random() - 0.5) * 1.5; // Slight horizontal drift
            this.vy = -Math.random() * 1 - 0.5; // Upward movement
            this.radius = Math.random() * 80 + 40; // Large soft radius
            this.maxAlpha = Math.random() * 0.2 + 0.1; // Max opacity

            // Elegant colors: Cyan, Deep Blue, Purple, White-ish
            const colors = [
                '0, 255, 255',   // Cyan
                '0, 198, 255',   // Light Blue
                '138, 43, 226',  // Blue Violet
                '255, 255, 255'  // White glow
            ];
            this.colorRGB = colors[Math.floor(Math.random() * colors.length)];

            this.life = 0;
            this.maxLife = Math.random() * 300 + 200;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Gentle sine wave drift
            this.x += Math.sin(this.life * 0.01) * 0.5;

            this.life++;

            // Fade in and out logic
            if (this.fadeIn) {
                this.alpha += 0.005;
                if (this.alpha >= this.maxAlpha) {
                    this.alpha = this.maxAlpha;
                    this.fadeIn = false;
                }
            } else {
                // Fade out near end of life or if off screen
                if (this.life > this.maxLife - 100 || this.y < -100) {
                    this.alpha -= 0.005;
                }
            }

            // Reset if dead
            if (this.alpha <= 0 && !this.fadeIn) {
                this.reset();
                this.fadeIn = true;
            }
        }

        draw() {
            ctx.save();

            // Create a radial gradient for a soft "aura" look
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );

            gradient.addColorStop(0, `rgba(${this.colorRGB}, ${this.alpha})`);
            gradient.addColorStop(0.5, `rgba(${this.colorRGB}, ${this.alpha * 0.5})`);
            gradient.addColorStop(1, `rgba(${this.colorRGB}, 0)`);

            ctx.fillStyle = gradient;
            ctx.globalCompositeOperation = 'lighter'; // Additive blending for glow effect

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Initialize particles
    const particleCount = 25; // Not too crowded
    for (let i = 0; i < particleCount; i++) {
        particles.push(new AuraParticle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    console.log("Aura particles initialized.");
})();
