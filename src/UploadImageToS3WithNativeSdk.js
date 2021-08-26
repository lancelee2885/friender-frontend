import React , {useState} from 'react';
import AWS from 'aws-sdk'
import uuid from "uuid";
import { REACT_APP_AWS_REGION, REACT_APP_S3_BUCKET, REACT_APP_AWS_ACCESS_KEY, REACT_APP_AWS_SECRET_KEY } from './secret'

const S3_BUCKET = REACT_APP_S3_BUCKET;
const REGION = REACT_APP_AWS_REGION;

AWS.config.update({
    accessKeyId: REACT_APP_AWS_ACCESS_KEY,
    secretAccessKey: REACT_APP_AWS_SECRET_KEY
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
})

const id = uuid.v4();

const UploadImageToS3WithNativeSdk = () => {

    const [progress , setProgress] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileInput = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const uploadFile = (file) => {

        
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: id // use a UUID instead and save somewhere so we can use this for the upload to S3 and the post request to the DB
        };

        // have another function that will upload data to the database (post request)
        // another method in the backend to db.query and upload

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .send((err) => {
                if (err) console.log(err)
            })

    }


    return <div>
        <div>Photo Upload Progress {progress}%</div>
        <input id="photo" type="file" onChange={handleFileInput}/>
        <button onClick={() => uploadFile(selectedFile)}> Upload</button>
    </div>
}

export default UploadImageToS3WithNativeSdk;