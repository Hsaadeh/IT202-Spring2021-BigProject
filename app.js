// top app bar instantiated
let topAppBarElement = document.querySelector('.mdc-top-app-bar');

// map functionality //
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 8,
    });
}

// buttons initialized //
let homeButton = document.querySelector("#homeButton");
let filterButton = document.querySelector("#filterButton");
let listButton = document.querySelector("#listButton");
let mapButton = document.querySelector("#mapButton");

// screen variables initialized //
let homeScreen = document.querySelector("#homeScreen");
let filterScreen = document.querySelector("#filterScreen");
let listScreen = document.querySelector("#listScreen");
let mapScreen = document.querySelector("#mapScreen");


// button event listeners to display target screen //
homeButton.addEventListener("click", (event) => {
    homeScreen.style.display = "block";
    filterScreen.style.display = "none";
    listScreen.style.display = "none";
    mapScreen.style.display = "none";
})

filterButton.addEventListener("click", (event) => {
    homeScreen.style.display = "none";
    filterScreen.style.display = "block";
    listScreen.style.display = "none";
    mapScreen.style.display = "none";
})

listButton.addEventListener("click", (event) => {
    homeScreen.style.display = "none";
    filterScreen.style.display = "none";
    listScreen.style.display = "block";
    mapScreen.style.display = "none";
})

mapButton.addEventListener("click", (event) => {
    homeScreen.style.display = "none";
    filterScreen.style.display = "none";
    listScreen.style.display = "none";
    mapScreen.style.display = "block";
})

// OpenWeather Api //
//let weatherEndpoint = "api.openweathermap.org"; // this needs the correct endpoint with the api key
//let weatherData_url = weatherEndpoint;

// City of Chicago Parks Api //
let parkEndpoint = "https://data.cityofchicago.org/resource/eix4-gf83.json";
let parkData_url = parkEndpoint;
let parks = [];
parks.sort();
// let data = fetch(parkData_url);
// console.log(data.json());

// fetch(parkData_url)
//         .then((response) => {
//             let data = response.json();
//             // let park = data[0];
//             console.log(data);

//             // console.log( data.json() );
//         })

fetch(parkData_url)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        // work with data

        data.forEach((entry) => {
            if (!parks.includes(entry["park"])) {
                parks.push(entry["park"]);
            }
        });
        let dropdown_park_options_array = [];
        dropdown_park_options_array.push("<option value='' id='park' selected></option>")
        parks.forEach((element) => {
            dropdown_park_options_array.push("<option value='' id='park'>" + element + "</option>");
        });
        document.getElementById("dropdown_park_options").innerHTML = dropdown_park_options_array.join();
    });


console.log(parks);

let menu = document.querySelector(".mdc-menu mdc-menu-surface");

// Geolocation data - get the users current location //

// IndexDB requirement//