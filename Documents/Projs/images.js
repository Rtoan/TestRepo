/* const image = document.querySelector('.image');
if (image != null){
    console.log(image);
} else {
console.log("0");
}

image.addEventListener('mousemove', function (e) {
 let width = image.offsetWidth;
 let height = image.offsetHeight;
 let mouseX = e.offsetX;
 let mouseY = e.offsetY;
 
 let bgPosX = (mouseX / width * 100);
 let bgPosY = (mouseY / height * 100);
 console.log("1");
 image.style.backgroundPosition = `${bgPosX}% ${bgPosY}%`;
});

image.addEventListener('mouseleave', function () {
 image.style.backgroundPosition = "center";
 console.log("2");
}); */