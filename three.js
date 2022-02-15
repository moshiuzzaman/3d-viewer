import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/gh/Siam456/FT_Filees@main/files/OrbitControls.js";
import {
  GLTFLoader,
  OBJLoader,
  FBXLoader,
} from "https://cdn.jsdelivr.net/gh/Siam456/FT_Filees@main/files/Loader.js";

let scene, camera, renderer, mixer, controls, textureCube;
let object = "";
let clock = new THREE.Clock();
let isAutRotation = true;
init();
function init() {
  // Canvas
  const Canvas = document.getElementById("modelCanvas");

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 0, 100);

  // Scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color("rgb(13, 202, 240)");

  // Light
  const hemisLight = new THREE.HemisphereLight(0xffffff, 0x000000, 5);
  scene.add(hemisLight);

  let DirectionalLightbt = new THREE.DirectionalLight(0xffffff, 0.7);
  DirectionalLightbt.position.set(3, -8, 1.5);
  scene.add(DirectionalLightbt);


  // Model
  loadFile("model/uploads_files_2792345_Koenigsegg.fbx", "fbx");

  // Renderer
  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: Canvas,
    preserveDrawingBuffer: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(Canvas.offsetWidth, Canvas.offsetHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;

  // OrbitControl
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = isAutRotation;
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
  renderer.setAnimationLoop(animate);
}

// Window resize
function onWindowResize() {
  const can = renderer.domElement;
  const width = can.clientWidth;
  const height = can.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  controls.update();
  renderer.setSize(width, height, false);
}

// Animate
function animate() {
  // Rotation
  const isAutoRotatinActive = document.getElementById(
    "autoRotationControl"
  ).checked;
  if (isAutoRotatinActive) {
    controls.autoRotate = true;
    const scale = document.getElementById("autoRotationSpeed").value / 100;
    if (scale < 0) {
      if (object) {
        object.rotation.y += scale;
        controls.autoRotateSpeed = scale * 10;
        controls.update();
      }
    } else if (scale > 0) {
      if (object) {
        object.rotation.y += scale;
        controls.autoRotateSpeed = scale * 10;
        controls.update();
      }
    }
  } else {
    controls.autoRotate = false;
  }
  const upperRotationAngle =
    Math.PI / 2 - -document.getElementById("rotation_top_limit").value;
  const lowerRotationAngle =
    Math.PI / 2 - document.getElementById("rotation_bottom_limit").value;
  controls.maxPolarAngle = upperRotationAngle;
  controls.minPolarAngle = lowerRotationAngle;

  // Zoom
  const isZoomChecked = document.getElementById("ZoomControl");
  if (isZoomChecked.checked == true) {
    const inLimit = document.getElementById("zoom_in_limit").value;
    const outLimit = document.getElementById("zoom_out_limit").value;

    if(inLimit == 0 && outLimit == 0) {
      controls.maxDistance = 80;
      controls.minDistance = 35;
      controls.update();
    }else {
      controls.minDistance = 35 - inLimit;
      controls.maxDistance = 100 +Number(outLimit);
    }
    
  } else {
    controls.maxDistance = controls.minDistance = 70;
  }

  console.log("max dis"+controls.maxDistance);
  console.log("min dis"+controls.minDistance);

  // Render
  camera.lookAt(0, 0, 0);
  controls.update();
  if (mixer) mixer.update(clock.getDelta());
  renderer.render(scene, camera);
}

// Texture background
function setTextureBackground(texture) {
  const loader = new THREE.CubeTextureLoader();
  if (texture == "id_1") {
    textureCube = loader.load([
      textureBg.bg_1.posx,
      textureBg.bg_1.negx,
      textureBg.bg_1.posy,
      textureBg.bg_1.negy,
      textureBg.bg_1.posz,
      textureBg.bg_1.negz,
    ]);
  } else if (texture == "id_2") {
    textureCube = loader.load([
      textureBg.bg_2.posx,
      textureBg.bg_2.negx,
      textureBg.bg_2.posy,
      textureBg.bg_2.negy,
      textureBg.bg_2.posz,
      textureBg.bg_2.negz,
    ]);
  } else if (texture == "id_3") {
    textureCube = loader.load([
      textureBg.bg_3.posx,
      textureBg.bg_3.negx,
      textureBg.bg_3.posy,
      textureBg.bg_3.negy,
      textureBg.bg_3.posz,
      textureBg.bg_3.negz,
    ]);
  }

  textureCube.encoding = THREE.sRGBEncoding;
  scene.background = textureCube;
}

