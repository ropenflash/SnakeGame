import cobra from "./Cobra.png";
import data2 from "./cobra.json";
import Sprite from "./Sprite";

let w = 0;
export default p => {
  var x = 100;
  var y = 100;

  let spritesheet;
  let spritedata;
  let animation = [];
  let c;

  p.preload = function() {
    spritesheet = p.loadImage(cobra);
  };
  p.setup = function() {
    p.createCanvas(100, 200);
    let frames = data2.frames;
    frames.forEach(frame => {
      let pos = frame.position;
      let image = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
      animation.unshift(image);
    });
    c = new Sprite(p, animation, 20, 15, 0.1);
    p.strokeWeight(10);
  };
  p.draw = function() {
    // p.background(170, 170, 235);
    p.background(255);
    // p.translate(50, 50);
    p.ellipse(30, 40, 50, 50);
    // p.rotate(w);
    p.fill(254);
    c.show();
    c.animate();
    w = w - 0.02;
  };
};
