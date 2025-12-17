console.log("auth.js loaded");

const firebaseConfig = {
  apiKey: "AIzaSyBiBlHXINpLRAFYVPG0sULnh6EQXiw9ktk",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.GoogleAuthProvider();

// 🔹 START LOGIN
function googleLogin() {
  console.log("Redirect login started");
  firebase.auth().signInWithRedirect(provider);
}

// 🔹 HANDLE REDIRECT RESULT
firebase.auth().getRedirectResult()
  .then(async (result) => {
    if (result.user) {
      const token = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      console.log("Redirect login success, redirecting to services");
      window.location.href = "/services/";
    }
  })
  .catch((error) => {
    console.error("Redirect auth error:", error.code);
  });

// 🔹 SAFETY NET (fires on page reload)
firebase.auth().onAuthStateChanged(async (user) => {
  if (user && !localStorage.getItem("firebaseToken")) {
    const token = await user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    console.log("Auth state detected, redirecting");
    window.location.href = "/services/";
  }
});
