import * as THREE from "./libs/three.module.js";
import { OrbitControls } from "./libs/OrbitControls.js";
import { GLTFLoader } from "./libs/GLTFLoader.js";
import { FBXLoader } from "./libs/FBXLoader.js";
import { OBJLoader } from "./libs/OBJLoader.js";


let controls, camera, scene, renderer;
let textureCube;
let object = "";
let mixer ;
let clock = new THREE.Clock();
let spotLight;

init();

function init() {
  //target canvas
  const Canvas = document.getElementById("modelCanvas");
  camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  //set camera position
  camera.position.set(0, 0, 100);
  //create scene
  scene = new THREE.Scene();
  //set scene background
  scene.background = new THREE.Color("rgb(13, 202, 240)");
  //create light
  const hemisLight = new THREE.HemisphereLight(0xffffff, 0x000000, 4);
  spotLight = new THREE.SpotLight(0xffa95c,4);
  spotLight.castShadow = true;
  spotLight.shadow.bias = -0.0001;
  spotLight.shadow.mapSize.width = 1024*4;
  spotLight.shadow.mapSize.height = 1024*4;
  //directional light 
  //const dlight = new THREE.DirectionalLight()
  //adding light to the scene
  scene.add(spotLight)
  scene.add(hemisLight);
  //scene.add(new THREE.AxesHelper(500))
  //cube texture loader
   //setTextureBackground("id_1");
   scene.background = new THREE.Color("rgb(100, 255, 200)")
  //load model
  loadFile("model/uploads_files_2792345_Koenigsegg.fbx", "fbx");
  //create rendereer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: Canvas,
    preserveDrawingBuffer: true,
  });
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 0.5;
  renderer.shadowMap.enable = true;
  //set renderer pixel ratio
  renderer.setPixelRatio(window.devicePixelRatio);
  //set renderer size
  renderer.setSize(Canvas.offsetWidth, Canvas.offsetHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  //create control
  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(1, 1, 1);
  //controls.minDistance = 10;

  //controls.maxDistance = 500;

  controls.update();

  //add window resize event
  window.addEventListener("resize", onWindowResize);
  //animate
  renderer.setAnimationLoop(animate);
}
//window resize event function
function onWindowResize() {
  const can = renderer.domElement;
  const width = can.clientWidth;
  const height = can.clientHeight;
  //camera aspect
  camera.aspect = width/ height;
  camera.updateProjectionMatrix(); //update camera projection matrix
  controls.update();
  //set renderer size
  renderer.setSize(width, height, false);
}
//animate the scene
function animate() {
  let isAutoRotatinActive = document.getElementById(
    "autoRotationControl"
  ).checked;
  if (isAutoRotatinActive) {
    let scale = document.getElementById("autoRotationSpeed").value / 100;
    //console.log(scale);
    if (scale < 0) {
      if (object) object.rotation.y += scale;
    } else if (scale > 0) {
      if (object) object.rotation.y += scale;
    }
  }
  //rotation control
  const upperRotationAngle =
    Math.PI / 2 - -document.getElementById("rotation_top_limit").value;
  const lowerRotationAngle =
    Math.PI / 2 - document.getElementById("rotation_bottom_limit").value;
  controls.maxPolarAngle = upperRotationAngle;
  controls.minPolarAngle = lowerRotationAngle;

  //zoom control
  const isZoomChecked = document.getElementById("ZoomControl");
  if (isZoomChecked.checked == true) {
    controls.minDistance = 70 - document.getElementById("zoom_in_limit").value;
    controls.minDistance += 45;
    controls.maxDistance = document.getElementById("zoom_out_limit").value;
    //console.log(controls.target.distanceTo( controls.object.position ))
  } else {
    controls.maxDistance = controls.minDistance = 70;
  }
  camera.lookAt(0, 0, 0);
  controls.update();
  if(mixer) mixer.update(clock.getDelta());
  spotLight.position.set(
    camera.position.x + 10,
    camera.position.y + 10,
    camera.position.z + 10
  )
  renderer.render(scene, camera);
}

