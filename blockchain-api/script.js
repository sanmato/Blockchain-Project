const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.createHash();
    }

    createHash() {
        return SHA256(this.index + this.date + this.data).toString();
    }
}

class BlockChain {
    constructor(genesisBlock) {
        this.chain = [this.createFirstBlock(genesisBlock)];
    }
    createFirstBlock(genesisBlock) {
        return new Block(0, genesisBlock);
    }
    createLastBlock() {
        return this.chain[this.chain.length-1]
    }
}

block = new Block(0, 'prueba');
console.log(JSON.stringify(block, null, 2));