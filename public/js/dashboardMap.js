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
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const latitude = position.coords.latitude;
              const longitude = position.coords.longitude;
      
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      
              const eventsResponse = await fetch("/api/events/nearby", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ latitude, longitude }),
              });
      
              const events = await eventsResponse.json();
              console.log("Nearby events:", events);
      
              const loginStatusResponse = await fetch("/api/users/check-login");
              const { logged_in } = await loginStatusResponse.json();
      
              let map;
              function initMap() {
                let location = { lat: latitude, lng: longitude };
                map = new google.maps.Map(document.getElementById("map"), {
                  zoom: 11,
                  center: location,
                  disableDefaultUI: true,
                });
      
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
      
              if (logged_in) {
                const yourEventsResponse = await fetch("/api/events/yourEvents", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                });
                const yourEvents = await yourEventsResponse.json();
                console.log("Your Events:", yourEvents);
      
                // Display user-specific events on the map
                displayYourEventsOnMap(map, yourEvents);
                showYourEventsList(yourEvents);
              }
      
              showLocalEventsList(events);
            },
            (error) => {
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
  });
}

function displayYourEventsOnMap(map, yourEvents) {
  yourEvents.forEach((event) => {
    const marker = new google.maps.Marker({
      position: { lat: event.latitude, lng: event.longitude },
      map: map,
    });
  });
}

function showLocalEventsList(events) {
  const mapCont = $("#map-container");

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
    hockey: "hockey-icon.svg",
  };

  // Populate events in the .local-events-list container
  const eventsContainer = document.querySelector(".local-events-list");
  eventsContainer.innerHTML = ""; // Clear existing events

  events.forEach((event) => {
    const eventElement = document.createElement("div");
    eventElement.classList.add("event-container");

    const dateTimeString = event.time;
    const dateObject = new Date(dateTimeString);

    const openSlots = event.numberOfPlayers - event.participants.length;

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
                <h3 class="event-slots">${openSlots}</h3>
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

    if ($(window).width() < 600) {
      eventElement.addEventListener("click", () => {
        // Check if the details div already exists, if so, remove it
        const eventDetails = eventElement.querySelector(
          ".event-details-container"
        );
        if (eventDetails) {
          eventDetails.remove(); // Remove existing details if present
        } else {
          mapCont.append(`
              <div id="event-details-container" class="event-details-container">
                <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                <div class="event-title-container">
                  <h1 class="event-title">${event.name}</h1>
                </div>
                <div class="event-subtitletitle-container">
                  <h2 class="event-subtitle">${event.location}</h2>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-details-info">
                  <div class="event-start-time-container">
                    <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                  </div>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-join-container">
                    <button class="join-event-btn" data-event-id="${event.id}">Join Event</button>
                  </div>
                </div>
              </div>
            `);

          // Close button functionality
          $(".event-close-btn").on("click", () => {
            $(".event-details-container").remove(); // Close the popup
          });

          // Handle the click on the "Join Event" button
          $(".join-event-btn").on("click", async function () {
            const eventId = $(this).data("event-id");

            try {
              const response = await fetch(`/api/events/${eventId}/join`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                alert("You've successfully joined the event!");

                // Update the UI to reflect the new participant count
                event.participants.push("newUser"); // Replace 'newUser' with the actual user data
                const newOpenSlots =
                  event.numberOfPlayers - event.participants.length;
                eventElement.querySelector(".event-slots").textContent =
                  newOpenSlots;

                console.log(event.participants);
              } else if (response.status === 400) {
                alert("You are already part of this event.");
              } else if (response.status === 403) {
                alert("This event is already full.");
              } else {
                alert("Failed to join the event.");
              }
            } catch (error) {
              console.error("Error joining the event:", error);
              alert("An error occurred while joining the event.");
            }
          });
        }
      });
    } else {
      const moreInfoBtn = eventElement.querySelector(".more-info-btn");

      moreInfoBtn.addEventListener("click", async () => {
        // Check if the details div already exists, if so, remove it
        const eventDetails = eventElement.querySelector(
          ".event-details-container"
        );
        if (eventDetails) {
          eventDetails.remove(); // Remove existing details if present
        } else {
          mapCont.append(`
              <div id="event-details-container" class="event-details-container">
                <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                <div class="event-title-container">
                  <h1 class="event-title">${event.name}</h1>
                </div>
                <div class="event-subtitletitle-container">
                  <h2 class="event-subtitle">${event.location}</h2>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-details-info">
                  <div class="event-start-time-container">
                    <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                  </div>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-join-container">
                    <button class="join-event-btn" data-event-id="${event.id}">Join Event</button>
                  </div>
                </div>
              </div>
            `);

          // Close button functionality
          $("#event-close-btn").on("click", () => {
            $("#event-details-container").remove(); // Close the popup
          });

          // Handle the click on the "Join Event" button
          $(".join-event-btn").on("click", async function () {
            const eventId = $(this).data("event-id");

            try {
              const response = await fetch(`/api/events/${eventId}/join`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                alert("You've successfully joined the event!");

                // Update the UI to reflect the new participant count
                event.participants.push("newUser"); // Replace 'newUser' with the actual user data
                const newOpenSlots =
                  event.numberOfPlayers - event.participants.length;
                eventElement.querySelector(".event-slots").textContent =
                  newOpenSlots;

              } else if (response.status === 400) {
                alert("You are already part of this event.");
              } else if (response.status === 403) {
                alert("This event is already full.");
              } else {
                alert("Failed to join the event.");
              }
            } catch (error) {
              console.error("Error joining the event:", error);
              alert("An error occurred while joining the event.");
            }
          });
        }
      });
    }
  });
};