//set texture background method
function setTextureBackground(texture) {
  // texture loader
  const loader = new THREE.CubeTextureLoader();
  //loader.setPath(texturePath); //set resources relative path
  //load pictures for texture background
  if(texture == "id_1"){
    textureCube = loader.load([
      textureBg.bg_1.posx,
      textureBg.bg_1.negx,
      textureBg.bg_1.posy,
      textureBg.bg_1.negy,
      textureBg.bg_1.posz,
      textureBg.bg_1.negz
    ]);

  }else if(texture == "id_2"){
    textureCube = loader.load([
      textureBg.bg_2.posx,
      textureBg.bg_2.negx,
      textureBg.bg_2.posy,
      textureBg.bg_2.negy,
      textureBg.bg_2.posz,
      textureBg.bg_2.negz
    ]);

  }else if(texture == "id_3"){
    textureCube = loader.load([
      textureBg.bg_3.posx,
      textureBg.bg_3.negx,
      textureBg.bg_3.posy,
      textureBg.bg_3.negy,
      textureBg.bg_3.posz,
      textureBg.bg_3.negz
    ]);

  }
  
  textureCube.encoding = THREE.sRGBEncoding;
  scene.background = textureCube; //set scene background
}
//set backgound color
function setColorBackground(colorValue) {
  scene.background = new THREE.Color(colorValue);
}
//load model
function loadFile(file, fileExtension) {
  scene.remove(object);
  if (fileExtension === "gltf" || fileExtension === "glb") {
    const loader = new GLTFLoader();
    loader.load(
      file,
      // called when the resource is loaded
      function (gltf) {
        object = gltf.scene;
        var bbox = new THREE.Box3().setFromObject(object);
        var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());
        //console.log(isNaN(size.x));
        if(isNaN(size.x) || isNaN(size.y) || isNaN(size.z)){
          object.scale.setScalar(0.1);
        }else {
        //Rescale the object to normalized space
        var maxAxis = Math.max(size.x, size.y, size.z);
        object.scale.multiplyScalar(60 / maxAxis);
        console.log(size)
        bbox.setFromObject(object);
        bbox.getCenter(cent);
        bbox.getSize(size);
        //Reposition to 0,halfY,0
        object.position.copy(cent).multiplyScalar(-1);
        object.position.y-= (size.y * 0.5);

        }
        object.traverse (c => {
          if(object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            if(object.material.map) {
              object.material.map.anisotrophy = 20;
            }
          }
        });

        if(gltf.animations.length != 0){
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.play();
        } 
        object.position.set(0, 0, 0);
        scene.add(object);
      },
      // called while loading is progressing
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // called when loading has errors
      function (error) {
        console.log("An error happened");
      }
    );
  } else if (fileExtension === "fbx") {

    const fbxLoader = new FBXLoader();
    fbxLoader.load(
      file,
      (fbx) => {
        object = fbx;
        var bbox = new THREE.Box3().setFromObject(object);
        var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());
        //console.log(isNaN(size.x));
        if(isNaN(size.x) || isNaN(size.y) || isNaN(size.z)){
          object.scale.setScalar(0.1);
        }else {
        //Rescale the object to normalized space
        var maxAxis = Math.max(size.x, size.y, size.z);
        //console.log(maxAxis[0] );
        object.scale.multiplyScalar(60 / maxAxis);
        console.log(size)
        bbox.setFromObject(object);
        bbox.getCenter(cent);
        bbox.getSize(size);
        //Reposition to 0,halfY,0
        object.position.copy(cent).multiplyScalar(-1);
        object.position.y-= (size.y * 0.5);

        }


        // const normalSize = bbox.getSize(new THREE.Vector3()); //normal value
        // console.log(normalSize);
        //object.scale.setScalar(0.1);
        object.traverse (c => {
          c.castShadow = true;
        });
        if(object.animations[0] != null){
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        } 
        object.position.set(0, 0, 0)
        scene.add(object);

      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
  } else if (fileExtension === "obj") {
    const objLoader = new OBJLoader();
    objLoader.load(
      file,
      (obj) => {
        object = obj;
        var bbox = new THREE.Box3().setFromObject(object);
       // console.log(bbox)
        var cent = bbox.getCenter(new THREE.Vector3());
        console.log("center is"+cent)
        console.log(cent)
        var size = bbox.getSize(new THREE.Vector3());
        console.log(size)
        if(isNaN(size.x) || isNaN(size.y) || isNaN(size.z)){
          object.scale.setScalar(0.1);
        }else {
        //Rescale the object to normalized space
        var maxAxis = Math.max(size.x, size.y, size.z);
        console.log("maxaxis"+maxAxis)
        //console.log(maxAxis[0] );
        object.scale.multiplyScalar(60 / maxAxis);
        console.log(size)
        bbox.setFromObject(object);
        bbox.getCenter(cent);
        bbox.getSize(size);
        //Reposition to 0,halfY,0
        object.position.copy(cent).multiplyScalar(-1);
        object.position.y-= (size.y * 0.5);

        }
        object.traverse (c => {
          c.castShadow = true;
        });
        if(object.animations[0] != null){
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        } 
        object.position.set(0, 0,0)
        scene.add(object);

      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error) => {
        console.log(error);
      }
    );
}
}
//set render size
function setSize(rendererWidth, rendererHeight) {
  renderer.setSize(rendererWidth, rendererHeight);
}



