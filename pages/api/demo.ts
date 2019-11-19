import firebase from 'firebase/app';
import 'firebase/firestore';
import { NextApiRequest, NextApiResponse } from 'next';

const firebaseConfig = {
  apiKey: 'AIzaSyAp67lk3PS_EQ_DBedw7nXt3ENMLINR0sk',
  authDomain: 'kamikaze-8e410.firebaseapp.com',
  databaseURL: 'https://kamikaze-8e410.firebaseio.com',
  projectId: 'kamikaze-8e410',
  storageBucket: 'kamikaze-8e410.appspot.com',
  messagingSenderId: '981353420741',
  appId: '1:981353420741:web:78fa1f85d28a3d862f9dac'
};

// Prevent app/duplicate-app errors when hot reloading.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const titlesDoc = firebase.firestore().collection('kamikaze').doc('title');

export interface Demo {
  title: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const titleData = (await titlesDoc.get()).data();

  if (!titleData) {
    return res.status(404);
  }

  const { titles } = titleData as { titles: string[] };

  const index = Math.round(Math.random() * (titles.length - 1));
  const response: Demo = { title: titles[index] };

  return res.status(200).json(response);
};
