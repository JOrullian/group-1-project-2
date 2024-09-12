const eventFormHandler = async (event) => {
    event.preventDefault();

    const eventName = document.querySelector("#event-name").value.trim();
    const eventTime = document.querySelector("#event-time").value.trim();
    const eventLocation = document.querySelector("#event-location").value.trim();

    if (eventName && eventTime && eventLocation) {
      const response = await fetch("/api/events", {
        method: "POST",
        body: JSON.stringify({ eventName, eventTime, eventLocation }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector(".new-event-form").addEventListener("submit", eventFormHandler);