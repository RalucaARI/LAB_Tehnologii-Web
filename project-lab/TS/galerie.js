// Array cu imaginile din folderul MEDIA
const images = [
    "../MEDIA/g1.jpg",
    "../MEDIA/g2.jpg",
    "../MEDIA/g3.jpg",
    "../MEDIA/g4.jpg"
];
// Obtinem elementul principal din DOM
const mainImage = document.getElementById("carousel-image");
// Verificam daca elementul exista
if (!mainImage)
    throw new Error("Imaginea nu a fost gasita");
// Indexul imaginii curente
let currentIndex = 0;
// Functie care schimba imaginea mare
function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    mainImage.src = images[currentIndex];
    // Animatie de marire a imaginii
    mainImage.style.transform = "scale(1.1)";
    // Revine la dimensiunea normala
    setTimeout(() => {
        mainImage.style.transform = "scale(1)";
    }, 500);
}
// Schimba imaginea automat la 3 secunde
setInterval(showNextImage, 3000);
export {};
