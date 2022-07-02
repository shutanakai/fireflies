import contextFilterPolyfill from "https://cdn.skypack.dev/context-filter-polyfill@0.2.4";
document.addEventListener("DOMContentLoaded", () => {
  new Fireflies();
});

class Fireflies {
  constructor() {
    const canvas = document.getElementById("myCanvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.alpha = 0.01;
    this.count = 10;
    this.params = [...Array(this.count)].map(() => {
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        radius: Math.random() * 50,
        speed: Math.random() / 30
      };
    });
    this.arcs = this.params.map(
      (param) => new FireFly(...Object.values(param))
    );
    this.render();
  }

  render() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.arcs.forEach((arc, index) => {
      arc.x =
        arc.x < this.width
          ? arc.x + (Math.random() - 0.5) * 2
          : this.params[index].x;
      arc.y =
        arc.y < this.height
          ? arc.y + (Math.random() - 0.5) * 2
          : this.params[index].y;
      arc.render(this.context);
    });
    setTimeout(() => this.render(), 34);
  }
}

class FireFly {
  constructor(x, y, radius, speed) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.alpha = 0.01;
  }

  render(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    context.filter = `blur(${this.radius / 4}px)`;
    if (this.alpha > 0.99) {
      this.direction = "decrement";
    } else if (this.alpha < 0.01) {
      this.x += this.x + (Math.random() - 0.5) * 2;
      this.y += this.y + (Math.random() - 0.5) * 2;
      this.direction = "increment";
    }
    this.alpha =
      this.direction === "increment"
        ? this.alpha + this.speed
        : this.alpha - this.speed;
    context.fillStyle = `rgba(255, 255, 153, ${this.alpha})`;
    context.fill();
  }
}