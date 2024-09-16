const mapCont = $('#map-container');

document.addEventListener("DOMContentLoaded", () => {
  const eventsData = localStorage.getItem("nearbyEvents");
  if (eventsData) {
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

    // Populate events in the .local-events-list container
    const eventsContainer = document.querySelector(".local-events-list");
    eventsContainer.innerHTML = ""; // Clear existing events

    events.forEach((event) => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("event-container");

      const dateTimeString = event.time;
      const dateObject = new Date(dateTimeString);

      // Format Date
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
            <h4 class="event-info-sport-type">${event.sportType}</h4>
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

      if($(window).width() < 600) {
        const eventTab = eventsContainer.querySelector(".event-container");

        eventTab.addEventListener("click", async () => {

          const response = await fetch('/api/users/check-login');

          if (response.ok === true) {
            
            const eventDetails = eventElement.querySelector(".event-details-container");
            if (eventDetails) {
              eventDetails.remove(); // Remove existing details if present
            } else {

              mapCont.append(
                `<div id="event-details-container" class="event-details-container">
                  <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                  <div class="event-title-container">
                    <h1 class="event-title">${event.name}<br/>${event.location}</h1>
                  </div>
                  <div class="event-details-divider"></div>
                  <div class="event-details-info">
                    <div class="event-start-time-container">
                      <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                    </div>
                    <div class="event-address-container">
    
                    </div>
                  </div>
                </div> `
              )
              const eventDetailsCont = $('#event-details-container')
              const eventCloseBtn = $('#event-close-btn')

              eventCloseBtn.on('click', () => {
                console.log('HELP HELP HELP')
                eventDetailsCont.remove();
              })
            }
          } else {
            showLoginPopup();
          }
        });
      
      } else {
        const moreInfoBtn = eventElement.querySelector(".more-info-btn");

        moreInfoBtn.addEventListener("click", async () => {
          // Check if the details div already exists, if so, remove it
          const eventDetails = eventElement.querySelector(".event-details-container");
          if (eventDetails) {
            eventDetails.remove(); // Remove existing details if present
          } else {
            // Create and append the event details dynamically
            // const response = await fetch("/api-key");
            // const data = await response.json();
            // const apiKey = data.apiKey;

            // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event.latitude},${event.longitude}&key=${apiKey}`

            // const getAddress = 
            // fetch(url)
            //   .then(response => response.json())
            //   .then(data => {
            //     const locationAddress = data.results[0].formatted_address
            //     return locationAddress;
            //   })

            mapCont.append(
              `<div id="event-details-container" class="event-details-container">
                <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                <div class="event-title-container">
                  <h1 class="event-title">${event.name} - ${event.location}</h1>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-details-info">
                  <div class="event-start-time-container">
                    <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                  </div>
                  <div class="event-address-container">

                  </div>
                </div>
              </div> `
            )
            const eventDetailsCont = $('#event-details-container')
            const eventCloseBtn = $('#event-close-btn')

            eventCloseBtn.on('click', () => {
              eventDetailsCont.remove();
            })
          }
        });
      }
    });
  } else {
    console.log("No nearby events data found in local storage.");
  }
});