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

      const dateTimeString = event.time;
      const dateObject = new Date(dateTimeString);

      // Format Date
      const formattedDate = dateObject.toLocaleDateString();
      const formattedTime = dateObject.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


      eventElement.innerHTML = `
        <div class="event-icon-container">
          <img src="icons/${event.icon || 'default-icon.svg'}" class="event-icon">
        </div>
        <div class="event-info-container">
          <div class="event-info-title-container">
            <h3 class="event-info-title">${event.name}</h3>
            <h4>${event.type}</h4>
          </div>
          <div class="event-info-separator-container">
            <div class="event-info-separator"></div>
          </div>
          <div class="event-location-info-container">
            <div class="event-date-time-container">
              <h3 class="event-time-title">Start Time</h3>
              <h4 class="event-time">${formattedTime}</h4>
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

      // Append each event to the container
      eventsContainer.appendChild(eventElement);

      // Add event listener for the "More Info" button
      const moreInfoBtn = eventElement.querySelector('.more-info-btn');

      moreInfoBtn.addEventListener('click', () => {
        // Check if the details div already exists, if so, remove it
        let eventDetails = eventElement.querySelector('.event-details');
        if (eventDetails) {
          eventDetails.remove(); // Remove existing details if present
          moreInfoBtn.textContent = "More Info"; // Reset button text
        } else {
          // Create and append the event details dynamically
          eventDetails = document.createElement('div');
          eventDetails.classList.add('event-details');
          eventDetails.innerHTML = `
            <div>
              <p><strong>Location:</strong> ${event.location}</p>
              <p><strong>Description:</strong> ${event.description || 'No description available.'}</p>
              <p><strong>Participants:</strong> ${event.participants || 'No participants yet.'}</p>
            </div>
          `;
          eventElement.appendChild(eventDetails); // Append details to the event container
          moreInfoBtn.textContent = "Less Info"; // Change button text
        }
      });
    });
  } else {
    console.log("No nearby events data found in local storage.");
  }
});
