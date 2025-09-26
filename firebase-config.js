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

    // Check if already initialized to prevent warnings
    if (window.db) {
      console.log('🔄 Firebase already initialized, skipping...');
      return;
    }

    // Initialize Firebase
    if (window.firebase.apps && window.firebase.apps.length) {
      window.firebaseApp = window.firebase.app();
      console.log('🔄 Using existing Firebase app');
    } else {
      window.firebaseApp = window.firebase.initializeApp(firebaseConfig);
      console.log('🚀 Firebase app initialized');
    }

    // Initialize Firestore with modern settings
    const firestoreSettings = {
      // Use new cache API instead of deprecated methods
      cache: {
        sizeBytes: 50 * 1024 * 1024 // 50MB cache size
      },
      // Merge settings to avoid override warning
      merge: true
    };

    // Initialize Firestore with settings
    window.db = window.firebase.firestore();
    
    // Apply settings with merge option to avoid override warning
    try {
      window.db.settings(firestoreSettings);
      console.log('✅ Firestore initialized with modern cache settings');
    } catch (settingsError) {
      console.warn('⚠️ Could not apply Firestore settings:', settingsError);
      // Fallback to basic initialization
      window.db = window.firebase.firestore();
    }
  } catch (e) {
    console.error('Error initializing Firebase:', e);
  }
})();
