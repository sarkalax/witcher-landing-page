const layer = document.querySelector(".layer");

const canvas = document.querySelector(".particles"),
      ctx = canvas.getContext("2d");
const particlesNum = 50,
    minRadius = 1,
    maxRadius = 3,
    velocity = 0.02;
let particles = [];

window.addEventListener("DOMContentLoaded", () => {
    if (innerWidth >= 1440) {
        document.addEventListener("mousemove", (e) => {
            let valueX = e.clientX - innerWidth / 2,
                valueY = e.clientY - innerHeight / 2,
                speedX = layer.dataset.speedx,
                speedY = layer.dataset.speedy;
    
            layer.style.transform = `translateX(${-valueX * speedX}px) translateY(${
                valueY * speedY
            }px) scale(1.1)`;
        });
    }
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    
        getParticles();
    
        animate();
});

class Particle {
    constructor(x, y, dx, dy, r, c) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.r = r;
        this.c = c;
        this.alpha = getRandom(0.3, 1);
    }
    draw() {
        ctx.beginPath();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.c;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
    move() {
        if (this.x > innerWidth || this.x < 0) this.dx *= -1;
        if (this.y > innerHeight || this.y < 0) this.dy *= -1;

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

function getRandom(min, max) {
    return Math.random() * (max - min + 1) + min;
}
function getRandomFloor(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getParticles() {
    particles = [];

    for (let i = 0; i < particlesNum; i++) {
        let x = getRandomFloor(0, innerWidth),
            y = getRandomFloor(0, innerHeight),
            dx = getRandom(-velocity, velocity),
            dy = getRandom(-velocity, velocity),
            r = getRandom(minRadius, maxRadius),
            c = "#b17a4f";
        particles.push(new Particle(x, y, dx, dy, r, c));
    }
}
function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    particles.forEach((particle) => {
        particle.move(ctx);
    });
}
window.addEventListener("resize", () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    getParticles();
});
