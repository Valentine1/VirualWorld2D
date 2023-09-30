class Segment {
  constructor(pt1, pt2) {
    this.p1 = pt1;
    this.p2 = pt2;
  }

  draw(ctx, width = 2, color = "black") {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.moveTo(this.p1.x, this.p1.y);
    ctx.lineTo(this.p2.x, this.p2.y);
    ctx.stroke();
  }

  equals(seg) {
    return this.include(seg.p1) && this.include(seg.p2);
  }

  include(point) {
    return this.p1.equals(point) || this.p2.equals(point);
  }
}