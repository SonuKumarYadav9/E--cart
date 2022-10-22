const aws = require('aws-sdk')

aws.config.update({
    accessKeyId: "AKIAY3L35MCRZNIRGT6N",
    secretAccessKey: "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",
    region: "ap-south-1"
});

let uploadFile = async(file) => {
    return new Promise(function(resolve, reject) {

        let s3 = new aws.S3({ apiVersion: "2006-03-01" })

        var uploadParams = {
            ACL: "public-read",         // access control list
            Bucket: "classroom-training-bucket",
            Key: "Sonu/" + file.originalname,
            Body: file.buffer
        }
        s3.upload(uploadParams, function(err, data) {
            if (err) {
                return reject({ "error": err })
            }

            return resolve(data.Location)
        })
    })      
};

module.exports = { uploadFile }



// profileImage = await uploadFile(files);

//PROMISE;-It is a object which represents intermediate state of operation which wiil guaranty us that 
//it will give us some result in future or (it will be colpleted in future)

// CALLBACK ;-A "callbak" function is function that is passed as an agument for 
// another function and to be called back at later time


//First class function ;- when function in that language are treated as like any other variable


//* old AWS CONFIGURATION SETUP 

// const aws = require('aws-sdk')

// aws.config.update({
//     accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//     secretAccessKey: "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",
//     region: "ap-south-1"
// })

// let uploadFile = async(file) => {
//     return new Promise(function(resolve, reject) {

//         let s3 = new aws.S3({ apiVersion: "2006-03-01" })

//         var uploadParams = {
//             ACL: "public-read",
//             Bucket: "classroom-training-bucket",
//             Key: "Sonu/" + file.originalname,         // name of img
//             Body: file.buffer   // main file
//         }

// //  same as jwt.verify, while uploading  if any err give arr  

//         s3.upload(uploadParams, function   (err, data) {                     
//             if (err) {
//                 return reject({ "error": err })
//             }

//             return resolve(data.Location)  // data obj h and location is key we are returning location..    returning to promise 
//         })
//     })
// }

// module.exports = { uploadFile }

