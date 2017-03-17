let fs = require('fs');
let readline = require('readline');

module.exports = {
    read: function(filename,callback) {
        fs.exists(filename, callback);
    },
    readline: function(filename, callback){
        let instream = fs.createReadStream(filename);
        let outstream = new (require('stream'))();
        let rl = readline.createInterface(instream, outstream);

        rl.on('line', callback);
    }
};