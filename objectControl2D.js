function moveTo(from, to, speed, duration) {
  // from, to are objects with the following structure:
  // { x: [number], y: [number] }
  // speed is a number, duration is a number (of seconds)

  // calculating the distance between two points
  const getVectorDistance = (start, end = to) =>
    Math.sqrt(Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2));

  const round = (num, digits = 2) =>
    Math.floor(num * Math.pow(10, digits)) / Math.pow(10, digits);

  const getNextPoint = (start, normSpeed) => {
    const { x: x1, y: y1 } = start;
    const { x: x2, y: y2 } = normSpeed;

    const newX = from.x < to.x ? x1 + x2 : x1 - x2;
    const newY = from.y < to.y ? y1 + y2 : y1 - y2;
    return { x: round(newX), y: round(newY) };
  };

  const normalizedSpeed = {
    x:
      from.x < to.x
        ? (speed * to.x) / getVectorDistance(from)
        : (speed * from.x) / getVectorDistance(from),
    y:
      from.y < to.y
        ? (speed * to.y) / getVectorDistance(from)
        : (speed * from.y) / getVectorDistance(from),
  };

  let currentPoint = Object.assign({}, from);
  const arrOfPoints = [{ ...currentPoint }];

  for (let i = 1; i < duration; i += 1) {
    const distanceLeft = getVectorDistance(currentPoint);
    const nextPoint =
      distanceLeft > speed
        ? getNextPoint(currentPoint, normalizedSpeed)
        : Object.assign({}, to);
    arrOfPoints.push(nextPoint);
    currentPoint = nextPoint;
  }

  return arrOfPoints;
}

function rotate(from, to, rotationSpeed, duration) {
  // from is object with the following structure:
  // { x: [number], y: [number], angle: [number] }
  // 0 angle means that vector coincides with the x axis

  // to can either be a number (in degrees) or a point,i.e. the following object: { x: [number], y: [number] }

  // rotationSpeed is a number
  // duration is a number (of seconds)

  const calcAngle = (from, to) => {
    const { x: x1, y: y1 } = from;
    const { x: x2, y: y2 } = to;
    const y3 = y1 < y2 ? y1 : y2;
    const x3 = y3 === y1 ? x2 : x1;

    // modules
    const m1 = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const m2 = Math.sqrt(Math.pow(x3 - x1, 2) + Math.pow(y3 - y1, 2));

    // scalar product of two vectors/modules:
    const sp = (x2 - x1) * (x3 - x1) + (y2 - y1) * (y3 - y1);

    // cos of the angle we're looking for
    const cosA = sp / (m1 * m2);
    const resultAngle =
      (x1 < x2 && y1 < y2) || (x2 < x1 && y2 < y1)
        ? Math.round(Math.acos(cosA) * 180)
        : 180 - Math.round(Math.acos(cosA) * 180);
    return resultAngle;
  };
  const normalizeAngle = (a) => (a > 180 ? a - 360 : a);
  const toAngle = typeof to === 'object' ? calcAngle(from, to) : to;

  let delta = normalizeAngle(toAngle) - normalizeAngle(from.angle);
  let currentAngle = from.angle;
  const rotSpeedAdjust = rotationSpeed * Math.sign(delta);
  const arrOfPoints = [{ ...from }];
  for (let i = 1; i < duration; i += 1) {
    let nextAngle =
      Math.abs(delta) >= 0 && Math.abs(delta) >= rotationSpeed
        ? currentAngle + rotSpeedAdjust
        : toAngle;
    if (nextAngle > 360) {
      nextAngle -= 360;
    }
    delta =
      Math.abs(delta - rotationSpeed) >= 0 ? delta - rotSpeedAdjust : delta;
    arrOfPoints.push({ ...from, angle: nextAngle });
    currentAngle = nextAngle;
  }
  return arrOfPoints;
}

function moveDynamicallyTo(from, to, speed, duration, acceleration, dt = 1) {
  // from, to are objects with the following structure:
  // { x: [number], y: [number] }

  // speed is a number
  // duration is a number (of seconds)

  // if acceleration is negative, the movement will be slowing down
  // dt is period of time during which the speed is changing

  const getAccelSpeed = (speed, accel = acceleration, time = dt) =>
    speed + accel * time;

  const getNextPoint = (speed, start = from, end = to) => {
    const [, nextPoint] = moveTo(start, end, speed, 2);
    return (nextPoint.x < end.x && from.x < to.x) ||
      (nextPoint.x > end.x && from.x > to.x)
      ? nextPoint
      : { ...end };
  };

  let currentSpeed = speed;
  let currentPoint = Object.assign({}, from);
  const arrOfPoints = [currentPoint];

  for (let i = 1; i < duration; i += 1) {
    const accelSpeed = getAccelSpeed(currentSpeed);
    const nextPoint =
      accelSpeed >= 0
        ? getNextPoint(accelSpeed, currentPoint)
        : { ...currentPoint };
    arrOfPoints.push(nextPoint);
    currentSpeed = accelSpeed;
    currentPoint = nextPoint;
  }

  return arrOfPoints;
}

export { moveTo, moveDynamicallyTo, rotate  };
