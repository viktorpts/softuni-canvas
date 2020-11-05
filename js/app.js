export function config() {
    return {
        img: [
            // List all file names from the folder ./assets/ that you want to use
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
    const mice = [];

    function drawScene() {
        draw.clear();
        draw.grid();
        draw.image('cat.png', catLoc.x, catLoc.y, 0.25);
        for (let mouse of mice) {
            draw.image('mouse.png', mouse.x, mouse.y, 0.1);
        }
    }

    // This function is executed when the application starts
    function start() {
        drawScene();
    }

    // This function is executed when you click on the page
    function onClick(x, y) {
        console.log(x, y);

        mice.push({ x: x - 50, y: y - 25 });
        drawScene();
    }

    // This function is executed when you press a key on the keyboard
    function onKey(key, pressed) {
        console.log(key, pressed);

        if (key == 'ArrowUp' && pressed) {
            catLoc.y -= 5;
        } else if (key == 'ArrowDown' && pressed) {
            catLoc.y += 5;
        }

        if (key == 'ArrowLeft' && pressed) {
            catLoc.x -= 5;
        } else if (key == 'ArrowRight' && pressed) {
            catLoc.x += 5;
        }

        drawScene();
    }

    return {
        start,
        onClick,
        onKey
    };
}