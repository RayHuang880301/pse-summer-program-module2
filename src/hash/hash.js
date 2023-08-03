const crypto = require("crypto");
const poseidon = require("poseidon-encryption");

// SHA-256
const data = "This is some data X.";
const sha256Hash = crypto.createHash("sha256").update(data).digest("hex");
console.log("sha256Hash", sha256Hash);

// Poseidon
const inputs = [1, 2, 3, 4];
const poseidonHash = poseidon.poseidon(inputs);
console.log("poseidonHash", poseidonHash);
