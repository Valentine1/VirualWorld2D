class Graph {
  constructor(points = [], segments = []) {
    this.points = points;
    this.segments = segments;
  }

  addPoint(pt) {
    this.points.push(pt);
  }

  tryAddPoint(pt) {
    if(!this.containsPoint(pt)) {
      this.addPoint(pt);
      return true;
    }
    return false;
  }

  removePoint(point) {
    const segments = this.getSegmentsWithPoint(point);
    segments.forEach(seg => this.removeSegment(seg));

    this.points.splice(this.points.indexOf(point), 1);
  }

  tryAddSegment(seg) {
    if(seg.p1.equals(seg.p2)) {
      return false;
    }
    if(!this.containsSegment(seg)) {
      this.addSegment(seg);
      return true;
    }
    return false;
  }

  containsSegment(seg) {
    return this.segments.find(
      s => s.equals(seg)
    );
  }

  addSegment(seg) {
    this.segments.push(seg);
  }

  removeSegment(seg) {
    this.segments.splice(this.segments.indexOf(seg), 1);
  }

  getSegmentsWithPoint(point) {
    return this.segments.filter(
      seg => seg.include(point)
    )
  }
  
  containsPoint(pt) {
    return this.points.find(
      p => p.equals(pt)
    );
  }

  dispose() {
    this.points.length = 0;
    this.segments.length = 0;
  }

  draw(ctx) {
    for (const seg of this.segments) {
      seg.draw(ctx);
    }
    for (const point of this.points) {
      point.draw(ctx);
    }
  }
}