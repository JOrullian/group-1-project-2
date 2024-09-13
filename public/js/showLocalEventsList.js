document.addEventListener("DOMContentLoaded", () => {
  const eventsData = localStorage.getItem('nearbyEvents');
  if (eventsData) {
    const events = JSON.parse(eventsData);
    console.log("Retrieved events:", events);

    // Populate events in the .local-events-list container
    const eventsContainer = document.querySelector(".local-events-list");
    eventsContainer.innerHTML = ''; // Clear existing events

    events.forEach(event => {
      const eventElement = document.createElement('div');
      eventElement.classList.add('event-container');

      eventElement.innerHTML = `
        <div class="event-icon-container">
          <img src="icons/${event.icon || 'default-icon.svg'}" class="event-icon">
        </div>
        <div class="event-info-container">
          <div class="event-info-title-container">
            <h3 class="event-info-title">${event.name}</h3>
            <h4>${event.type}</h4> <!-- Adjust according to your event data -->
          </div>
          <div class="event-info-separator-container">
            <div class="event-info-separator"></div>
          </div>
          <div class="event-location-info-container">
            <div class="event-date-time-container">
              <h3 class="event-time-title">Start Time</h3>
              <h4 class="event-time">${event.time}</h4>
            </div>
            <div class="event-open-spots-container">
              <div class="event-open-slots-board">
                <h3 class="event-slots">${event.openSlots}</h3>
                <h4 class="event-slots-title">Open Slots</h4>
              </div>
            </div>
            <div class="event-more-info-container">
              <button class="more-info-btn">More Info</button>
            </div>
          </div>
        </div>
      `;

      eventsContainer.appendChild(eventElement);
    });
  } else {
    console.log("No nearby events data found in local storage.");
  }
});
