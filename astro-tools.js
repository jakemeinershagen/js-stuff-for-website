let aperture;
let aperture_units;

let focal_length;
let focal_length_units;

let max_effective_mag = null;

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

function get_max_effective_mag(){
    /*
    source: https://www.telescope.com/Telescope-Power-Magnification/p/99813.uts
    would like to find better source but this is good enough for now
    */
    if (aperture_units === "mm"){
        max_effective_mag = aperture * 2;
    } 
    else if (aperture_units == "in"){
        max_effective_mag = aperture * 50;
    }

    output_to_element("max-effective-mag-output", max_effective_mag);
}

function main() {
    aperture_units = get_value("aperture-units");
    aperture = get_float_value("aperture");

    focal_length_units = get_value("focal-length-units");
    focal_length = get_float_value("focal-length");

    get_max_effective_mag();
}