import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
  // TODO: Replace with your Firebase project config
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.firestore();
const storage = firebase.storage();

export { db, storage };
