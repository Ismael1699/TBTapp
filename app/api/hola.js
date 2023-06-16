import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export default async function getFile(data) {
  const storage = getStorage();
  const starsRef = ref(storage, data);

  let link = '';
  let errorl = null;
  getDownloadURL(starsRef)
    .then((url) => {
      // Insert url into an <img> tag to "download"
      link = url;
    })
    .catch((error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      errorl = error;
    });
  return [link, errorl];
}
