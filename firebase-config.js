// Firebase configuration and initialization
// 1) Create a Firebase project at https://console.firebase.google.com
// 2) Enable Firestore Database (in test mode for quick start or with proper rules)
// 3) Replace the config object below with your actual project config
// 4) Keep this file loaded before script.js (already set in index.html)

(function() {
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

    // Initialize Firebase
    if (window.firebase.apps && window.firebase.apps.length) {
      window.firebaseApp = window.firebase.app();
    } else {
      window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
    }

    // Initialize Firestore
    window.db = window.firebase.firestore();

    // Configure Firestore settings with new cache API
    const firestoreSettings = {
      // Enable offline persistence
      cache: {
        sdkCacheSizeBytes: 50 * 1024 * 1024 // 50MB cache size
      }
    };

    // Apply settings
    window.db.settings(firestoreSettings);

    // For backward compatibility, also set up persistence
    if (window.db.enablePersistence) {
      window.db.enablePersistence({
        synchronizeTabs: true
      }).catch(function(err) {
        if (err.code === 'failed-precondition') {
          console.warn('Multi-tab persistence is not supported in this browser');
        } else if (err.code === 'unimplemented') {
          console.warn('Persistence is not supported in this browser');
        }
      });
    }
  } catch (e) {
    console.error('Error initializing Firebase:', e);
  }
})();
