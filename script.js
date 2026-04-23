let filters ={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
        value:100,
        min:0,
        max:200,
         unit:"%"

    },
    Saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    HueRotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    Grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },

    Invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },        

}




// const filtersContainer = document.querySelector(".filters");

function createFilterElement(name, unit="%",value,min,max){
    const div = document.createElement("div");
    div.classList.add("filter");

    const input= document.createElement("input");
    input.type="range";
    input.min=min;
    input.max= max;
    input.value=value;
    input.id= name;

    const p= document.createElement("p");
    p.innerText= `${name}`;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input" ,(event)=>{
        filters[name].value= input.value;
        applyFilters();

    })

    return div;


}


document.addEventListener("DOMContentLoaded", () => {

    const imageCanvas = document.querySelector("#image-canvas");
    const imgInput = document.querySelector("#image-input");
    const filtersContainer = document.querySelector(".filters");
    const canvasCtx = imageCanvas.getContext("2d");

    const resetButton = document.querySelector("#reset-btn");

    const downloadButton = document.querySelector("#download-btn");

    const presetsContainer = document.querySelector(".presets");

    let file = null;
    let image= null;
    

    // create sliders
    function createFilters(){
    
    Object.keys(filters).forEach(key => {
        const f = filters[key];
        const filterElement = createFilterElement(
            key,
            filters[key].unit,
            filters[key].value,
            filters[key].min,
            filters[key].max
        );
        filtersContainer.appendChild(filterElement);
    });
    }
    createFilters();

    
    imgInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const imagePlaceholder = document.querySelector(".placeholder");
        imageCanvas.style.display= "block";
        imagePlaceholder.style.display="none";


        const img = new Image();
        img.src = URL.createObjectURL(file);

        img.onload = () => {
            image= img;
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;

            canvasCtx.drawImage(img, 0, 0);
        };
    });

    function applyFilters() {
        if (!image) return;

        canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height); // it remove the older picture
        // canvasCtx.filter = "blur(2px)";
        // canvasCtx.filter = "brightness(170%)";
        

        canvasCtx.filter= `Brightness(${filters.Brightness.value}${filters.Brightness.unit})
        Contrast(${filters.Contrast.value}${filters.Contrast.unit})
        Saturate(${filters.Saturate.value}${filters.Saturate.unit})
        Hue-Rotate(${filters.HueRotate.value}${filters.HueRotate.unit})
        Blur(${filters.Blur.value}${filters.Blur.unit})
        Grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
        Sepia(${filters.Sepia.value}${filters.Sepia.unit})
        Opacity(${filters.Opacity.value}${filters.Opacity.unit})
        Invert(${filters.Invert.value}${filters.Invert.unit})`
        .trim();
        
        canvasCtx.drawImage(image, 0, 0);
        
    }
   

    resetButton.addEventListener("click",()=>{
    filters ={
    Brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    Contrast:{
        value:100,
        min:0,
        max:200,
         unit:"%"

    },
    Saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    HueRotate:{
        value:0,
        min:0,
        max:360,
        unit:"deg"
    },
    Blur:{
        value:0,
        min:0,
        max:20,
        unit:"px"
    },
    Grayscale:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Sepia:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },
    Opacity:{
        value:100,
        min:0,
        max:100,
        unit:"%"
    },

    Invert:{
        value:0,
        min:0,
        max:100,
        unit:"%"
    },        

    }
        applyFilters();
        filtersContainer.innerHTML="";
        createFilters();
    })

    downloadButton.addEventListener("click", ()=>{
        const link= document.createElement("a");
        link.download ="edited-image.png";
        link.href=imageCanvas.toDataURL();
        link.click();
    })

    const presets = {
    normal: {
        Brightness: 100,
        Contrast: 100,
        Saturate: 100,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    vintage: {
        Brightness: 90,
        Contrast: 120,
        Saturate: 80,
        HueRotate: 10,
        Blur: 0,
        Grayscale: 20,
        Sepia: 40,
        Opacity: 100,
        Invert: 0
    },

    oldschool: {
        Brightness: 95,
        Contrast: 110,
        Saturate: 70,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 40,
        Sepia: 60,
        Opacity: 100,
        Invert: 0
    },

    cool: {
        Brightness: 100,
        Contrast: 110,
        Saturate: 120,
        HueRotate: 180,
        Grayscale: 0,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    },

    warm: {
        Brightness: 105,
        Contrast: 105,
        Saturate: 120,
        HueRotate: 20,
        Blur: 0,
        Grayscale: 0,
        Sepia: 30,
        Opacity: 100,
        Invert: 0
    },

    dramatic: {
        Brightness: 90,
        Contrast: 140,
        Saturate: 130,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 10,
        Sepia: 10,
        Opacity: 100,
        Invert: 0
    },

    faded: {
        Brightness: 110,
        Contrast: 80,
        Saturate: 70,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 20,
        Sepia: 20,
        Opacity: 100,
        Invert: 0
    },

    noir: {
        Brightness: 90,
        Contrast: 120,
        Saturate: 0,
        HueRotate: 0,
        Blur: 0,
        Grayscale: 100,
        Sepia: 0,
        Opacity: 100,
        Invert: 0
    }
    };

    Object.keys(presets).forEach(presetName =>{
        const presetButton = document.createElement("button");
        presetButton.classList.add("btn");
        presetButton.innerText = presetName;
        presetsContainer.appendChild(presetButton);

        presetButton.addEventListener("click",()=>{
            const preset= presets[presetName];
        Object.keys(preset).forEach(filterName =>{
                filters[filterName].value= preset[filterName];
            })
            applyFilters();
            
            
            
        })
        
        
        
    })
    
    window.applyFilters = applyFilters;

});



