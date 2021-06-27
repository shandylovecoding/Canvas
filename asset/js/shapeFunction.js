function addRect(x, y, w, h, fill, stroke, lineWidth) {
    var rect = new Rect;
    rect.x = x;
    rect.y = y;
    rect.w = w
    rect.h = h;
    rect.fill = fill;
    rect.stroke = stroke
    rect.lineWidth = lineWidth
    boxes.push(rect);
    console.log(boxes)
    invalidate();
  }

  function addLine(x, y, w, h, fill, stroke, lineWidth) {
    var line = new Line;
    line.x = x;
    line.y = y;
    line.w = w
    line.h = h;
    line.fill = fill;
    line.stroke = stroke
    line.lineWidth = lineWidth
    boxes.push(line);
    console.log(boxes)
    invalidate();
  }

  function addQuadratic(x, y, cx, cy, w, h, stroke, lineWidth) {
    var quadratic = new Quadratic;
    qquadratic.x = x;
    qquadratic.y = y;
    qquadratic.cx = cx;
    qquadratic.cy = cy;
    qquadratic.w = w
    qquadratic.h = h;
    qquadratic.stroke = stroke
    qquadratic.lineWidth = lineWidth
    boxes.push(quadratic);
    console.log(boxes)
    invalidate();
  }