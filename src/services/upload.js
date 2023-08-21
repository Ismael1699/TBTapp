import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
// require('dotenv').config();

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
const BUCKET_REGION = process.env.AWS_S3_BUCKET_REGION;
const BUCKET_PUBLIC_KEY = process.env.AWS_S3_BUCKET_PUBLIC_KEY;
const BUCKET_SECRET_KEY = process.env.AWS_S3_BUCKET_SECRET_KEY;

const client = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: BUCKET_PUBLIC_KEY,
    secretAccessKey: BUCKET_SECRET_KEY,
  },
});

export async function uploadFileS3(file, routeAndName) {
  try {
    const params = {
      Bucket: BUCKET_NAME,
      Key: routeAndName,
      Body: file,
    };
    const comand = new PutObjectCommand(params);
    const response = await client.send(comand);
    return response;
  } catch (error) {
    throw 'Error en aws al subirlo';
  }
}

export async function downloadFileS3() {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: 'preuba.pdf',
  });

  const response = await client.send(command);
  // The Body object also has 'transformToByteArray' and 'transformToWebStream' methods.
  const str = await response.Body.transformToByteArray();
  return str;
}

export async function deleteFileS3() {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: 'nueva/',
  });
  const response = await client.send(command);
  return response;
}
