const crypto = require("crypto");

// Asymmetric encryption
const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
});

// Encrypt
const plaintext = "This is a secret message.";
const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(plaintext));
console.log("encrypted", bufferToBytes32(encrypted));

// Decrypt
const decrypted = crypto.privateDecrypt(privateKey, encrypted);
console.log("decrypted", decrypted.toString());

// Create a digital signature
const sign = crypto.createSign("SHA256");
sign.update(plaintext);
sign.end();
const signature = sign.sign(privateKey);
console.log("signature", bufferToBytes32(signature));

// Verify a digital signature
const verify = crypto.createVerify("SHA256");
verify.update(plaintext);
verify.end();
const isVerified = verify.verify(publicKey, signature);
console.log("isVerified", isVerified);

function bufferToBytes32(buffer) {
  return "0x" + buffer.toString("hex").padStart(64, "0");
}
