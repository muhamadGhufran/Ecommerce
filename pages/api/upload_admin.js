import multiparty from 'multiparty';
import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3';
const fs = require('fs')
const mime = require('mime-types')
import {mongooseConnect} from "@/lib/mongoose";

const bucketName = 'ghufran-next-ecommerce';

export default async function handle(req,res) { 
  await mongooseConnect();


  const form = new multiparty.Form();
  const {fields,files} = await new Promise((resolve,reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) console.log(err);
      console.log(err)
      resolve({fields,files});
    });
  });
  console.log('length:', files.file.length);
  const client = new S3Client({
    region: 'eu-north-1',
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY,
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
  });

  console.log('S3_ACCESS_KEY: ',process.env.S3_ACCESS_KEY);

  console.log('SECRET_ACCESS_KEY: ',process.env.S3_SECRET_ACCESS_KEY);


  const links = [];
  for (const file of files.file) {
    const ext = file.originalFilename.split('.').pop();
    const newFilename = Date.now() + '.' + ext;
    await client.send(new PutObjectCommand({
      Bucket: bucketName,
      Key: newFilename,
      Body: fs.readFileSync(file.path),
      ACL: 'public-read',
      ContentType: mime.lookup(file.path),
    }));
    const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
    links.push(link);
  }
  return res.json({links});
}

export const config = {
  api: {bodyParser: false},
};