const eventFormHandler = async (event) => {
  event.preventDefault();

  const eventName = document.querySelector("#event-name").value.trim();
  const eventTime = document.querySelector("#event-time").value.trim();
  const eventLocation = document.querySelector("#event-location").value.trim();

  if (eventName && eventTime && eventLocation) {
    try {
      // Fetch the latitude and longitude using the Geocoding API
      const geoResponse = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(eventLocation)}&key=YOUR_GOOGLE_MAPS_API_KEY`
      );
      const geoData = await geoResponse.json();

      if (geoData.results && geoData.results.length > 0) {
        const location = geoData.results[0].geometry.location;
        const latitude = location.lat;
        const longitude = location.lng;

        console.log("Geocoded coordinates:", latitude, longitude);

        // Send the event details, along with latitude and longitude, to your server
        const response = await fetch("/api/events", {
          method: "POST",
          body: JSON.stringify({ location, latitude, longitude, time, name, }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
      } else {
        alert("Failed to get location coordinates.");
      }
    } catch (err) {
      console.error("Error fetching geocoding data", err);
      alert("Error fetching geocoding data");
    }
  }
};

document.querySelector(".new-event-form").addEventListener("submit", eventFormHandler);
