import { initializeApp } from 'firebase/app';
import { getAuth, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const logout = () => signOut(auth);
let timeout;

function diff(expirationTime) {
  const exp = new Date(expirationTime).getTime();
  return exp - Date.now();
}

function timeoutCallback() {
  auth.currentUser?.getIdTokenResult();
}

function checkToken(idTokenResult) {
  clearTimeout(timeout);
  if (idTokenResult.authTime !== idTokenResult.issuedAtTime) {
    void logout().then(() => (window.location.href = '/'));
  } else {
    timeout = setTimeout(timeoutCallback, diff(idTokenResult.expirationTime));
  }
}

function visibilityCallback() {
  if (document.visibilityState === 'visible') {
    auth.currentUser?.getIdTokenResult().then(checkToken);
  }
}

auth.onIdTokenChanged((user) => {
  user?.getIdTokenResult().then(checkToken);
});

if (typeof window !== 'undefined') {
  window.removeEventListener('visibilitychange', visibilityCallback);
  window.addEventListener('visibilitychange', visibilityCallback);
}

export { auth, logout };
