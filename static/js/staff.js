function getSelectedService() {
  return document.getElementById("serviceSelect").value;
}

function callNext() {
  const serviceId = getSelectedService();

  fetch(`/api/call-next/${serviceId}/`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("firebaseToken"),
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => {
    if (data.called_token) {
      document.getElementById("currentToken").innerText = data.called_token;
    } else {
      alert(data.message || "No tokens");
    }
  })
  .catch(() => alert("Failed to call next token"));
}

function markServed() {
  alert("Marked as served (extend backend logic)");
}
function markServed(tokenId) {
  fetch(`/api/mark-served/${tokenId}/`, {
    method: "POST",
    headers: {
      "Authorization": localStorage.getItem("firebaseToken"),
      "Content-Type": "application/json",
    },
  })
  .then(res => res.json())
  .then(data => {
    alert("✔ Token served");
  })
  .catch(() => alert("Failed to mark served"));
}
