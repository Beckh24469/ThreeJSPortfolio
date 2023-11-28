import * as THREE from 'three';

//starting position of the images from the top
const STARTY = 0;

//create a new scene
const scene = new THREE.Scene();

//create and position the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = STARTY;
camera.position.z = 30;

//Create list of images in the img folder 
let imgList = [
    'me.png',
    'OSHA.png',
    'compTIA.png',
    'classpic.png',

]

//Add every listed image as a plane mesh with texture to scene
for (const image in imgList) {
    //Every mesh has a geometry texture and material
    const geometry = new THREE.PlaneGeometry(15, 18);
    const texture = new THREE.TextureLoader().load(imgList[image]);
    console.log(imgList[image]);
    const material = new THREE.MeshBasicMaterial({
        // color: 0xffff00,
        side: THREE.DoubleSide,
        map: texture //add the texture image here
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.x = -20;
    // texture.wrapS = THREE.RepeatWrapping;
    // texture.repeat.x = - 1;
    
    //add a new plane
    scene.add(plane);

}

// plane.position.y = 10;
console.log(scene);

//BACKGROUND
const backTexture = new THREE.TextureLoader().load('canvas.png');
scene.background = backTexture;


//Move the camera with the scroll bar 
function moveCamera() {

    const top = document.body.getBoundingClientRect().top;
    camera.position.y = STARTY + top * 0.1
    console.log(top);
}

//add scrollbar event to move camera
document.body.onscroll = moveCamera;

//resize the ThreeJS canvas with the window and adjust for phone sizes
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Adjust for phone or desktop size
    if (window.innerWidth <= 600) {
        camera.position.x = -20``
        for (const child in scene.children) {
            scene.children[child].rotation.y = 0;
            scene.children[child].position.y = child * -50;
        }
    } else {
        camera.position.x = 15
        for (const child in scene.children) {
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            scene.children[child].position.y = (child * -26) + 10;
        }
    }
}

//Resize canvas on window resize
window.addEventListener('resize', resizeWindow, false);

//create the renderer and attach to the canvas
const renderer = new THREE.WebGLRenderer(
    { canvas: document.querySelector('#bg') }
);

//Set initial canvas size
resizeWindow();

//Set renderer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//animation loop (calls itself recursively)
function animate(time) {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

//Start the animation
animate();