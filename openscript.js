const openDrawerButton = document.getElementById('openDrawer');
const closeDrawerButton = document.getElementById('closeDrawer');
const drawer = document.querySelector('.drawer');
const username = localStorage.getItem("username");
const usernameDisplay = document.getElementById("usernameDisplay");
usernameDisplay.textContent = username;

//logic code
const parkingSpots = Array(3);

parkingSpots[101] = '';
parkingSpots[102] = '';
parkingSpots[103] = '';

function isSpotVacant() {
    for (let index = 101; index <= 103; index++) {
        if (!parkingSpots[index - 101]) {
            return true; // At least one spot is vacant
        }
    }
    return false; // All spots are occupied
}

function parkVehicle(vehicleNumber) {
    for (let index = 101; index <= 103; index++) {
        if (!parkingSpots[index - 101]) {
            parkingSpots[index - 101] = vehicleNumber; // Park the vehicle
            console.log(`Vehicle ${vehicleNumber} parked at spot ${index}`);
            return index; // Return the spot index where the vehicle is parked
        }
    }
    return -1; // All parking spots are occupied
}

function removeVehicle(index) {
    if (index < 101 || index > 103) {
        // Check if the index is within the valid range
        console.log("Invalid parking spot.");
        return;
    }
    if (!parkingSpots[index - 101]) {
        console.log("Parking spot is already vacant.");
        return;
    }
    const vehicleNumber = parkingSpots[index - 101];
    parkingSpots[index - 101] = ''; // Vacate the spot
    console.log(`Vehicle ${vehicleNumber} removed from spot ${index}`);
}


//logic code end

openDrawerButton.addEventListener('click', () => {
    drawer.style.right = '0';
});

closeDrawerButton.addEventListener('click', () => {
    drawer.style.right = '-300px';
});

 var map = L.map('map').setView([28.67600676944539, 77.11317470950551], 68);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define a custom icon
var customIcon1 = L.icon({
    iconUrl: 'https://cdn3.iconfinder.com/data/icons/flat-pro-basic-set-1-1/32/location-red-64.png', // Replace with the path to your custom icon image
    iconSize: [50, 50], 
    iconAnchor: [16, 32], 
    popupAnchor: [0, -32] 
});


var customMarker1 = L.marker([28.67600676944539, 77.11317470950551], {
    icon: customIcon1 
}).addTo(map); 
customMarker1.bindTooltip("Your location", {
 
    direction: 'left' 
}).openTooltip();


var customIcon2 = L.icon({
    iconUrl: 'https://cdn0.iconfinder.com/data/icons/smashicons-hotel-services-yellow-vol-2/60/64_-Parking_Sign-_hotel_service_travel_-64.png', // Replace with the path to your custom icon image
    iconSize: [30,30], 
    iconAnchor: [32, 32], 
    popupAnchor: [0, -32] 
});

var customMarker2 = L.marker([28.675301747958393, 77.11330830674349], {
    icon: customIcon2 
}).addTo(map); 
customMarker2.bindTooltip("BVICAM car parking <br>(Private parking)", {
 
    direction: 'left' 
}).openTooltip();

var customMarker3 = L.marker([28.677814982746114, 77.11237489802302], {
    icon: customIcon2 
}).addTo(map); 
customMarker3.bindTooltip("car parking", {
 
    direction: 'left' 
}).openTooltip();

function updateCustomMarker3Popup() {
    if (isSpotVacant()) {
        customMarker3.bindPopup("Space available");
    } else {
        customMarker3.bindPopup("Space unavailable");
    }
}

updateCustomMarker3Popup();

var circleCenter = [28.67767379137911, 77.11202084643939];
var circleRadius = 100;

var circle = L.circle(circleCenter, {
    color: 'transparent',
    fillColor: 'yellow',
    fillOpacity: 0.2,
    radius: circleRadius
}).addTo(map);

customMarker3.on('click', function() {
    openFrame();
});
const openFrameButton = document.getElementById('openFrame');
const closeButton = document.getElementById('closeButton');
const frame = document.querySelector('.frame');


const enterButton = document.getElementById('enterButton');
// Function to open the frame
function openFrame() {
    frame.style.bottom = '0';
}

// Function to close the frame
function closeFrame() {
    frame.style.bottom = '-500px';
}
closeButton.addEventListener('click', () => {
    closeFrame();
});
enterButton.addEventListener('click', () => {
    const inputElement = document.getElementById('vehicleNumber');
    const vehicleNumber = inputElement.value;
    if (isSpotVacant()) {
        const spotIndex = parkVehicle(vehicleNumber);
        if (spotIndex !== -1) {
            alert(`Spot ${spotIndex} allotted.`);
            inputElement.value = ''; // Clear the input field
            closeFrame();
            updateCustomMarker3Popup();
        } 
    }
    else{
        alert("All parking spots are occupied.");
        closeFrame();
        updateCustomMarker3Popup();
    }
});

function changeUserType() {
    const userTypeSelect = document.getElementById("userType");
    const selectedOption = userTypeSelect.value;

    if (selectedOption === "provider") {
        // Redirect to the host registration page (change 'host-registration.html' to the actual URL)
        window.location.href = "host.html";
    }
    // You can add more conditions for other user types if needed
}

















   
