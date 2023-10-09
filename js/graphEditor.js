class GraphEditor {
  constructor(canvas, graph) {
    this.canvas = canvas;
    this.graph = graph;

    this.ctx = canvas.getContext("2d");
    this.selected = null;
    this.hovered = null;
    this.dragging = false;
    this.mouse = null;
    this.#addEventListeners();
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent).draw(ctx, {dash: [3,3]});
      this.selected.draw(this.ctx, { outline: true });
    }
  }

  #addEventListeners() {
    this.canvas.onmousedown = ((evt) => {
      if (evt.button == 2) {
        if(this.selected) {
            this.selected = null;
        }
        else if (this.hovered) {
          this.#removePoint(this.hovered);
        }
      } else if (evt.button == 0) {
        if (this.hovered) {
          this.#setPointAndDrawSegment(this.hovered);
          this.dragging = true;
          return;
        }
        if (this.graph.tryAddPoint(this.mouse)) {
          this.#setPointAndDrawSegment(this.mouse);
          this.hovered = this.mouse;
        }
      }
    });

    this.canvas.addEventListener("mousemove", (evt) => {
      this.mouse = new Point(evt.offsetX, evt.offsetY);
      this.hovered = getNearestPoint(this.mouse, this.graph.points);
      if (this.dragging && this.selected) {
        this.selected.x = this.mouse.x;
        this.selected.y = this.mouse.y;
      }
    });

    this.canvas.addEventListener("contextmenu", (evt) => {
      evt.preventDefault();
    });

    this.canvas.addEventListener("mouseup", () => {
      this.dragging = false;
    });
  }

  #setPointAndDrawSegment(point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
  }

  #removePoint(point) {
    this.graph.removePoint(point);
    this.hovered = null;
    if (this.selected == point) {
      this.selected = null;
    }
  }
}
