import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBgFPLNfI511O6GMgeUDlAy3n84mltB65M',
  authDomain: 'graphiql-3af07.firebaseapp.com',
  projectId: 'graphiql-3af07',
  storageBucket: 'graphiql-3af07.appspot.com',
  messagingSenderId: '893745075087',
  appId: '1:893745075087:web:cf0c4e7640dee39bf231fa',
  measurementId: 'G-4KHH98N733',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
