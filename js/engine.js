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

    const keys = {};
    document.addEventListener('keydown', (ev) => {
        keys[ev.code] = true;
    });
    document.addEventListener('keyup', (ev) => {
        keys[ev.code] = false;
    });

    function handleKeyboard() {
        if (Object.values(keys).reduce((p, c) => p || c, false)) {
            instance.onKey(keys);
        }
        requestAnimationFrame(handleKeyboard);
    }
    requestAnimationFrame(handleKeyboard);

    instance.start();
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
        ctx.drawImage(imgCache[fileName], x, y, w, h);
    }

    function rect(x, y, w, h, color = 'black') {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, w, h);
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
        text
    };
}