// Background color
function setColorBackground(colorValue) {
  scene.background = new THREE.Color(colorValue);
}

// Model Loading
function loadFile(file, fileExtension) {
  scene.remove(object);
  if (fileExtension === "gltf" || fileExtension === "glb") {
    const loader = new GLTFLoader();
    loader.load(
      file,
      function (gltf) {
        object = gltf.scene;
        var bbox = new THREE.Box3().setFromObject(object);
        var cent = bbox.getCenter(new THREE.Vector3());
        var size = bbox.getSize(new THREE.Vector3());
        if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z)) {
          object.scale.setScalar(0.05);
        } else {
          var maxAxis = Math.max(size.x, size.y, size.z);
          object.scale.multiplyScalar(60 / maxAxis);
          console.log(size);
          bbox.setFromObject(object);
          bbox.getCenter(cent);
          bbox.getSize(size);
          object.position.copy(cent).multiplyScalar(-1);
          object.position.y -= size.y * 0.5;
        }
        object.traverse((c) => {
          if (object.isMesh) {
            object.castShadow = true;
            object.receiveShadow = true;
            if (object.material.map) {
              object.material.map.anisotrophy = 20;
            }
          }
        });
        if (gltf.animations.length != 0) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(gltf.animations[0]);
          idle.play();
        }
        object.position.set(0, 0, 0);
        scene.add(object);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
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
        if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z)) {
          object.scale.setScalar(0.05);
        } else {
          var maxAxis = Math.max(size.x, size.y, size.z);
          object.scale.multiplyScalar(60 / maxAxis);
          console.log(size);
          bbox.setFromObject(object);
          bbox.getCenter(cent);
          bbox.getSize(size);
          object.position.copy(cent).multiplyScalar(-1);
          object.position.y -= size.y * 0.5;
        }
        object.traverse((c) => {
          c.castShadow = true;
        });
        if (object.animations[0] != null) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        }
        object.position.set(0, 0, 0);
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
        var cent = bbox.getCenter(new THREE.Vector3());
        console.log("center is" + cent);
        console.log(cent);
        var size = bbox.getSize(new THREE.Vector3());
        console.log(size);
        if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z)) {
          object.scale.setScalar(0.1);
        } else {
          var maxAxis = Math.max(size.x, size.y, size.z);
          console.log("maxaxis" + maxAxis);
          object.scale.multiplyScalar(60 / maxAxis);
          console.log(size);
          bbox.setFromObject(object);
          bbox.getCenter(cent);
          bbox.getSize(size);
          object.position.copy(cent).multiplyScalar(-1);
          object.position.y -= size.y * 0.5;
        }
        object.traverse((c) => {
          c.castShadow = true;
        });
        if (object.animations[0] != null) {
          mixer = new THREE.AnimationMixer(object);
          const idle = mixer.clipAction(object.animations[0]);
          idle.play();
        }
        object.position.set(0, 0, 0);
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

// Renderer size
function setSize(rendererWidth, rendererHeight) {
  renderer.setSize(rendererWidth, rendererHeight);
}

/*******************************Action Script*******************************************/

// Model upload
document.getElementById("urlFileUpload").addEventListener("click", function () {
  const url = document.getElementById("urlformFile").value;
  const fileName = url.split(".");
  const fileExtension = fileName[fileName.length - 1];
  if (fileExtension === "gltf" || fileExtension === "glb") {
    loadFile(url, fileExtension);
  } else if (fileExtension === "fbx") {
    loadFile(url, fileExtension);
  } else if (fileExtension === "obj") {
    loadFile(url, fileExtension);
  }
});

