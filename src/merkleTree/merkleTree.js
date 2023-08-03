const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");
const whitelistJSON = require("./whitelist");

function getMerkle(whiteList) {
  const leafs = whiteList.map((addr) => keccak256(addr));
  return new MerkleTree(leafs, keccak256, { sortPairs: true });
}
const whitelistMerkleTree = getMerkle(whitelistJSON);
console.log("merkle", bufferToBytes32(whitelistMerkleTree));

const root = whitelistMerkleTree.getRoot();
console.log("root", bufferToBytes32(root));

function getProof(address) {
  const leaf = keccak256(address);
  return whitelistMerkleTree.getProof(leaf).map((p) => bufferToBytes32(p.data));
}
console.log("proof", getProof("0xdab15510af1425ba57499C2284cf420001A24D00"));

function verify(address) {
  const leaf = keccak256(address);
  const proof = getProof(address);
  return whitelistMerkleTree.verify(proof, leaf, root);
}
console.log("verify", verify("0xdab15510af1425ba57499C2284cf420001A24D00"));

function bufferToBytes32(buffer) {
  return "0x" + buffer.toString("hex").padStart(64, "0");
}
