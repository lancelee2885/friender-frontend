import AWS from "aws-sdk";
import {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION} from "./secret"

AWS.config = new AWS.Config({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: AWS_REGION,
});

const s3 = new AWS.S3();

async function uploadToS3(options) {
  await s3
    .putObject({
      Bucket: options.bucket,
      ACL: options.acl || "public-read",
      Key: options.key,
      Body: Buffer.from(options.data, "base64"),
      ContentType: options.contentType,
    })
    .promise();

  return {
    url: `https://${options.bucket}.s3.amazonaws.com/${options.key}`,
    name: options.key,
    type: options.contentType || "application/",
  };
};

export default uploadToS3;