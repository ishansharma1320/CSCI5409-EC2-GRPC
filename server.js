const path = require('path');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const grpcMethods = require("./modules/grpcMethods");
const PROTO_PATH = path.join(__dirname,'protobufs','EC2Operations.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const computeAndStoragePkg = grpc.loadPackageDefinition(packageDefinition).computeandstorage;



(()=>{
    const server = new grpc.Server();
    server.addService(computeAndStoragePkg.EC2Operations.service, { StoreData: grpcMethods.storeData,AppendData: grpcMethods.appendData, DeleteFile: grpcMethods.deleteFile });
    server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(),(err, port) => {
        if (err) {
          console.log(err)
        } else{
            console.log('gRPC server started on port 50051');
            server.start();
        }
        
      });
  
   
})();


