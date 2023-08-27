
const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = path.join(__dirname, 'protobufs', 'EC2Operations.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
});

const ec2OpsService = grpc.loadPackageDefinition(packageDefinition).computeandstorage;

const client = new ec2OpsService.EC2Operations('0.0.0.0:50051', grpc.credentials.createInsecure());

function makeStoreRequest() {
  return new Promise((resolve,reject)=>{
    const request = { data: 'Hello, server!' };

    client.StoreData(request, (error, response) => {
      error ? reject(error.message) : resolve({s3uri: response.s3uri})
    });
  })
}

function makeAppendRequest() {
  return new Promise((resolve,reject)=>{
    const request = { data: 'Hello, server Append!' };

    client.AppendData(request, (error, response) => {
      error ? reject(error.message) : resolve('Appended');
    });
    })
}

function makeDeleteRequest() {
  return new Promise((resolve,reject)=>{
    const request = { s3uri: 'abababa' };

    client.DeleteFile(request, (error, response) => {
      error ? reject(error.message) : resolve('Deleted');
    });
    })
}

(async ()=>{
    let resp = await makeStoreRequest();
    console.log(resp)
    resp = await makeAppendRequest();
    console.log(resp)
    resp = await makeDeleteRequest();
    console.log(resp)
})()