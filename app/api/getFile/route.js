import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { NextResponse } from 'next/server';
import app from '../../../services/firebase';

export async function POST(req) {
  // const body = await req.json();
  const storage = getStorage(app);
  const starsRef = ref(storage, body);

  let link = '';
  let error = null;
  await getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      link = url;
    })
    .catch((e) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      error = e;
    });

  return NextResponse.json({ link: link, error: error });
}
