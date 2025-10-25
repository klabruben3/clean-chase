const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

// Animation properties
const restartDistance = 10; //Distance before animation restarts
const speed = 0.03; //

// Circle properties
const circleCount = 10;
const fillColor = "white";
const strokeColor = "red";
const strokeWidth = 2;
const circleRad = 4; //

const resize = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

// Creates circles
const circles = [];

const createCircle = () => {
  for (let i = 0; i < circleCount; i++) {
    const circleX = Math.random() * canvas.width;
    const circleY = Math.random() * canvas.height;
    const circlePos = { x: circleX, y: circleY };

    circles.push(circlePos);
  }
}; //

// claculates the ratio of position(x and y) to dimension(width and height)
const calcPosRatio = () => {
  const circlesPosRatio = [];
  for (const circle of circles) {
    const xRatio = circle.x / canvas.width;
    const yRatio = circle.y / canvas.height;
    const circlePosRatio = { xR: xRatio, yR: yRatio };

    circlesPosRatio.push(circlePosRatio);
  }
  return circlesPosRatio;
};

// And this just updates the circle positions based on the ratio
const updateCirclePos = (circlesPosRatio) => {
  for (let i = 0; i < circleCount; i++) {
    circles[i].x = canvas.width * circlesPosRatio[i].xR;
    circles[i].y = canvas.height * circlesPosRatio[i].yR;
  }
};

// receives target x and y and the object to chase the target
const chase = (targetX, targetY, circle) => {
  const dx = targetX - circle.x;
  const dy = targetY - circle.y;

  circle.x += dx * speed;
  circle.y += dy * speed;
};

// Change the positions of the circles
const changePos = (pos) => {
  chase(pos.x, pos.y, circles[0]);

  for (let i = 0; i < circleCount - 1; i++) {
    chase(circles[i].x, circles[i].y, circles[i + 1]);
  }
};

const draw = () => {
  ctx.fillStyle = fillColor;
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = strokeWidth;
  for (const circle of circles) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circleRad, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();
  }
};

// Creates initial random target(x and y)
const createRandomPos = () => {
  const targetX = Math.round(Math.random() * canvas.width);
  const targetY = Math.round(Math.random() * canvas.height);
  return { x: targetX, y: targetY };
}; //

let currentRandomPos = createRandomPos();

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dx = currentRandomPos.x - circles[0].x;
  const dy = currentRandomPos.y - circles[0].y;

  // Changes the randomly generated targets
  if (Math.hypot(dx, dy) < restartDistance)
    currentRandomPos = createRandomPos();
  changePos(currentRandomPos);

  draw();

  requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  resize();
  const circlesPosRatio = calcPosRatio();
  updateCirclePos(circlesPosRatio);
});

resize();
createCircle();
animate();
