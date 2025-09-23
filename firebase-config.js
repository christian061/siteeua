// Firebase configuration and initialization
// 1) Create a Firebase project at https://console.firebase.google.com
// 2) Enable Firestore Database (in test mode for quick start or with proper rules)
// 3) Replace the config object below with your actual project config
// 4) Keep this file loaded before script.js (already set in index.html)

(function(){
  // Replace with your Firebase project config
  const firebaseConfig = {
    apiKey: "AIzaSyA38EcvOYe9zYIVkKJDfHXpmkyxPP0RDno",
    authDomain: "form-eua.firebaseapp.com",
    projectId: "form-eua",
    storageBucket: "form-eua.firebasestorage.app",
    messagingSenderId: "395757762334",
    appId: "1:395757762334:web:b63f9c26508d998a65bb0f"    
  };

  try {
    // Initialize only once
    if (!window.firebase || !('initializeApp' in window.firebase)) {
      console.warn('Firebase SDK not loaded. Check index.html <script> tags.');
      return;
    }
    if (window.firebase.apps && window.firebase.apps.length) {
      window.firebaseApp = window.firebase.app();
    } else {
      window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
    }
    // Expose Firestore DB globally
    window.db = window.firebase.firestore();

    // Optional: set a default cache setting
    try {
      window.db.enablePersistence && window.db.enablePersistence().catch(()=>{});
    } catch (e) {}
  } catch (e) {
    console.error('Error initializing Firebase:', e);
  }
})();
