
// Creeaza un element div care va fi cursorul personalizat
const cursor = document.createElement("div");

// Seteaza un ID pentru acest element
cursor.id = "cursor";

// Adauga cursorul in pagina
document.body.appendChild(cursor);

// Initializam nuanta culorii la 0
let hue = 0;

// Urmareste miscarea mouse-ului
document.addEventListener("mousemove", (e: MouseEvent) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Schimba continuu culoarea cursorului
function animateColor() {
    hue = (hue + 1) % 360;

    cursor.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    cursor.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 50%)`;

    requestAnimationFrame(animateColor);
}

// Porneste animatia
animateColor();

