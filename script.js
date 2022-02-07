import {
    scene,
    THREE,
    setZoomMax,
    setZoomMin,
    setMaxAngleForOrbit,
    setMinAngleForOrbit,
    setAdd,
    
} from "./three.js";

//rotation section
var checkBox = document.getElementById("autoRotationBtn");

checkBox.addEventListener("click", () => {
    if (checkBox.checked === true) {
        //add = 0.005;
        setAdd(document.getElementById("myRange").value);
        // console.log(document.getElementById("myRange").value/300 );
    } else {
        setAdd(0);
    }
});

var RotationSpeed = document.getElementById("myRange");
RotationSpeed.oninput = function () {
    checkBox.checked = true;
    setAdd(this.value);
};

var RotationTopLimite = document.getElementById("myRangeTopLimite");
RotationTopLimite.oninput = function () {
    setMaxAngleForOrbit(this.value);
};

var RotationBottomLimite = document.getElementById("myRangeBottomLimite");
RotationBottomLimite.oninput = function () {
    setMinAngleForOrbit(this.value);
};

//rotation section end

//zomm section start
let inX = 10, outX=70;

var ZoomLimiteIn = document.getElementById("ZoomLimiteIn");
ZoomLimiteIn.oninput = function () {
    checkBoxZoom.checked = true;
    setZoomMin(this.value);
    inX = this.value;
};

var ZoomLimiteOut = document.getElementById("ZoomLimiteOut");
ZoomLimiteOut.oninput = function () {
    checkBoxZoom.checked = true;
    setZoomMax(this.value);
    outX = this.value;
};


var checkBoxZoom = document.getElementById("ZoomBtn");

checkBoxZoom.addEventListener("click", () => {
    if (checkBoxZoom.checked !== true) {
        setZoomMin(25);
        setZoomMax(25);
    } else {
        setZoomMin(inX);
        setZoomMax(outX);
    }
});



//zoom section end

///scene background color change part start
let bgLeftBtn = document.querySelector(".bgLeftBtn");
let bgRightBtn = document.querySelector(".bgRightBtn");

bgLeftBtn.addEventListener("click", () => {
    document.getElementById("plainBackground").classList.remove("hide");
    document.getElementById("TextureBackground").classList.add("hide");
}); //
bgRightBtn.addEventListener("click", () => {
    document.getElementById("plainBackground").classList.add("hide");
    document.getElementById("TextureBackground").classList.remove("hide");
}); //

let skybox = null;


document.getElementsByName("bg").forEach((radio) => {
    radio.addEventListener("click", () => {
        if (radio.value === "skyblue") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("skyblue");
        } else if (radio.value === "red") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("#D14250");
        } else if (radio.value === "gray") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("#8B9298");
        } else if (radio.value === "blue") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("#3888FD");
        } else if (radio.value === "green") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("#198754");
        } else if (radio.value === "yellow") {
            if(skybox !== null) scene.remove(skybox);
            scene.background = new THREE.Color("#FFC107");
        } 
        
        else if (radio.value === "texture1") {
            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_ft.jpg");
            let texture_bk = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_bk.jpg");
            let texture_up = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_up.jpg");
            let texture_dn = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_dn.jpg");
            let texture_rt = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_rt.jpg");
            let texture_lf = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/tropic_lf.jpg");

            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_ft })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_bk })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_up })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_dn })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_rt })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_lf })
            );

            for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

            let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
            skybox = new THREE.Mesh(skyboxGeo, materialArray);
            // scene.background = null;
            scene.add(skybox);

        } else if (radio.value === "texture2") {
            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_ft.jpg");
            let texture_bk = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_bk.jpg");
            let texture_up = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_up.jpg");
            let texture_dn = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_dn.jpg");
            let texture_rt = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_rt.jpg");
            let texture_lf = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/arid2_lf.jpg");

            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_ft })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_bk })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_up })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_dn })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_rt })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_lf })
            );

            for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

            let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
            skybox = new THREE.Mesh(skyboxGeo, materialArray);
            // scene.background = null;
            scene.add(skybox);

        } else if (radio.value === "texture3") {
            let materialArray = [];
            let texture_ft = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_ft.jpg");
            let texture_bk = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_bk.jpg");
            let texture_up = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_up.jpg");
            let texture_dn = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_dn.jpg");
            let texture_rt = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_rt.jpg");
            let texture_lf = new THREE.TextureLoader().load("https://raw.githubusercontent.com/Siam456/FT_Filees/main/backgroundTexture/zeus_lf.jpg");

            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_ft })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_bk })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_up })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_dn })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_rt })
            );
            materialArray.push(
                new THREE.MeshBasicMaterial({ map: texture_lf })
            );

            for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;

            let skyboxGeo = new THREE.BoxGeometry(100, 100, 100);
            skybox = new THREE.Mesh(skyboxGeo, materialArray);
            // scene.background = null;
            scene.add(skybox);
        }
    });
});

//change background color event end

//uploader section

///scene background color change part start
let upLeftBtn = document.querySelector(".upLeftBtn");
let upRightBtn = document.querySelector(".upRightBtn");

