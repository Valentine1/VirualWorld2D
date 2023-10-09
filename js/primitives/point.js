class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(ctx, {
    size = 18, 
    color = "black",
    outline = false,
    fill = false
  } = {}) {
    this.size = size;
    const r = size/2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fill();
    if(outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, r * 0.6, 0, Math.PI * 2)
      ctx.stroke();
    }

    if(fill) {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(this.x, this.y, r * 0.5, 0, Math.PI * 2)
      ctx.fill();
    }
  }

  equals(pt) {
    return  (this.x > (pt.x - this.size ) 
      && this.x < (pt.x + this.size ))
      && 
      (this.y > (pt.y - this.size ) 
      && this.y < (pt.y + this.size ));
  }
}