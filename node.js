const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const bucketName = 'your-s3-bucket-name';

exports.handler = async (event) => {
    const file = event.Records[0].s3.object;
    const fileUrl = `https://${bucketName}.s3.amazonaws.com/${file.key}`;
    
    // Optionally, you can set an expiration for the link
    const signedUrl = s3.getSignedUrl('getObject', {
        Bucket: bucketName,
        Key: file.key,
        Expires: 60 * 60 // 1 hour
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ fileUrl: signedUrl })
    };
};
