export function config() {
    return {
        img: [
            'cat.png',
            'dog.png',
            'mouse.png',
        ]
    };
}

export function app(draw) {
    const catLoc = {
        x: 300,
        y: 300
    };

    function drawScene() {
        draw.clear();
        draw.grid();
        draw.image('cat.png', catLoc.x, catLoc.y, 0.25);
    }

    function start() {
        drawScene();
    }

    function onClick(x, y) {
        console.log(x, y);
    }

    function onKey(keys) {
        if (keys['ArrowUp']) {
            catLoc.y -= 2;
        } else if (keys['ArrowDown']) {
            catLoc.y += 2;
        }

        if (keys['ArrowLeft']) {
            catLoc.x -= 2;
        } else if (keys['ArrowRight']) {
            catLoc.x += 2;
        }

        drawScene();
    }

    return {
        start,
        onClick,
        onKey
    };
}