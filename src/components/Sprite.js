export default class Sprite {
  constructor(p, animation, x, y, speed) {
    this.x = x;
    this.y = y;
    this.animation = animation;
    this.w = this.animation[0].width;
    this.len = this.animation.length;
    this.speed = speed;
    this.index = 0;
    this.p = p;
  }

  show() {
    let index = Math.floor(this.index) % this.len;

    this.p.image(this.animation[index], this.x, this.y);
  }

  animate() {
    this.index += this.speed;
    // this.x -= this.speed * 5;

    if (this.x < -33) {
      this.x = 700;
      this.y = 100 + Math.random(500);
    }
  }
}
