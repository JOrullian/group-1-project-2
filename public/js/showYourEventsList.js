document.addEventListener("DOMContentLoaded", () => {
    const eventsData = localStorage.getItem("nearbyEvents");
    // const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (eventsData && loggedInUserId) {
      const events = JSON.parse(eventsData);
      console.log("Retrieved events:", events);
  
      // Define sport type to icon mappings
      const sportIcons = {
        basketball: "basketball-icon.svg",
        soccer: "soccer-icon.svg",
        football: "football-icon.svg",
        pickleball: "pickleball-icon.svg",
        tennis: "tennis-icon.svg",
        raquetball: "raquetball-icon.svg",
        baseball: "baseball-icon.svg",
        volleyball: "volleyball-icon.svg",
        lacrosse: "lacrosse-icon.svg",
        hockey: "hockey-icon.svg"
      };
  
      // Select the container where the user's events will be displayed
      const userEventsContainer = document.querySelector(".saved-events-list");
      userEventsContainer.innerHTML = ""; // Clear existing events
  
      // Filter events that match the logged-in user's ID
      const userEvents = events.filter(event => event.user_id === parseInt(loggedInUserId));
  
      if (userEvents.length === 0) {
        userEventsContainer.innerHTML = "<p>You have not created any events.</p>";
        return;
      }
  
      // Populate filtered user events in the .saved-events-list container
      userEvents.forEach((event) => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event-container");
  
        const dateTimeString = event.time;
        const dateObject = new Date(dateTimeString);
  
        // Format Date and Time
        const formattedDate = dateObject.toLocaleDateString();
        const formattedTime = dateObject.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
  
        // Determine the icon based on sportType
        const iconFileName = sportIcons[event.sportType] || "default-icon.svg"; // Default to 'default-icon.svg' if sportType is not found
  
        eventElement.innerHTML = `
          <div class="event-icon-container">
            <img src="icons/${iconFileName}" class="event-icon">
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
        userEventsContainer.appendChild(eventElement);
  
        // Add event listener for the "More Info" button
        const moreInfoBtn = eventElement.querySelector(".more-info-btn");
  
        moreInfoBtn.addEventListener("click", () => {
          // Check if the details div already exists, if so, remove it
          let eventDetails = eventElement.querySelector(".event-details");
          if (eventDetails) {
            eventDetails.remove(); // Remove existing details if present
            moreInfoBtn.textContent = "More Info"; // Reset button text
          } else {
            // Create and append the event details dynamically
            eventDetails = document.createElement("div");
            eventDetails.classList.add("event-details");
            eventDetails.innerHTML = `
              <div>
                <p><strong>Location:</strong> ${event.location}</p>
                <p><strong>Description:</strong> ${event.description || "No description available."}</p>
                <p><strong>Participants:</strong> ${event.participants || "No participants yet."}</p>
              </div>
            `;
            eventElement.appendChild(eventDetails); // Append details to the event container
            moreInfoBtn.textContent = "Less Info"; // Change button text
          }
        });
      });
    } else {
      console.log("No nearby events data found in local storage or user is not logged in.");
    }
  });
  