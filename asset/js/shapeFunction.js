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

  function addCircle(x, y, w, h, fill, stroke, lineWidth) {
    var circle = new Circle;
    circle.x = x;
    circle.y = y;
    circle.w = w
    circle.h = h;
    circle.fill = fill;
    circle.stroke = stroke
    circle.lineWidth = lineWidth
    boxes.push(circle);
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
    quadratic.x = x;
    quadratic.y = y;
    quadratic.cx = cx;
    quadratic.cy = cy;
    quadratic.w = w
    quadratic.h = h;
    quadratic.stroke = stroke
    quadratic.lineWidth = lineWidth
    boxes.push(quadratic);
    console.log(boxes)
    invalidate();
  }

  function addBezier(x, y, cx1, cy1, cx2, cy2, w, h, stroke, lineWidth) {
    var bezier = new Bezier;
    bezier.x = x;
    bezier.y = y;
    bezier.cx1 = cx1;
    bezier.cy1 = cy1;
    bezier.cx2 = cx2;
    bezier.cy2 = cy2;
    bezier.w = w
    bezier.h = h;
    bezier.stroke = stroke
    bezier.lineWidth = lineWidth
    boxes.push(bezier);
    console.log(boxes)
    invalidate();
  }

  function addPen(x, y, x2, y2, fill, lineWidth) {
    var pen = new Pen;
    pen.x = x;
    pen.y = y;
    pen.x2 = x2;
    pen.y2 = y2;
    pen.fill = fill;
    pen.lineWidth = lineWidth
    boxes.push(pen);
    console.log(boxes)
    invalidate();
  }

  function addPolyLine(arr, x, y, stroke, lineWidth) {
    var polyline = new PolyLine;
    polyline.arr = arr;
    polyline.x = x;
    polyline.y = y;
    polyline.stroke = stroke;
    polyline.lineWidth = lineWidth
    boxes.push(polyline);
    console.log(boxes)
    invalidate();
  }

  function addPolygon(x, y, w, h, radius, side, fill, stroke, lineWidth) {
    var polygon = new Polygon;
    polygon.x = x;
    polygon.y = y;
    polygon.w = w
    polygon.h = h;
    polygon.radius = radius;
    polygon.side = side;
    polygon.fill = fill;
    polygon.stroke = stroke
    polygon.lineWidth = lineWidth
    boxes.push(polygon);
    console.log(boxes)
    invalidate();
  }