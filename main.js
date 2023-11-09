import * as THREE from "three"
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './style.css'

//Loader de models GLTF
let loader = null
//Loader de textures

const scene = new THREE.Scene()

const fov = 60;
const aspect = window.innerWidth/window.innerHeight;  
const near = 0.1;
const far = 1000;


//---------------------CAMERA CONTROL----------------------
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.set(0,120,0)
camera.lookAt(new THREE.Vector3(0,0,0))

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild( renderer.domElement )

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;

////////ENTORN/////////////////
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
  'textures/environmentMaps/galaxia/px.png',
  'textures/environmentMaps/galaxia/nx.png',
  'textures/environmentMaps/galaxia/py.png',
  'textures/environmentMaps/galaxia/ny.png',
  'textures/environmentMaps/galaxia/pz.png',
  'textures/environmentMaps/galaxia/nz.png'
])

scene.background = environmentMap

//Textures planeta roca
const textureLoader = new THREE.TextureLoader()

const albedoMud = "textures/rock/textures/rock_wall_10_diff_1k.jpg"
const normalMud = "textures/rock/textures/rock_wall_10_nor_dx_1k.jpg"
const roughMud = "textures/rock/textures/rock_wall_10_rough_1k.jpg"


const albedoTexture = textureLoader.load(albedoMud)
const normalTexture = textureLoader.load(normalMud)
const roughTexture = textureLoader.load(roughMud)


//------------------CREAM UN PUNT DE LLUM ENMITJ-------------------------
{
  const color = 0xFFFFFF;
  const intensity = 2000;
  const light = new THREE.PointLight(color, intensity);
  scene.add(light);
  
}

// array d’objectes dels quals hem d’actualitzar la rotació.
const objects = [];
 
// emprarem una mateixa esfera `per a tots.
const radius = 1;
const widthSegments = 18;
const heightSegments = 18;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);


//-------------CREAREM UN OBJECTE PARE PER ELS PLANETES-------------- 
//--------que no modifica parametres dels fills i es invisible-------------------
const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

//----------CREAREM UN OBJECTE PARE PER LA TERRA I LA LLUNA-----
const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = 10;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

//----------CREAREM UN OBJECTE PARE PER JUPITER I LA LLUNA Jupiter-----
const jupiterOrbit = new THREE.Object3D();
jupiterOrbit.position.x = 30;
jupiterOrbit.position.z = -15;

solarSystem.add(jupiterOrbit);
objects.push(jupiterOrbit);



   
//---------------------SOL----------------------------
const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(5, 5, 5);
//Feim el sol fill de solarsystem
solarSystem.add(sunMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(sunMesh);



//---------------------PLANETA TERRA-----------------------------
const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);