//START ACTION SCRIPT HERE
//LOAD MODEL FROM URL
document.getElementById("urlFileUpload").addEventListener("click", function () {
  const url = document.getElementById("urlformFile").value;
  const fileName = url.split(".");
  const fileExtension = fileName[fileName.length - 1];
  if(fileExtension === "gltf" || fileExtension === "glb") {
    loadFile(url, fileExtension);
  } else if( fileExtension === "fbx") {
    loadFile(url, fileExtension);
  } else if (fileExtension === "obj") {
    loadFile(url, fileExtension);
  }
})

// ACCORDION ACTION 
let accordionClassDiv = document.getElementsByClassName("accordion");
let panelClassDiv = document.getElementsByClassName('panel');
for (let i = 0; i < accordionClassDiv.length; i++) {
  accordionClassDiv[i].onclick = function() {
      this. childNodes[1].className = "fa fa-angle-down";
      var setClasses = !this.classList.contains('active');
      setClass(accordionClassDiv, 'active', 'remove');
      setClass(panelClassDiv, 'show', 'remove');

      if (setClasses) {
          this.childNodes[1].className = "fa fa-angle-down";
          this.classList.toggle("active");
          this.nextElementSibling.classList.toggle("show");

      }
  }
}

function setClass(els, className, fnName) {
  for (let i = 0; i < els.length; i++) {
      els[i].classList[fnName](className);
      if(els[i].childNodes[1].className === "fa fa-angle-down"){
          els[i].childNodes[1].className = "fa fa-angle-right"
      }
  }
}

// MAXIMISE AND MINIMIZE RENDERING CANVAS 

document.getElementById("button").addEventListener("click", function () {
this.classList.toggle("active");
let canvasWidth, canvasHeight;
let canvas = document.getElementById("homeComponent");
if (canvas.className === "homeComponent") {
  canvas.className = "homeComponentFullScreen";
  document.getElementById("canvasComponent").className =
    " canvasComponent col-md-12";
  document.getElementById("conficComponent").className =
    "col-md-5 display-none";
  document.getElementById("renderCanvas").className = "canvas-style-change";
  canvasWidth = document.getElementById("homeComponent").clientWidth;
  canvasHeight = document.getElementsByClassName("homeComponentFullScreen").clientHeight;
  setSize(canvasWidth, window.innerHeight);
} else {
  canvas.className = "homeComponent";
  document.getElementById("canvasComponent").className =
    "canvasComponent col-md-7";
  document.getElementById("conficComponent").className = "col-md-5";
  document.getElementById("renderCanvas").className = "canvas-style";

  canvasWidth = document.getElementById("renderCanvas").offsetWidth;
  canvasHeight = document.getElementById("renderCanvas").offsetHeight;
  setSize(canvasWidth, canvasHeight);
}
});

