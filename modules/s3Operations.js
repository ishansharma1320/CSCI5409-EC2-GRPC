const AWS = require('aws-sdk');
require('dotenv').config();
const fs = require('fs');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
});

const s3 = new AWS.S3();

function uploadToS3(filePath,callbackFn){
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'file.txt',
        Body: fs.readFileSync(filePath)
      };
   
    s3.upload(uploadParams,function(err,data){
        let response = null;
        if (err) {
            console.error('Error uploading file:', err);
          } else {
            console.log('File uploaded successfully. Location:', );
            response = {s3uri: data.Location};
          }
          callbackFn(err,response);
    })
}

function updateFileInS3(filePath,callbackFn){
    const updateParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'file.txt',
        Body: fs.readFileSync(filePath)
      };
    
      s3.putObject(updateParams,function(err,data){
        let response = null;
        if (err) {
            console.error('Error uploading file:', err);
            
          } else {
            console.log('File uploaded successfully. Location:', data.Location);
            response = {};
          }
          callbackFn(err,response);
    })
}

function deleteFile(callbackFn){
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: 'file.txt',
      };
      
      // Delete the file
      s3.deleteObject(params, function(err, data) {
        let response = null;
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
          response = {};
        }
        callbackFn(err,response);
      });
}

module.exports = {
    uploadToS3,
    updateFileInS3,
    deleteFile
}