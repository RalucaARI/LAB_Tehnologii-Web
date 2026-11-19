export {};

const images: string[] = [
    "/static/MEDIA/g1.jpg",
    "/static/MEDIA/g2.jpg",
    "/static/MEDIA/g3.jpg",
    "/static/MEDIA/g4.jpg"
];

const mainImage = document.getElementById("carousel-image") as HTMLImageElement;

if (!mainImage) {
    throw new Error("Imaginea nu a fost gasita");
}

let currentIndex = 0;

function showNextImage() {
    currentIndex = (currentIndex + 1) % images.length;

    mainImage.src = images[currentIndex];

    mainImage.style.transform = "scale(1.1)";

    setTimeout(() => {
        mainImage.style.transform = "scale(1)";
    }, 500);
}

setInterval(showNextImage, 3000);