// SCREENSHOT ACTION
document.getElementById("snapButton").addEventListener("click", () => {
var canv = document.getElementById("modelCanvas");
console.log("clicked");
var url = canv.toDataURL('image/jpeg');
var link = document.createElement("a");
link.setAttribute("href", url);
link.setAttribute("target", "_blank");
link.setAttribute("download", "screenshot.jpeg");
link.click();
});

// HANDLE BACKGROUND COLOR BUTTON EVENT

document.getElementById("plainText").addEventListener("click", function () {
document.getElementById("plain_background_colors").className =
  "plain_background_colors";
document.getElementById("texture_background_colors").className =
  "display-none";
});

//  HANDLE TEXTURE BUTTON EVENT

document.getElementById("textureUpload").addEventListener("click", function () {
document.getElementById("texture_background_colors").className =
  "texture_background_colors";
document.getElementById("plain_background_colors").className = "display-none";
});

// TEXTURE BUTTON 1 ACTION

document.getElementById("texture_1").addEventListener("click", function () {
setTextureBackground("id_1");
});

// TEXTURE BUTTON 2 ACTION

document.getElementById("texture_2").addEventListener("click", function () {
setTextureBackground("id_2");
});

// TEXTURE BUTTON 3 ACTION

document.getElementById("texture_3").addEventListener("click", function () {
setTextureBackground("id_3");
});

// PLAIN COLOR BUTTON 1 EVENT

document.getElementById("pb_1").addEventListener("click", function () {
setColorBackground(bg.color_1);
});

// PLAIN COLOR BUTTON 2 EVENT

document.getElementById("pb_2").addEventListener("click", function () {
setColorBackground( bg.color_2);
});

// PLAIN COLOR BUTTON 3 EVENT

document.getElementById("pb_3").addEventListener("click", function () {
setColorBackground(bg.color_3);
});

// PLAIN COLOR BUTTON 4 EVENT

document.getElementById("pb_4").addEventListener("click", function () {
setColorBackground( bg.color_4);
});

// PLAIN COLOR BUTTON 5 EVENT

document.getElementById("pb_5").addEventListener("click", function () {
setColorBackground(bg.color_5);
});

// PLAIN COLOR BUTTON 6 EVENT

document.getElementById("pb_6").addEventListener("click", function () {
setColorBackground(bg.color_6);
});

// FILE UPLOAD FROM COMPUTER EVENT

document
.getElementById("fileUploadButton")
.addEventListener("click", function () {
  document.getElementById("fileUpload").className = "mb-3";
  document.getElementById("urlUpload").className = "display-none";
});

// URL UPLOAD BUTTON EVENT

document
.getElementById("urlUploadButton")
.addEventListener("click", function () {
  document.getElementById("urlUpload").className = "mb-3";
  document.getElementById("fileUpload").className = "display-none";
});

// UPLOAD FILE FORM COMPUTER

document.getElementById("uploadFile").addEventListener("click", function () {
var x = document.getElementById("formFile");
if ("files" in x) {
  if (x.files.length != 0) {
    var fileName = x.files[0].name;
    var splitFileName = fileName.split(".")
    var fileExtension = splitFileName[splitFileName.length - 1];
    console.log(fileExtension);
    var objectURL = URL.createObjectURL(x.files[0]);
    if(fileExtension === "gltf" || fileExtension === "glb") {
      loadFile(objectURL, fileExtension);
    } else if( fileExtension === "fbx") {
      loadFile(objectURL, fileExtension);
    } else if (fileExtension === "obj") {
      loadFile(objectURL, fileExtension);
    }
  }
}
});
