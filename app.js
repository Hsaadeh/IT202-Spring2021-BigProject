// top app bar instantiated
let topAppBarElement = document.querySelector('.mdc-top-app-bar');


let initParkCoords = (parkEndpoint) => {
    let parks = [];
    let parksXY = [];
    fetch(parkEndpoint)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            data.forEach((entry) => {
                if (!parks.includes(entry["park"])) {
                    parks.push(entry["park"]);
                    parksXY.push(entry["the_geom"]["coordinates"]);
                }
            })
            return parksXY;
        })
}

// map functionality //
let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 8,
    });
    // newMarker({ lat: 41.8781, lng: -87.6298 }); // test marker
    //newMarker({ lat: 41.2781, lng: -87.6298 }); // test marker

    //console.log(parksXY1[0][0]);
    // TODO: init parkxy here
    // let parks = [];
    // let parksXY = [];
    // fetch(parkEndpoint)
    //     .then((response) => {
    //         return response.json();
    //     })
    //     .then((data) => {
    //         // console.log(data);
    //         data.forEach((entry) => {
    //             if (!parks.includes(entry["park"])) {
    //                 parks.push(entry["park"]);
    //                 parksXY.push(entry["the_geom"]["coordinates"]);
    //                 coords = entry["the_geom"]["coordinates"];
    //                 lat = coords[1];
    //                 lng = coords[0];
    //                 console.log(lat);
    //                 newMarker({lat: lat, lng: lng});
    //             }
    //         })
    //     })

    // parksXY.forEach((coordinate) =>{
    //     let lat = coordinate[1];
    //     let lng = coordinate[0];
    //     console.log(lat);
    //     console.log(lng);
    //     newMarker({lat: lat, lng: lng});
    // })
}

// newMarker function for Map
let newMarker = (coordinates) => {
    let mapMarker = new google.maps.Marker({
        position: coordinates,
        map: map,
        // passive: true
        // title: title,
    })
}

// buttons initialized //
let homeButton = document.querySelector("#homeButton");
let filterButton = document.querySelector("#filterButton");
let listButton = document.querySelector("#listButton");
let mapButton = document.querySelector("#mapButton");
let MyLocationButton = document.querySelector("#MyLocationButton");
let plotAllButton = document.querySelector("#plotAllButton");
let filterParkButton = document.querySelector("#filterParkButton");

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

filterParkButton.addEventListener("click", (event) => {
    let parkEndpoint = "https://data.cityofchicago.org/resource/eix4-gf83.json";
    let parkData_url = parkEndpoint;
    let select = document.querySelector("#dropdown_park_options")
    let park = select.options[select.selectedIndex].text;
    //console.log(community);
    new_url = parkData_url + "?park=" + park;
    fetch(new_url)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            // work with data
            data.forEach((entry) => {
                let lat = entry["the_geom"]["coordinates"][1];
                let lng = entry["the_geom"]["coordinates"][0];
                newMarker({ lat: lat, lng: lng });
                // createCard(entry);
            });
        });
})

plotAllButton.addEventListener("click", (event) => {
    let parks = [];
    let parksXY = [];
    fetch(parkEndpoint)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            // console.log(data);
            data.forEach((entry) => {
                if (!parks.includes(entry["park"])) {
                    parks.push(entry["park"]);
                    parksXY.push(entry["the_geom"]["coordinates"]);
                    coords = entry["the_geom"]["coordinates"];
                    lat = coords[1];
                    lng = coords[0];
                    // console.log(lat);
                    newMarker({ lat: lat, lng: lng });
                }
            })
        })

    // parksXY.forEach((coordinate) =>{
    //     let lat = coordinate[1];
    //     let lng = coordinate[0];
    //     console.log(lat);
    //     console.log(lng);
    //     newMarker({lat: lat, lng: lng});
    // })
})

// OpenWeather Api //
let weatherEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=chicago&appid=6251120bd87aacc80e3fcdce5920f9ee";
let weatherData_url = weatherEndpoint;
fetch(weatherData_url)
    .then((response) => {
        // console.log(response.json());
        return response.json();
    })
    .then((data) => {
        // console.log(data);
        let temperature = data["main"]["temp"];
        let temperatureF = (parseFloat(temperature) - 273.15) * 9/5 + 32;
        document.getElementById("temperature").innerHTML = temperatureF.toFixed(2) + "°F";
        // console.log(temperature);
    })

// City of Chicago Parks Api //
let parkEndpoint = "https://data.cityofchicago.org/resource/eix4-gf83.json";
let parkData_url = parkEndpoint;
let parks = [];
let parksXY = [];
// parks.sort();

// creates a dropdown menu using park names
fetch(parkData_url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log(data);

        data.forEach((entry) => {
            if (!parks.includes(entry["park"])) {
                parks.push(entry["park"]);
                parksXY.push(entry["the_geom"]["coordinates"]);
            }
        });

        let dropdown_park_options_array = [];
        dropdown_park_options_array.push("<option value='' id='park' selected></option>")
        parks.forEach((element) => {
            dropdown_park_options_array.push("<option value='' id='park'>" + element + "</option>");
        });
        document.getElementById("dropdown_park_options").innerHTML = dropdown_park_options_array.join();
    });

// console.log(parks);
// console.log(parksXY);
// let menu = document.querySelector(".mdc-menu mdc-menu-surface");

// Geolocation data - get the users current location //

// IndexDB requirement//