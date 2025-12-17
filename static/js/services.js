function takeToken(serviceId) {
  fetch(`/api/take-token/${serviceId}/`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("firebaseToken"),
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => {
    alert(`🎟 Token ${data.token} issued successfully`);
  })
  .catch(() => {
    alert("❌ Failed to take token");
  });
}
