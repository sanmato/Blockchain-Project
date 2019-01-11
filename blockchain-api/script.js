const SHA256 = require('crypto-js/sha256')

class Block {
    constructor(index, data, previousHash = '') {
        this.index = index;
        this.date = new Date();
        this.data = data;
        this.previousHash = previousHash;
       this.hash = this.createHash();
        this.nonce = 0;
    }

    createHash() {
        return SHA256(this.index + this.date + this.data + this.previousHash + this.nonce).toString();
    }

    mine(difficulty) {
        while(!this.hash.startsWith(difficulty)) {
            this.nonce++;
            this.hash = this.createHash();
        }
    }
}

class BlockChain {
    constructor(genesisBlock, difficulty = '0') {
        this.chain = [this.createFirstBlock(genesisBlock)];
        this.difficulty = difficulty;
    }
    createFirstBlock(genesisBlock) {
        return new Block(0, genesisBlock);
    }
    getLastBlock() {
        return this.chain[this.chain.length-1]
    }
    addBlock(data) {
        let previousBlock = this.getLastBlock();
        let block = new Block(previousBlock.index +1, data, previousBlock.hash);
        block.mine(this.difficulty);
        console.log('mined! '+block.hash+'nonce in: '+block.nonce);
        this.chain.push(block);
    }
    isValid() {
        for(let i = 1; i < this.chain.length; i++) {
            let previousBlock = this.chain[i-1];
            let currentBlock = this.chain[i];

            if(currentBlock.previousHash != previousBlock.hash) 
                return false;
            if(currentBlock. createHash() != currentBlock.hash)
                return;
        }
        return true;
    }
}

// block = new Block(0, 'prueba');
// console.log(JSON.stringify(block, null, 2));

chain = new BlockChain('genesis block', '0000');
chain.addBlock('second block');
chain.addBlock('third block');
console.log(JSON.stringify(chain.chain, null, 2));
// console.log(chain.isValid());