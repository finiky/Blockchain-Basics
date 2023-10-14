const SHA256 = require("crypto-js/sha256");
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }
  calculateHash = () => {
    return SHA256(
      `${this.index}${this.previousHash}${this.timestamp}${JSON.stringify(
        this.data
      )}`
    ).toString();
  };
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenisis()];
  }
  createGenisis = () => {
    const genesisBlock = new Block(
      0,
      new Date().toDateString(),
      "Genisis Block",
      "0"
    );
    return genesisBlock;
  };

  getLatestBlock = () => {
    return this.chain[this.chain.length - 1];
  };
  addBlock = (newBlock) => {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  };
  isChainValid = () => {
    for (let i = 1; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].calculateHash()) {
        return false;
      }
      if (this.chain[i].previousHash !== this.chain[i - 1].hash) {
        return false;
      }
    }
    return true;
  };
}

const ajcoin = new BlockChain();
ajcoin.addBlock(new Block(1, new Date().toDateString(), { amount: 4 }));
ajcoin.addBlock(new Block(2, new Date().toDateString(), { amount: 50 }));
console.log(ajcoin.chain);
console.log(ajcoin.isChainValid());
