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

const joinEvent = async (eventId) => {
  if (logged_in) {
    const response = await fetch(`/api/events/${eventId}/join`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert("Successfully joined the event!");
    } else {
      const errorMessage = await response.json();
      alert(errorMessage.message);
    }
  } else {
    alert("You must log in to join an event.");
    return;
  }

  };
  
  // Trigger the function when the "Join" button is clicked
  document.querySelector('#join-event-btn').addEventListener('click', () => {
    const eventId = document.querySelector('#event-id').value; // Or however you're storing the event ID
    joinEvent(eventId);
  });
  