console.log("AUTH.JS VERSION = REDIRECT v2 🔥");

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

firebase.auth().getRedirectResult()
  .then(async (result) => {
    if (result.user) {
      const token = await result.user.getIdToken();
      localStorage.setItem("firebaseToken", token);
      window.location.href = "/services/";
    }
  })
  .catch((err) => {
    console.error("Redirect error:", err.code);
  });

firebase.auth().onAuthStateChanged(async (user) => {
  if (user && !localStorage.getItem("firebaseToken")) {
    const token = await user.getIdToken();
    localStorage.setItem("firebaseToken", token);
    window.location.href = "/services/";
  }
});
