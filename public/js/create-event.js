const loginFormHandler = async (event) => {
    event.preventDefault();
    const eventName = document.querySelector("#event-name").value.trim();
    const eventTime = document.querySelector("#event-time").value.trim();
    const eventLocation = document.querySelector("#event-location").value.trim();

    if (eventName && eventTime && eventLocation) {
      const createEvent = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ eventName, eventTime, eventLocation }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {

      } else {
        alert(response.statusText);
      }
    }
  };