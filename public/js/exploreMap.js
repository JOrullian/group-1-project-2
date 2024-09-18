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

    script.onload = async () => {
      // Fetch all events from the server
      const eventsResponse = await fetch("/api/events");
      const events = await eventsResponse.json();

      console.log("All events:", events);

      function initMap() {
        // Center the map to a general location (you can customize this)
        let centerLocation = { lat: 33.0050, lng: -96.5698 };

        // Create the map
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 10, // You can adjust the zoom level based on your preference
          center: centerLocation,
          disableDefaultUI: true,
        });

        // Display event markers on the map
        displayEventsOnMap(map, events);
      }

      initMap();
    };
  } catch (error) {
    console.error("Failed to load API key or events", error);
  }
});

function displayEventsOnMap(map, events) {
  events.forEach((event) => {
    const marker = new google.maps.Marker({
      position: { lat: event.latitude, lng: event.longitude },
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${event.name}</h3><p>${event.description}</p>`,
    });

    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
  });
}
