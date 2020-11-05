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
    const catPosition = {
        x: 300,
        y: 300
    };
    const mice = [];

    function drawScene() {
        // Clear previous frame and draw grid
        draw.clear();
        draw.grid();

        // Get cat coordinates and draw on scene at 25% scale
        draw.image('cat.png', catPosition.x, catPosition.y, 0.25);

        // Iterate mice array and draw each mouse at 10% scale
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

        mice.push({ x: x, y: y });
        drawScene();
    }

    // This function is executed when you press a key on the keyboard
    function onKey(key, pressed) {
        console.log(key, pressed);

        if (key == 'ArrowUp' && pressed) {
            catPosition.y -= 5;
        } else if (key == 'ArrowDown' && pressed) {
            catPosition.y += 5;
        }

        if (key == 'ArrowLeft' && pressed) {
            catPosition.x -= 5;
        } else if (key == 'ArrowRight' && pressed) {
            catPosition.x += 5;
        }

        drawScene();
    }

    return {
        start,
        onClick,
        onKey
    };
}