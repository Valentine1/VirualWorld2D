function getNearestPoint(loc, points) {
  let minDist =  Number.MAX_SAFE_INTEGER;
  let nearest = null;
  for (index in points) {
    const dist = distance(points[index], loc);
    if(dist < points[index].size/2) {
      nearest = points[index];
      break;
    }
  }
  return nearest;
}
 
function distance(p1, p2) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}