earthMesh.position.x = 10;
//Feim el planeta fill de solarsystem
solarSystem.add(earthMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(earthMesh);

//---------------------PLANETA ROCA PBR-----------------------------
const rocaMaterial = new THREE.MeshStandardMaterial({
  map: albedoTexture,
  normalMap: normalTexture, 
  roughnessMap: roughTexture
})
const rocaMesh = new THREE.Mesh(sphereGeometry, rocaMaterial);
earthOrbit.add(rocaMesh);

rocaMesh.castShadow = true;
rocaMesh.scale.set(5, 5, 5);
rocaMesh.position.x = 19;
rocaMesh.position.z = 30;

//Feim el planeta fill de solarsystem
solarSystem.add(rocaMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(rocaMesh);


//---------------------PLANETA MARS-----------------------------
const  marsMaterial = new THREE.MeshPhongMaterial({color: 0x9c7430, emissive: 0x112244});
const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);

marsMesh.scale.set(2, 2, 2);
marsMesh.position.x = 18;
//Feim el planeta fill de solarsystem
solarSystem.add(marsMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(marsMesh);

//---------------------PLANETA JUPITER-----------------------------
const jupiterMaterial = new THREE.MeshPhongMaterial({color: 0xdbbe8c, emissive: 0x112244});
const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
jupiterOrbit.add(jupiterMesh);

jupiterMesh.scale.set(4, 4, 4);
jupiterMesh.position.x = 30;
jupiterMesh.position.z = -15;
//Feim el planeta fill de solarsystem
solarSystem.add(jupiterMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(jupiterMesh);

//---------------------PLANETA SATURN-----------------------------
const  saturnMaterial = new THREE.MeshPhongMaterial({color: 0xfad711, emissive: 0x112244});
const saturnMesh = new THREE.Mesh(sphereGeometry, saturnMaterial);


saturnMesh.scale.set(3.5, 3.5, 3.5);
saturnMesh.position.x = 55;
saturnMesh.position.z = 15;
//Feim el planeta fill de solarsystem
solarSystem.add(saturnMesh);
//ficam es planeta dins s'array objectes que hem creat
objects.push(saturnMesh);


//---------------------LLUNA-----------------------------
const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);


const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.5, 0.5, 0.5);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

//---------------------LLUNA JUPITER-----------------------------
const moonJupiterOrbit = new THREE.Object3D();
moonJupiterOrbit.position.x = 10;
jupiterOrbit.add(moonJupiterOrbit)

const moonJupiterMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moonJupiterMesh = new THREE.Mesh(sphereGeometry, moonJupiterMaterial);
moonJupiterMesh.scale.set(1, 1, 1);
moonJupiterOrbit.add(moonJupiterMesh);
objects.push(moonJupiterMesh);

//---------------------LLUNA JUPITER 2-----------------------------
const moon2JupiterOrbit = new THREE.Object3D();
moon2JupiterOrbit.position.x = 6;
moon2JupiterOrbit.position.z = 2;
jupiterOrbit.add(moon2JupiterOrbit)

const moon2JupiterMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
const moon2JupiterMesh = new THREE.Mesh(sphereGeometry, moon2JupiterMaterial);
moon2JupiterMesh.scale.set(1.5, 1.5, 1.5);
moon2JupiterOrbit.add(moon2JupiterMesh);
objects.push(moon2JupiterMesh);




// Afegim unes ajudes als objectes de l'array per veure la orientació
objects.forEach((node) => {
  const axes = new THREE.AxesHelper();
  //depthtest en fals fa que els eixos mos surtin encara que estiguin dedins
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  node.add(axes);
});

  
  //plane
  const planeGeo = new THREE.PlaneGeometry(120, 120)
  const planeMat = new THREE.MeshStandardMaterial({
    color: 0xffffff
  })
  const plane = new THREE.Mesh(planeGeo, planeMat)
  plane.receiveShadow= true
  plane.position.y = -6
  plane.rotation.x = Math.PI * -0.5
  scene.add(plane)


let pumpking = null;
ImportPumpking();

//cridam sa funcio gir q mos rota i renderiza
gir();



//Per a cada objecte de s'array mouli sa Y cada x temps
function gir (time) {
  time *= 0.001;
  objects.forEach((obj) => {
  obj.rotation.y = time;
  }); 
 
  
  renderer.render(scene,camera)
  requestAnimationFrame(gir)
}



function ImportPumpking(){
  //Instanciem el loader de models GLTF
  const loader = new GLTFLoader();

  //Carregam el fitxer
  loader.load(
      //Ruta al model
      'Models/pumpkin/scene.gltf',
      //FUNCIONS DE CALLBACK
      function (gltf) {
          //Si es carrega correctament l'afegim a l'escena
          pumpking = gltf.scene;
          pumpking.scale.set(2.5, 2.5, 2.5);
          pumpking.position.x = 40;
          pumpking.rotation.x = 0;
          
          const light2 = new THREE.PointLight( 0xff0000, 150 );
          light2.position.x = 40;
          solarSystem.add(light2);
          
          solarSystem.add(pumpking);
          objects.push(pumpking);
          

      },
      function (xhr) {
          //Aquesta funció de callback es crida mentre es carrega el model
          //i podem mostrar el progrés de càrrega
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
          //callback per quan hi ha un error. El podem mostrar per consola.
          console.error(error);
      }
  );

}