// Accordion
let accordionClassDiv = document.getElementsByClassName("accordion");
let panelClassDiv = document.getElementsByClassName("panel");
for (let i = 0; i < accordionClassDiv.length; i++) {
  accordionClassDiv[i].onclick = function () {
    this.childNodes[1].className = "fa fa-angle-down";
    var setClasses = !this.classList.contains("active");
    setClass(accordionClassDiv, "active", "remove");
    setClass(panelClassDiv, "show", "remove");

    if (setClasses) {
      this.childNodes[1].className = "fa fa-angle-down";
      this.classList.toggle("active");
      this.nextElementSibling.classList.toggle("show");
    }
  };
}

function setClass(els, className, fnName) {
  for (let i = 0; i < els.length; i++) {
    els[i].classList[fnName](className);
    if (els[i].childNodes[1].className === "fa fa-angle-down") {
      els[i].childNodes[1].className = "fa fa-angle-right";
    }
  }
}

// Screen maximize and minimize
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
    canvasHeight = document.getElementsByClassName(
      "homeComponentFullScreen"
    ).clientHeight;
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

// Screenshot
document.getElementById("snapButton").addEventListener("click", () => {
  var canv = document.getElementById("modelCanvas");
  console.log("clicked");
  var url = canv.toDataURL("image/jpeg");
  var link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("target", "_blank");
  link.setAttribute("download", "screenshot.jpeg");
  link.click();
});

// Background color
document.getElementById("plainText").addEventListener("click", function () {
  document.getElementById("plain_background_colors").className =
    "plain_background_colors";
  document.getElementById("texture_background_colors").className =
    "display-none";
});

//  Texture background
document.getElementById("textureUpload").addEventListener("click", function () {
  document.getElementById("texture_background_colors").className =
    "texture_background_colors";
  document.getElementById("plain_background_colors").className = "display-none";
});

// Texture background button 1
document.getElementById("texture_1").addEventListener("click", function () {
  setTextureBackground("id_1");
});

// Texture background button 2
document.getElementById("texture_2").addEventListener("click", function () {
  setTextureBackground("id_2");
});

// Texture background button 3
document.getElementById("texture_3").addEventListener("click", function () {
  setTextureBackground("id_3");
});

// Color background button 1
document.getElementById("pb_1").addEventListener("click", function () {
  setColorBackground(bg.color_1);
});

// Color background button 2
document.getElementById("pb_2").addEventListener("click", function () {
  setColorBackground(bg.color_2);
});

// Color background button 3
document.getElementById("pb_3").addEventListener("click", function () {
  setColorBackground(bg.color_3);
});

// Color background button 4
document.getElementById("pb_4").addEventListener("click", function () {
  setColorBackground(bg.color_4);
});

// Color background button 5
document.getElementById("pb_5").addEventListener("click", function () {
  setColorBackground(bg.color_5);
});

// Color background button 6
document.getElementById("pb_6").addEventListener("click", function () {
  setColorBackground(bg.color_6);
});

// Model upload
document
  .getElementById("fileUploadButton")
  .addEventListener("click", function () {
    document.getElementById("fileUpload").className = "mb-3";
    document.getElementById("urlUpload").className = "display-none";
  });

// Model url upload
document
  .getElementById("urlUploadButton")
  .addEventListener("click", function () {
    document.getElementById("urlUpload").className = "mb-3";
    document.getElementById("fileUpload").className = "display-none";
  });

// File upload from computer
document.getElementById("uploadFile").addEventListener("click", function () {
  var x = document.getElementById("formFile");
  if ("files" in x) {
    if (x.files.length != 0) {
      var fileName = x.files[0].name;
      var splitFileName = fileName.split(".");
      var fileExtension = splitFileName[splitFileName.length - 1];
      console.log(fileExtension);
      var objectURL = URL.createObjectURL(x.files[0]);
      if (fileExtension === "gltf" || fileExtension === "glb") {
        loadFile(objectURL, fileExtension);
      } else if (fileExtension === "fbx") {
        loadFile(objectURL, fileExtension);
      } else if (fileExtension === "obj") {
        loadFile(objectURL, fileExtension);
      }
    }
  }
});

