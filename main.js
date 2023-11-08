import * as THREE from './three.module.js';


//Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
  );
  
  const renderer = new THREE.WebGLRenderer(
  { canvas: document.querySelector('#bg') }
  );
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.setZ(30);
  camera.position.setX(-3);
  
  renderer.render(scene, camera);
  
  //Pog

  const geoPog = new THREE.CylinderGeometry(20.37, 20.37, 3, 50);
  const texturePog = new THREE.TextureLoader().load('gokuRad.jpg')
  const matPog = new THREE.MeshStandardMaterial(
    {
      color: 0xFFFFFF,
      wireframe: false,
      map: texturePog,
    }
  );
  
  const pog = new THREE.Mesh(geoPog, matPog);
  pog.rotation.x = 45;
  // pog.rotation.y = 7.85;
  
  
  scene.add(pog);
  pog.scale.set(0.1, 0.1, 0.1)
  pog.position.z = -4
  
//lights

const pointLight = new THREE.PointLight(0xFFFFFF, 1000)
pointLight.position.set(0, 20, 20)

const ambientLight = new THREE.AmbientLight(0xFFFFFF, 1)


scene.add(pointLight)
scene.add(ambientLight)

//HELPERS
// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50);
// const axesHelper = new THREE.AxesHelper(20, 20, 20);

//scene.add(lightHelper, gridHelper, axesHelper)




function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshBasicMaterial({ color: 0xFFFFFF })
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(500));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(2000).fill().forEach(addStar)

//BACKGROUND
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;
// const render = () => {
//   background.position.copy(
//     camera.position)
// };



//Avatar
// const beckTexture = new THREE.TextureLoader().load('beck.png')

// const beck = new THREE.Mesh(
  //   new THREE.BoxGeometry(3, 3, 3),
  //   new THREE.MeshBasicMaterial({ map: beckTexture })
  // );
  
  // scene.add(beck);
  
  
  //pops
  const popsTexture = new THREE.TextureLoader().load('popstexture.jpg')
 // const normalTexture = new THREE.TextureLoader().load('normal.jpg')
  
  const pops = new THREE.Mesh(
    new THREE.SphereGeometry(6, 64, 64),
    new THREE.MeshStandardMaterial({
      map: popsTexture,
     // normalMap: normalTexture
    })
    );
    
    scene.add(pops)

pops.position.z = 30;
pops.position.setX(-10);


function moveCamera() {
  
  const t = document.body.getBoundingClientRect().top;
  pops.rotation.x += 0.01;
  pops.rotation.y += 0.013;
  pops.rotation.z += 0.01;
  
  // beck.rotation.y += 0.01;
  // beck.rotation.x += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  
}

document.body.onscroll = moveCamera;
moveCamera();

//Animation Loop

function animate(time) {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  pog.rotation.z += 0.03

  //controls.update();

  pops.rotation.x += 0.01;
  
  
  
  renderer.render(scene, camera);
}

animate();