upLeftBtn.addEventListener("click", () => {
    document.getElementById("uploadFile").classList.remove("hide");
    document.getElementById("urlFile").classList.add("hide");
}); //
upRightBtn.addEventListener("click", () => {
    document.getElementById("uploadFile").classList.add("hide");
    document.getElementById("urlFile").classList.remove("hide");
}); //

//for collapsable design

var colBtn1 = document.getElementById('col1');
var colBtn2 = document.getElementById('col2');
var colBtn3 = document.getElementById('col3');
var colBtn4 = document.getElementById('col4');
//rotation

let icon1 = document.getElementById('icon1');
let icon2 = document.getElementById('icon2');
let icon3 = document.getElementById('icon3');
let icon4 = document.getElementById('icon4');


colBtn1.addEventListener("click", function () {
    
    
    var content1 = this.nextElementSibling;
    var content2 = colBtn2.nextElementSibling;
    var content3 = colBtn3.nextElementSibling;
    var content4 = colBtn4.nextElementSibling;
    if (content1.style.maxHeight) {
        content1.style.maxHeight = null;
        icon1.classList.remove('rotation');
        

    } else {
        
        content1.style.maxHeight = content1.scrollHeight + "px";
        content2.style.maxHeight = null;
        content3.style.maxHeight = null;
        content4.style.maxHeight = null;

        icon1.classList.add('rotation');
        icon2.classList.remove('rotation');
        icon3.classList.remove('rotation');
        icon4.classList.remove('rotation');

    }
});


colBtn2.addEventListener("click", function () {
    
    var content1 = this.nextElementSibling;
    var content2 = colBtn1.nextElementSibling;
    var content3 = colBtn3.nextElementSibling;
    var content4 = colBtn4.nextElementSibling;
    if (content1.style.maxHeight) {
        content1.style.maxHeight = null;
        icon2.classList.remove('rotation');
    } else {
        content1.style.maxHeight = content1.scrollHeight + "px";
        content2.style.maxHeight = null;
        content3.style.maxHeight = null;
        content4.style.maxHeight = null;

        icon1.classList.remove('rotation');
        icon2.classList.add('rotation');
        icon3.classList.remove('rotation');
        icon4.classList.remove('rotation');
    }
});


colBtn3.addEventListener("click", function () {
    
    
    var content1 = this.nextElementSibling;
    var content2 = colBtn2.nextElementSibling;
    var content3 = colBtn1.nextElementSibling;
    var content4 = colBtn4.nextElementSibling;
    if (content1.style.maxHeight) {
        content1.style.maxHeight = null;
        icon3.classList.remove('rotation');
    } else {
        content1.style.maxHeight = content1.scrollHeight + "px";
        content2.style.maxHeight = null;
        content3.style.maxHeight = null;
        content4.style.maxHeight = null;

        icon1.classList.remove('rotation');
        icon2.classList.remove('rotation');
        icon3.classList.add('rotation');
        icon4.classList.remove('rotation');
    }
});


colBtn4.addEventListener("click", function () {
    
    
    
    var content1 = this.nextElementSibling;
    var content2 = colBtn2.nextElementSibling;
    var content3 = colBtn3.nextElementSibling;
    var content4 = colBtn1.nextElementSibling;
    if (content1.style.maxHeight) {
        content1.style.maxHeight = null;
        icon4.classList.remove('rotation');
    } else {
        content1.style.maxHeight = content1.scrollHeight + "px";
        content2.style.maxHeight = null;
        content3.style.maxHeight = null;
        content4.style.maxHeight = null;

        icon1.classList.remove('rotation');
        icon2.classList.remove('rotation');
        icon3.classList.remove('rotation');
        icon4.classList.add('rotation');
    }
});

//snapshot and full screen

let fullScreen = document.getElementById("fullscreen");
let snapShot = document.getElementById("snapshot");

let check = true;
fullScreen.addEventListener("click", () => {
    if (check) {
        document.querySelector("#functions").classList.add("hide");
        document.querySelector(".heading").classList.add("hide");

        document.getElementById("wrapperId").classList.remove("wrapper");
        document.querySelector(".canvasWrapper").style.height = "100%";
        // document.querySelector("#myCanvasElement").style.height = "auto";
        document.querySelector(".container").style.width = "100%";

        check = false;
    } else {
        document.querySelector("#functions").classList.remove("hide");
        document.querySelector(".heading").classList.remove("hide");

        document.getElementById("wrapperId").classList.add("wrapper");
        document.querySelector(".canvasWrapper").style.height = "80%";
        // document.querySelector("#myCanvasElement").style.height = "330px";
        document.querySelector(".container").style.width = "80%";

        check = true;
    }
});
snapShot.addEventListener("click", () => {
    var canvas = document.getElementById("myCanvasElement");

    var url = canvas.toDataURL();

    var link = document.createElement("a");

    link.setAttribute("href", url);
    link.setAttribute("target", "_blank");
    link.setAttribute("download", "canvas.png");

    link.click();
});
