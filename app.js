let topAppBarElement = document.querySelector('.mdc-top-app-bar');
// const topAppBar = new MDCTopAppBar(topAppBarElement);


// let NavBarAnchors = document.querySelectorAll("ul#navbar a");

// NavBarAnchors.forEach((anchor) => {
//     anchor.addEventListener("click", (event) => {

//         document.querySelectorAll(".screen").forEach((screen) => {
//             screen.style.display = "none";
//         });

//         let screen = event.target.getAttribute("data-screen");
//         let targetScreen = document.querySelector("#" + screen); //changed recently
//         targetScreen.style.display = "block";
//     });

// })



// let drawer = document.querySelector('.mdc-drawer');
// list.wrapFocus = true;

let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 41.8781, lng: -87.6298 },
        zoom: 8,
    });
}

// let screens = document.querySelectorAll("#");



// buttons //
let homeButton = document.querySelector("#homeButton");
let filterButton = document.querySelector("#filterButton");
let listButton = document.querySelector("#listButton");
let mapButton = document.querySelector("#mapButton");

// screens //
let homeScreen = document.querySelector("#homeScreen");
let filterScreen = document.querySelector("#filterScreen");
let listScreen = document.querySelector("#listScreen");
let mapScreen = document.querySelector("#mapScreen");


// button event listeners //
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

