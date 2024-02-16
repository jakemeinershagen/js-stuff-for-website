const in_to_mm = 25.4

let aperture;
let aperture_units;

let focal_length;
let focal_length_units;

let max_effective_mag = null;

let eyepieces = [];

function output_to_element(elementId, value){
    document.getElementById(elementId).innerHTML = value;
}

function get_value(elementId){
    return document.getElementById(elementId).value;
}

function get_int_value(elementId){
    return parseInt(get_value(elementId), 10);
}

function get_float_value(elementId){
    return parseFloat(get_value(elementId));
}

function get_aperture_mm(){
    aperture = get_float_value("aperture");
    if (aperture_units === "in"){
        aperture = Math.floor(aperture * in_to_mm);
    }

    output_to_element("aperture-output", aperture);
}

function get_focal_length_mm(){
    focal_length = get_float_value("focal-length");
    if(focal_length_units === "in"){
        focal_length = Math.floor(focal_length * in_to_mm);
    }
}

function get_max_effective_mag(){
    /*
    source: https://www.telescope.com/Telescope-Power-Magnification/p/99813.uts
    would like to find better source but this is good enough for now
    */
    max_effective_mag = aperture * 2;

    output_to_element("max-effective-mag-output", max_effective_mag);
}

function telescope_calculate() {
    aperture_units = get_value("aperture-units");
    get_aperture_mm();

    focal_length_units = get_value("focal-length-units");
    get_focal_length_mm();

    get_max_effective_mag();
}


function Eyepiece(focal_length, apparent_fov, barlow){
    this.focal_length = focal_length;
    this.apparent_fov = apparent_fov;
    this.barlow = barlow;
    this.magnification = 0;
    this.actual_fov = 0.0;
    this.magnification_barlow = 0;
    this.actual_fov_barlow = 0.0;
}

function eyepiece_calculate(){
    for (i in eyepieces){
        let ep = eyepieces[i];
        ep.magnification = Math.floor(focal_length / ep.focal_length);
        ep.actual_fov = (ep.apparent_fov / ep.magnification).toFixed(2);

        ep.magnification_barlow = ep.magnification * ep.barlow;
        ep.actual_fov_barlow = (ep.apparent_fov / ep.magnification_barlow).toFixed(2);
    }
}

function refresh_eyepiece_table(){
    let table = document.getElementById("eyepiece-table");
    let eyepiece_rows = document.getElementsByClassName("eyepiece");
    let num_rows = eyepiece_rows.length;
    for(let i = 0; i < num_rows; i++){
        table.removeChild(eyepiece_rows[0]);
    }
    
    for(let i = 0; i < eyepieces.length; i++){
        let eyepiece = eyepieces[i];

        let new_row = document.createElement("tr");
        new_row.classList.add("eyepiece");
        new_row.id = "eyepiece-" + i;

        let focal_length_data = document.createElement("td");
        focal_length_data.innerText = eyepiece.focal_length;
        new_row.appendChild(focal_length_data);

        let magnification_data = document.createElement("td");
        magnification_data.innerText = eyepiece.magnification;
        if(eyepiece.magnification > max_effective_mag){
            magnification_data.style.color = "red";
            magnification_data.innerText = "*" + magnification_data.innerText + "*"
        }
        new_row.appendChild(magnification_data);

        let actual_fov_data = document.createElement("td");
        actual_fov_data.innerText = eyepiece.actual_fov;
        new_row.appendChild(actual_fov_data);

        let magnification_barlow_data = document.createElement("td");
        magnification_barlow_data.innerText = eyepiece.magnification_barlow;
        if(eyepiece.magnification_barlow > max_effective_mag){
            magnification_barlow_data.style.color = "red";
            magnification_barlow_data.innerText = "*" + magnification_barlow_data.innerText + "*"
        }
        new_row.appendChild(magnification_barlow_data);

        let actual_fov_barlow_data = document.createElement("td");
        actual_fov_barlow_data.innerText = eyepiece.actual_fov_barlow;
        new_row.appendChild(actual_fov_barlow_data);

        let apparent_fov_data = document.createElement("td");
        apparent_fov_data.innerText = eyepiece.apparent_fov;
        new_row.appendChild(apparent_fov_data);

        let barlow_data = document.createElement("td");
        barlow_data.innerText = eyepiece.barlow;
        new_row.appendChild(barlow_data);

        table.appendChild(new_row);
    }

}


function add_eyepiece(){
    let new_eyepiece = new Eyepiece(
        get_int_value("eyepiece-focal-length"),
        get_int_value("apparent-fov"),
        get_int_value("barlow")
    );

    eyepieces.push(new_eyepiece);
}


function telescope_button(){
    telescope_calculate();
    eyepiece_calculate();
    refresh_eyepiece_table();
}


function eyepiece_button(){
    telescope_calculate();
    add_eyepiece();
    eyepiece_calculate();
    refresh_eyepiece_table();
}