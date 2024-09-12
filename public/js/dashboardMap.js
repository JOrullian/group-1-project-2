// const init = require("connect-session-sequelize");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // Fetch the API key from your server
    const response = await fetch("/api-key");
    const data = await response.json();
    const apiKey = data.apiKey;

    // Initialize the Google Maps API with the fetched API key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    document.head.appendChild(script);

    console.log(document.head);

    script.onload = () => {
      function getLocation() {
        if (navigator.geolocation) {
          // Get the current position of the user
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Display the coordinates
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              console.log("Location found!");

              function initMap() {
                // The location for the center of the map (latitude and longitude)
                let location = { lat: latitude, lng: longitude };

                // The map, centered at the location
                const map = new google.maps.Map(
                  document.getElementById("map"),
                  {
                    zoom: 12,
                    center: location,
                    disableDefaultUI: true,
                  }
                );

                // The circle, positioned at the location
                const cityCircle = new google.maps.Circle({
                  strokeColor: "#4285f4",
                  strokeOpacity: 0.8,
                  strokeWeight: 2,
                  fillColor: "#4285f4",
                  fillOpacity: 0.35,
                  map,
                  center: location,
                  radius: 10000,
                });
              }

              initMap();
            },
            (error) => {
              // Handle any errors that occur
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  console.log("User denied the request for Geolocation.");
                  break;
                case error.POSITION_UNAVAILABLE:
                  console.log("Location information is unavailable.");
                  break;
                case error.TIMEOUT:
                  console.log("The request to get user location timed out.");
                  break;
                case error.UNKNOWN_ERROR:
                  console.log("An unknown error occurred.");
                  break;
              }
            }
          );
        } else {
          // If the browser does not support geolocation
          console.log("Geolocation is not supported by this browser.");
        }
      }
      getLocation();
    };
  } catch (error) {
    console.error("Failed to load API key", error);
  }
});

// getLocation();

// function initMap() {
//     // The location for the center of the map (latitude and longitude)
//     let location = { lat: 33.0050, lng: -96.5698 };

//     // The map, centered at the location
//     const map = new google.maps.Map(document.getElementById('map'), {
//         zoom: 16,
//         center: location,
//         disableDefaultUI: true,
//     });

//     // The marker, positioned at the location
//     const marker = new google.maps.Marker({
//         position: location,
//         map: map,
//     });
// };

// // Load the map once the page has fully loaded
// window.onload = initMap;