function showYourEventsList(yourEvents) {
  const mapCont = $("#map-container");

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
    hockey: "hockey-icon.svg",
  };

  // Populate events in the .saved-events-list container
  const yourEventsContainer = document.querySelector(".saved-events-list");
  yourEventsContainer.innerHTML = ""; // Clear existing events

  yourEvents.forEach((event) => {
    const yourEventElement = document.createElement("div");
    yourEventElement.classList.add("event-container");

    const dateTimeString = event.time;
    const dateObject = new Date(dateTimeString);

    const openSlots = event.numberOfPlayers - event.participants.length;

    // Format Date
    const formattedDate = dateObject.toLocaleDateString();
    const formattedTime = dateObject.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Determine the icon based on sportType
    const iconFileName = sportIcons[event.sportType] || "default-icon.svg"; // Default to 'default-icon.svg' if sportType is not found

    yourEventElement.innerHTML = `
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
                <h3 class="event-slots">${openSlots}</h3>
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
    yourEventsContainer.appendChild(yourEventElement);

    if ($(window).width() < 600) {
      yourEventElement.addEventListener("click", () => {
        // Check if the details div already exists, if so, remove it
        const eventDetails = yourEventElement.querySelector(
          ".event-details-container"
        );
        if (eventDetails) {
          eventDetails.remove(); // Remove existing details if present
        } else {
          mapCont.append(`
              <div id="event-details-container" class="event-details-container">
                <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                <div class="event-title-container">
                  <h1 class="event-title">${event.name}</h1>
                </div>
                <div class="event-subtitletitle-container">
                  <h2 class="event-subtitle">${event.location}</h2>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-details-info">
                  <div class="event-start-time-container">
                    <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                  </div>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-join-container">
                    <button class="join-event-btn" data-event-id="${event.id}">Join Event</button>
                  </div>
                </div>
              </div>
                </div>
              </div>
            `);

          // Close button functionality
          $(".event-close-btn").on("click", () => {
            $(".event-details-container").remove(); // Close the popup
          });

          // Handle the click on the "Join Event" button
          $(".join-event-btn").on("click", async function () {
            const eventId = $(this).data("event-id");

            try {
              const response = await fetch(`/api/events/${eventId}/join`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                alert("You've successfully joined the event!");

                // Update the UI to reflect the new participant count
                event.participants.push("newUser"); // Replace 'newUser' with the actual user data
                const newOpenSlots =
                  event.numberOfPlayers - event.participants.length;
                yourEventElement.querySelector(".event-slots").textContent =
                  newOpenSlots;

                console.log(event.participants);
              } else if (response.status === 400) {
                alert("You are already part of this event.");
              } else if (response.status === 403) {
                alert("This event is already full.");
              } else {
                alert("Failed to join the event.");
              }
            } catch (error) {
              console.error("Error joining the event:", error);
              alert("An error occurred while joining the event.");
            }
          });
        }
      });
    } else {
      const moreInfoBtn = yourEventElement.querySelector(".more-info-btn");

      moreInfoBtn.addEventListener("click", async () => {
        // Check if the details div already exists, if so, remove it
        const eventDetails = yourEventElement.querySelector(
          ".event-details-container"
        );
        if (eventDetails) {
          eventDetails.remove(); // Remove existing details if present
        } else {
          mapCont.append(`
              <div id="event-details-container" class="event-details-container">
                <img id="event-close-btn" class="event-close-btn" src="/icons/close-btn-icon.svg">
                <div class="event-title-container">
                  <h1 class="event-title">${event.name}</h1>
                </div>
                <div class="event-subtitletitle-container">
                  <h2 class="event-subtitle">${event.location}</h2>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-details-info">
                  <div class="event-start-time-container">
                    <h3 class="event-start-time">Start Time: ${formattedTime}, ${formattedDate}</h3>
                  </div>
                </div>
                <div class="event-details-divider"></div>
                <div class="event-join-container">
                    <button class="join-event-btn" data-event-id="${event.id}">Join Event</button>
                  </div>
                </div>
              </div>
            `);

          // Close button functionality
          $("#event-close-btn").on("click", () => {
            $("#event-details-container").remove(); // Close the popup
          });

          // Handle the click on the "Join Event" button
          $(".join-event-btn").on("click", async function () {
            const eventId = $(this).data("event-id");

            try {
              const response = await fetch(`/api/events/${eventId}/join`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
              });

              if (response.ok) {
                alert("You've successfully joined the event!");

                // Update the UI to reflect the new participant count
                event.participants.push("newUser"); // Replace 'newUser' with the actual user data
                const newOpenSlots =
                  event.numberOfPlayers - event.participants.length;
                yourEventElement.querySelector(".event-slots").textContent =
                  newOpenSlots;

                console.log(event.participants);
              } else if (response.status === 400) {
                alert("You are already part of this event.");
              } else if (response.status === 403) {
                alert("This event is already full.");
              } else {
                alert("Failed to join the event.");
              }
            } catch (error) {
              console.error("Error joining the event:", error);
              alert("An error occurred while joining the event.");
            }
          });
        }
      });
    }
  });
}