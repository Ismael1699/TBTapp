import { NextResponse } from 'next/server';
import { getFirestore, collection, doc, getDocs } from 'firebase/firestore';
import app from '../../../services/firebase';

export async function POST(req) {
  const body = await req.json();
  const dataBase = getFirestore(app);
  const coll = collection(dataBase, body.col);

  let result = null;
  let error = null;
  let data = [];

  try {
    result = await getDocs(coll);

    result.forEach((doc) => {
      data.push(doc.data());
    });
  } catch (e) {
    error = e;
  }

  return NextResponse.json({ data: data, error: error });
}
