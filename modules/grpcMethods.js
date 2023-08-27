const fileIO = require("./fileIO");
const s3Ops = require("./s3Operations");
const path = require("path");
const filePath = path.join(__dirname,'..','files','file.txt');

async function storeData(request, callbackFn){
    let body = request.request;
    let data = body.data;
    await fileIO.writeToFile(filePath,data);
    s3Ops.uploadToS3(filePath, callbackFn)

    
    
}

async function appendData(request,callbackFn){
    let body = request.request;
    let data = body.data;
    await fileIO.appendToFile(filePath,data);
    s3Ops.updateFileInS3(filePath, callbackFn)
   

}

async function deleteFile(request,callbackFn){
   s3Ops.deleteFile(callbackFn);
}


module.exports = {
    storeData,
    appendData,
    deleteFile
}