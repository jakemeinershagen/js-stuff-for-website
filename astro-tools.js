const in_to_mm = 25.4

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

function get_aperture_mm(){
    aperture = get_float_value("aperture");
    if (aperture_units === "in"){
        aperture = Math.floor(aperture * in_to_mm);
    }

    output_to_element("aperture-output", aperture);
}

function get_max_effective_mag(){
    /*
    source: https://www.telescope.com/Telescope-Power-Magnification/p/99813.uts
    would like to find better source but this is good enough for now
    */
    max_effective_mag = aperture * 2;

    output_to_element("max-effective-mag-output", max_effective_mag);
}

function main() {
    aperture_units = get_value("aperture-units");
    get_aperture_mm();

    focal_length_units = get_value("focal-length-units");
    focal_length = get_float_value("focal-length");

    get_max_effective_mag();
}