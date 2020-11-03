window.addEventListener('load', () => {
    const scoreSpan = document.querySelector('#score');
    const fpsSpan = document.querySelector('#fps');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('click', (e) => {
        const targetX = e.clientX - offsetLeft;
        const targetY = e.clientY - offsetTop;

        for (let circle of circles) {
            if (inCircle(targetX, targetY, circle.position.x, circle.position.y, radius)) {
                circle.alive = false;
            }
        }
    });

    const offsetLeft = canvas.offsetLeft;
    const offsetTop = canvas.offsetTop;
    const radius = 40;
    let level = 1;
    let score = 0;
    let speed = 5;

    let circles = [];


    let lastTime = 0;
    let delta = 0;

    nextCircle();
    render();

    function getRandomCoords() {
        return { x: 100 + Math.random() * 600, y: 100 + Math.random() * 400 };
    }

    function getRadnomVelocity() {
        const a = Math.random() * 2 * Math.PI;

        return { x: speed * Math.cos(a), y: speed * Math.sin(a) };
    }

    function nextCircle() {
        for (let i = 0; i < level; i++) {
            circles.push({
                alive: true,
                position: getRandomCoords(),
                velocity: getRadnomVelocity()
            });
        }
    }

    function render(time = 0) {
        delta += (time - lastTime);
        lastTime = time;


        requestAnimationFrame(render);

        circles = circles.filter(c => c.alive);
        if (circles.length == 0) {
            score++;
            if (score % 5 == 0) {
                speed *= 1.25;
                level++;
            }
            scoreSpan.innerHTML = `Level: ${level}<br>Current score: ${score}`;

            nextCircle();
        }


        ctx.clearRect(0, 0, 800, 600);
        drawGrid(ctx);

        if (delta > 1000) { delta = 20; }
        while (delta > 20) {
            delta -= 20;

            for (let circle of circles) {
                if ((circle.position.x > 800 - radius && circle.velocity.x > 0) ||
                    (circle.position.x < radius && circle.velocity.x < 0)) {
                    circle.velocity.x *= -1;
                }

                if ((circle.position.y > 600 - radius && circle.velocity.y > 0) ||
                    (circle.position.y < radius && circle.velocity.y < 0)) {
                    circle.velocity.y *= -1;
                }

                circle.position.x += circle.velocity.x;
                circle.position.y += circle.velocity.y;
            }
        }

        for (let circle of circles) {
            drawCircle(ctx, circle.position.x, circle.position.y, radius);
        }
    }

    document.querySelector('#clearBtn').addEventListener('click', () => {
        ctx.clearRect(30, 30, 500, 300);
    });

    document.querySelector('#drawBtn').addEventListener('click', () => {
        // 1280, 780
        const source = document.querySelector('img');
        ctx.drawImage(source, 120, 120, 640, 640, 50, 50, 200, 200);
    });

    document.querySelector('#moveBtn').addEventListener('click', () => { });
});

function inCircle(x, y, circleX, circleY, radius) {
    const w = x - circleX;
    const h = y - circleY;

    return Math.sqrt(w ** 2 + h ** 2) <= radius;
}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {number} x 
 * @param {number} y 
 */
function drawCircle(ctx, x, y, radius) {
    ctx.beginPath();

    ctx.fillStyle = 'red';

    ctx.moveTo(x, y);
    ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.closePath();
}

function drawGrid(ctx) {

    for (let y = 50; y < 600; y += 50) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(800, y);

        if (y % 200 == 0) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        }

        ctx.stroke();
        ctx.closePath();
    }

    for (let x = 50; x < 800; x += 50) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 600);

        if (x % 200 == 0) {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
        } else {
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.25)';
        }

        ctx.stroke();
        ctx.closePath();
    }

}

/**
 * 
 * @param {CanvasRenderingContext2D} ctx 
 */
function draw(ctx) {
    // Draw blue rectangle
    ctx.fillStyle = 'blue';
    ctx.fillRect(20, 20, 100, 100);

    // Draw line
    ctx.lineWidth = 10;
    ctx.lineJoin = "round";
    ctx.lineCap = "square";
    // Line from 300,450 to 500,450
    ctx.strokeStyle = 'green';
    ctx.beginPath();
    ctx.moveTo(300, 450);
    ctx.lineTo(500, 450);
    ctx.lineTo(500, 100);
    ctx.lineTo(400, 350);
    ctx.stroke();
    ctx.closePath();
    ctx.fill();

    // Line from 400,350 to 200,400
    ctx.strokeStyle = 'rgb(255, 0, 255)';
    ctx.beginPath();
    ctx.moveTo(400, 350);
    ctx.lineTo(200, 400);
    ctx.stroke();

    ctx.closePath();
}