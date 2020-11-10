# SoftUni Canvas

This is a simple app, demonstrating the use of HTML5 canvas. There is an engine that exposes several drawing methods and event listeners. All of your logic can be placed inside `./js/app.js` and use the provided methods to visualize results.

## Installation and Usage
[Read the instructions](https://github.com/viktorpts/softuni-canvas/wiki) on how to install and use the project!

## Quick Guide
Place your code inside the `start()` function of `./js/app.js`. Use the following commands:

```javascript
// Clear the canvas (white screen):
draw.clear()

// Draw 50x50 grid:
draw.grid()

// Draw a cat at coordinates [300;300], scaled down to 25% of original size:
draw.image('cat.png', 300, 300, 0.25);

// Draw blue rectangle at coordinates [100;50], with size 200x30 pixels:
draw.rect(100, 50, 200, 30, 'blue');

// Draw green circle at coordinates [400;600] with radius 50 pixels:
draw.circle(400, 600, 50, 'green');

// Draw the text 'Hello, Canvas!' in orange color, at coordinates [120;70]:
draw.text('Hello, Canvas!', 120, 70, '#ff9900');
```

The functions `onClick` and `onKey` will be **automatically executed** every time the user clicks on the page or presses a key on the keyboard.

For more information, [read the detailed instructions](https://github.com/viktorpts/softuni-canvas/wiki#how-to-use).

## Ideas
Everything inside the `app.js` file is achieved using tools you should be familiar with from the JS Fundamentals course. Play around with the provided drawing functions by calling them inside the `start()` function. Once you see how they work, you may attempt to implement something more interesting. Here are some ideas for you:
* Create a colored label: draw a rectangle and place some text over it
* Detect a mouse click at specific coordinates: print `true` on the console if the user clicks withing a specified range on the page
* Create clickable button: combine the previous two tasks and print `true` on the console if the user has clicked within the coordinates of the button
* Draw a message on the canvas when the user clicks the button
* Detect the distance between the cat and any of the mice: use the `catPosition` object and the `mice` array from the example and print on the console the distance between them. Use Pythagoras' theorem to calculate the distance!
* Remove a mouse, if the cat gets close to it: extend the previous task and remove from the array any mouse that is "caught" by the cat. Clear the screen and then redraw everything (except the removed mouse)
* **(advanced)** Open the `engine.js` file and look at the code at lines 33-50. What happens when you create a function `render` and add it to the returned object of `app()`? Try adding a `render` function and move all of your drawing code inside.
* **(advanced)** Use the newly created `render` function and make the mice move around and chase them with your cat!
