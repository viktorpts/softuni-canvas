# SoftUni Canvas

This is a simple app, demonstrating the use of HTML5 canvas. There is an engine that exposes several drawing methods and event listeners. All of your logic can be places inside `./js/app.js` and use the provided methods to visualize results.


## Install and Run

You need a github profile, in order to download the project with the actions **"fork"** and **"check out"**. The app must be served locally, used an HTTP server. I recommned `lite-server`, since it's very simple to use. Just follow these steps:

### Fork the project
This will create a copy of the project in your own library.

### Check out the project files to your computer
This downloads all the files to your computer, so you may launch the app and edit the code.

### Install `lite-server`
You need a local HTTP server to be able to launch the app without hosting. You don't need to perform this step if you have another server already installed.

### Open project in VS Code
Just open the project folder in the IDE

### Launch the project!
Bring up the VS Code console (`Ctrl+\``), type `lite-server` and press enter. The project should load for a few seconds and launch automatically in your browser.

### Edit the files!
You can now make changes to the code. When you save your files, the browser will automatically refresh.

## How to Use

### Canvas and Coordinates

The page contains the so-called canvas, which is a 800x600 pixels area, on which you may draw. Coordinates 0,0 are located in the upper-left corner and 800,600 - in the lower-right. That means the x-positive direction is from left to right, and y-positive - from top to bottom.

### Files and Functions

Inside the file `./js/app.js` there are two functions: `config` and `app`. The `config` function returns an object with a list of file names. Initially, it will include all files that ship with the project, but you can add more. Just drop the files inside the `./assets/` folder and add their names to this list.

The `app` function receives a single parameter - the object `draw`. This object contains all functions for drawing on the page. They are as follows:

`draw.clear()` - Clear the canvas. This makes the canvas completely wihte.

`draw.grid()` - Draw a square grid. Each square is 50x50 pixles. The darkers grid is 200x200 pixels. You don't need the grid, but it's usefull to gauge screen coordinates.

`draw.image(fileName, x, y, scale)` - Draw an image file on the canvas, centered at the specified coordinats and scale. The filename must match one of the files inside `config`. All files must be placed inside the folder `./assets/`. The file type is not important, as long as it's an image. If scale is not provided, it will be drawn at 1:1 scale (full size).

`draw.rect(x, y, w, h, color) - Draw a rectangle with upper-left corner at `x,y` coordinates and scpecified width and height. Color can be a string (red, green, blue, yellow, etc.) or a CSS hexadecimal color (#6f4d56, etc.).
