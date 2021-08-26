import React, { useState } from "react";
import { v4 as uuid } from "uuid";
// import pong from "../../lib/pong";
import uploadToS3 from "./s3";
import { REACT_APP_S3_BUCKET } from "./secret";

const Upload = () => {

  const [uploading, setUploading] = useState(false);

  const id = uuid();

  const handleUpload = (uploadEvent) => {
    uploadEvent.persist();
    setUploading(true);

    const [file] = uploadEvent.target.files;
    const reader = new FileReader();

    reader.onloadend = (onLoadEndEvent) => {
      fetch("http://localhost:3001/users/testuser1/upload", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key: id + '.' + file.name.split('.')[1],
          data: onLoadEndEvent.target.result.split(",")[1],
          contentType: file.type,
        }),
      })
        .then(() => {
          setUploading(false);
          // pong.success("File uploaded!");
          uploadEvent.target.value = "";
        })
        .catch((error) => {
          setUploading(false);
          // pong.danger(error.message || error.reason || error);
          uploadEvent.target.value = "";
        });
      async function upload() {
        await uploadToS3({
          bucket: REACT_APP_S3_BUCKET,
          acl: "public-read",
          key: id + '.' + file.name.split('.')[1],
          data: onLoadEndEvent.target.result.split(",")[1],
          contentType: file.type
        });
        setUploading(false);
      };
      upload();
    };

    reader.readAsDataURL(file);

  };

  return (
    <div>
      <header className="page-header">
        <h4>Upload a File</h4>
      </header>
      <form className="mb-3">
        <label className="form-label">File to Upload</label>
        <input
          disabled={uploading}
          type="file"
          className="form-control"
          onChange={handleUpload}
        />
      </form>
      {uploading && <p>Uploading your file to S3...</p>}
    </div>
  );
};

Upload.propTypes = {};

export default Upload;