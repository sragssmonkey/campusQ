console.log("auth.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyBiBlHXINpLRAFYVPG0sULnh6EQXiw9ktk",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
};

firebase.initializeApp(firebaseConfig);

// Ensure session persists
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.GoogleAuthProvider();

// 🔥 POPUP LOGIN (FINAL)
function googleLogin() {
  console.log("Popup login started");

  firebase.auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      console.log("Popup login success", result.user);

      const token = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", token);

      window.location.href = "/services/";
    })
    .catch((error) => {
      console.error("Popup auth error:", error.code, error.message);
      alert(error.code + ": " + error.message);
    });
}

// Safety net
firebase.auth().onAuthStateChanged(async (user) => {
  if (user && !localStorage.getItem("firebaseToken")) {
    const token = await user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    window.location.href = "/services/";
  }
});
