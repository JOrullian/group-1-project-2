function displayEventsOnMap(events) {
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12, // Adjust zoom level based on desired area
        center: { lat: events[0].latitude, lng: events[0].longitude }, // Center the map to the first event
        disableDefaultUI: true,
    });

    // Add a marker for each event
    events.forEach(event => {
        const marker = new google.maps.Marker({
            position: { lat: event.latitude, lng: event.longitude },
            map: map,
            title: event.name, // Optionally, set event name as the marker's title
        });
    });
}