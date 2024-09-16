document.addEventListener("DOMContentLoaded", () => {
  const createEventForm = document.querySelector(".create-event-form");

  if (createEventForm) {
    createEventForm.addEventListener("submit", eventFormHandler);
  } else {
    console.warn("Event form not found in the DOM.");
  }
});

const eventFormHandler = async (event) => {
  event.preventDefault();

  const eventName = document.querySelector("#event-name").value.trim();
  const eventTime = document.querySelector("#start-time").value.trim();
  const placeName = document.querySelector("#event-location").value.trim(); // This is the name of the place

  if (!eventName || !eventTime || !placeName || placeName.length < 3) {
    alert("Please fill in all fields with valid information.");
    return;
  }

  try {
    // Fetch the Google API key from your server
    const response = await fetch("/api-key");
    if (!response.ok) throw new Error("Failed to fetch API key");
    const data = await response.json();
    const apiKey = data.apiKey;

    // Fetch latitude and longitude using the Google Places API
    const placesResponse = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(placeName)}&key=${apiKey}`
    );

    const placesData = await placesResponse.json();
    console.log("Places API response:", placesData);

    if (placesData.results && placesData.results.length > 0) {
      const location = placesData.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      console.log("Coordinates from place name:", latitude, longitude);

      // Now use the coordinates as the event location in your geocoding request (or skip to event creation)
      const createResponse = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({
          location: placeName, // Store the place name as location
          latitude,
          longitude,
          time: eventTime,
          name: eventName,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (createResponse.ok) {
        document.location.replace("/dashboard"); // Redirect to the dashboard
      } else {
        alert("Failed to create event: " + createResponse.statusText);
      }
    } else {
      alert("Place not found. Please try a more specific name.");
    }
  } catch (err) {
    console.error("Error fetching place data:", err);
    alert("Error fetching place data: " + err.message);
  }
};
