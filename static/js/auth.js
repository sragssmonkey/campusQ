console.log("auth.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyBiBlHXINpLRAFYVPG0sULnh6EQXiw9ktk",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
  console.log("Popup login started");

  firebase.auth().signInWithPopup(provider).catch((error) => {
    console.warn("Popup closed or ignored:", error.code);
    // DO NOT redirect here
  });
}

// 🔥 THIS is what actually redirects the user
firebase.auth().onAuthStateChanged(async (user) => {
  console.log("Auth state changed:", user);

  if (user) {
    const token = await user.getIdToken();
    localStorage.setItem("firebaseToken", token);

    console.log("Redirecting to /services/");
    window.location.href = "/services/";
  }
});
