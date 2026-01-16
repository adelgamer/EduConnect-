import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: "us-east-1", // required by AWS SDK even for MinIO
  endpoint: process.env.STORAGE_URL, // remove for real AWS
  credentials: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
  },
  forcePathStyle: true // REQUIRED for MinIO
});
