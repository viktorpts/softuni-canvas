import { config, app } from './app.js';

window.addEventListener('load', async () => {
    const imgCache = {};
    const imgList = config().img;
    for (let img of imgList) {
        imgCache[img] = await createImageBitmap(await (await fetch(`assets/${img}`)).blob());
    }

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.font = '20px Consolas, sans-serif';

    const draw = createRenderer(ctx, imgCache);
    const instance = app(draw);

    canvas.addEventListener('click', (ev) => {
        const x = ev.clientX - canvas.offsetLeft;
        const y = ev.clientY - canvas.offsetTop;

        instance.onClick(x, y);
    });

    document.addEventListener('keydown', (ev) => {
        instance.onKey(ev.code, true);
    });
    document.addEventListener('keyup', (ev) => {
        instance.onKey(ev.code, false);
    });

    instance.start();

    if (instance.hasOwnProperty('render')) {
        let lastTime = 0;
        let delta = 0;
        const tick = instance.tick || (() => { });
        main();

        function main(time = 0) {
            delta += (time - lastTime);
            lastTime = time;
            if (delta > 1000) { delta = 20; }
            while (delta > 20) {
                delta -= 20;
                tick();
            }
            instance.render();
            requestAnimationFrame(main);
        }
    }
});


function createRenderer(ctx, imgCache) {

    function clear() {
        ctx.clearRect(0, 0, 800, 600);
    }

    function grid() {

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

    function image(fileName, x, y, scale = 1) {
        const img = imgCache[fileName];
        const w = img.width * scale;
        const h = img.height * scale;
        ctx.drawImage(imgCache[fileName], x - (img.width * scale * 0.5), y - (img.height * scale * 0.5), w, h);
    }

    function rect(x, y, w, h, color = 'black') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
    }

    function circle(x, y, radius, color = 'red') {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.moveTo(x, y);
        ctx.ellipse(x, y, radius, radius, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    }

    function text(content, x, y, color = 'black') {
        ctx.fillStyle = color;
        ctx.fillText(content, x, y);
    }

    return {
        clear,
        grid,
        image,
        rect,
        circle,
        text
    };
}