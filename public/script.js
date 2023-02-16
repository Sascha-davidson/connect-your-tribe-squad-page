let canvas = document.querySelector('.canvas')
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = "green";
context.fillRect(10, 10, 150, 100);

const scene = engine.createScene();

const a = new Circle(new Vector2(innerWidth / 2, innerHeight / 2), 125, "green", false);
const b = new Circle(new Vector2(innerWidth / 3, innerHeight / 2), 125, "red", false)

a.velocity = new Vector2(-5,5);
b.velocity = new Vector2(5,4);

let background = new Cube(new Vector2(0,0),window.innerWidth, window.innerHeight);
background.color = "black";


scene.addGameObjects(a, b, background)

scene.OnUpdate.AddListener(update);

function update() {
    ConfineInScreen.ConfineCircleInScreen(a)
    ConfineInScreen.ConfineCircleInScreen(b)

    if (a.position.distanceTo(b.position) < a.radius + b.radius) {
        Circle.resolveCollision(a,b);
    }
}