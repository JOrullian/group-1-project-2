// function getLocation(event) {
//     event.preventDefault();

//     if (navigator.geolocation) {
//       // Get the current position of the user
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//             const latitude = position.coords.latitude;
//             const longitude = position.coords.longitude;

//             // Display the coordinates
//             console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
//             console.log("Location found!");
//         },
//         (error) => {
//           // Handle any errors that occur
//           switch (error.code) {
//             case error.PERMISSION_DENIED:
//               console.log("User denied the request for Geolocation.");
//               break;
//             case error.POSITION_UNAVAILABLE:
//               console.log("Location information is unavailable.");
//               break;
//             case error.TIMEOUT:
//               console.log("The request to get user location timed out.");
//               break;
//             case error.UNKNOWN_ERROR:
//               console.log("An unknown error occurred.");
//               break;
//           }
//         }
//       );
//     } else {
//       // If the browser does not support geolocation
//       console.log("Geolocation is not supported by this browser.");
//     }
// };

function initMap() {
    // The location for the center of the map (latitude and longitude)
    let location = { lat: 33.0050, lng: -96.5698 };
    
    // The map, centered at the location
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: location,
        disableDefaultUI: true,
    });
    
    // The marker, positioned at the location
    const marker = new google.maps.Marker({
        position: location,
        map: map,
    });
};

// Load the map once the page has fully loaded
window.onload = initMap;