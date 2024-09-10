const joinEvent = async (eventId) => {
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
  };
  
  // Trigger the function when the "Join" button is clicked
  document.querySelector('#join-event-btn').addEventListener('click', () => {
    const eventId = document.querySelector('#event-id').value; // Or however you're storing the event ID
    joinEvent(eventId);
  });
  