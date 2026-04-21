const filters ={
    brightness:{
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
    let file = null;
    let image= null;
    

    // create sliders
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
        

        canvasCtx.filter= `brightness(${filters.brightness.value}${filters.brightness.unit})
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
    window.applyFilters = applyFilters;

});



