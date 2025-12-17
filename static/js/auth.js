console.log("auth.js loaded — REDIRECT MODE");

const firebaseConfig = {
  apiKey: "AIzaSyBiBlHXINpLRAFYVPG0sULnh6EQXiw9ktk",
  authDomain: "campusq-d771f.firebaseapp.com",
  projectId: "campusq-d771f",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

const provider = new firebase.auth.GoogleAuthProvider();

function googleLogin() {
  console.log("Redirect login started");
  firebase.auth().signInWithRedirect(provider);
}

// Handle redirect return
firebase.auth().getRedirectResult()
  .then(async (result) => {
    if (result.user) {
      const token = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      console.log("Redirect success → services");
      window.location.href = "/services/";
    }
  })
  .catch((error) => {
    console.error("Redirect error:", error.code);
  });

// Safety net
firebase.auth().onAuthStateChanged(async (user) => {
  if (user && !localStorage.getItem("firebaseToken")) {
    const token = await user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    window.location.href = "/services/";
  }
});
