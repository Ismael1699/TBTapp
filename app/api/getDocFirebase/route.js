import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import app from '../../../services/firebase';

export async function GET() {
  // const body = await req.json();
  const dataBase = getFirestore(app);
  const coll = collection(dataBase, 'requisiciones');

  let result = null;
  let error = null;
  const data = [];

  try {
    result = await getDocs(coll);

    result.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (e) {
    error = e;
  }

  return NextResponse.json({ data, error });
}
