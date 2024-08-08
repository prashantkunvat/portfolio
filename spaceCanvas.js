const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
const numStars = 100;

const mouse = {
	x: null,
	y: null,
};

window.addEventListener("mousemove", (event) => {
	mouse.x = event.x;
	mouse.y = event.y;
});

class Star {
	constructor(x, y, radius, color) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.dx = (Math.random() - 0.5) * 2;
		this.dy = (Math.random() - 0.5) * 2;
	}

	draw() {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}

	update() {
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}
		if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		this.draw();
	}
}

function randomColor() {
	const r = Math.floor(Math.random() * 256);
	const g = Math.floor(Math.random() * 256);
	const b = Math.floor(Math.random() * 256);
	return `rgb(${r},${g},${b})`;
}

function init() {
	stars = [];
	for (let i = 0; i < numStars; i++) {
		const radius = Math.random() * 2;
		const x = Math.random() * (canvas.width - radius * 2) + radius;
		const y = Math.random() * (canvas.height - radius * 2) + radius;
		const color = randomColor();
		stars.push(new Star(x, y, radius, color));
	}
}

function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	init(); // Reinitialize stars on resize
}

window.addEventListener("resize", resizeCanvas);

function animate() {
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	stars.forEach((star) => {
		star.update();
	});
}

resizeCanvas(); // Initial setup
animate();
