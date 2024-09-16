document.addEventListener("DOMContentLoaded", async () => {
  try {
    console.log("Fetching API key...");

    // Fetch the API key from your server
    const response = await fetch("/api-key");
    if (!response.ok) throw new Error("Failed to fetch API key");
    const data = await response.json();
    const apiKey = data.apiKey;

    // Initialize the Google Maps API with the fetched API key
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      async function getLocation() {
        if (navigator.geolocation) {
          // Get the current position of the user
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;

              // Display the coordinates
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              console.log("Location found!");

              const eventsResponse = await fetch("/api/events/nearby", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ latitude, longitude }),
              });

              const events = await eventsResponse.json();
              console.log("Nearby events:", events);

              // Store events in local storage
              localStorage.setItem('nearbyEvents', JSON.stringify(events));

              function initMap() {
                // The location for the center of the map (latitude and longitude)
                let location = { lat: latitude, lng: longitude };

                // The map, centered at the location
                const map = new google.maps.Map(
                  document.getElementById("map"),
                  {
                    zoom: 11,
                    center: location,
                    disableDefaultUI: true,
                  }
                );

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

                displayEventsOnMap(map, events);
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

function displayEventsOnMap(map, events) {
  if (!Array.isArray(events)) {
    console.error("Events data is not an array:", events);
    return;
  }

  events.forEach((event) => {
    const marker = new google.maps.Marker({
      position: { lat: event.latitude, lng: event.longitude },
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${event.name}</h3><p>${event.time}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}
