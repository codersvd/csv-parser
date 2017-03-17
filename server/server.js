delete process.env["DEBUG_FD"];

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const fileUpload = require('express-fileupload');
const configWebpack = require('./../webpack.config');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const mongoose = require('mongoose');
const fs = require('fs');
const mongooseSession = require('mongoose-session');
const MongoStore = require('connect-mongo')(expressSession);
const ejs = require("ejs-locals");
const config = require("./config.json");

let compiler = webpack(configWebpack);
app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: configWebpack.output.publicPath,
    stats: {
        colors: true,
        chunks: false, // this reduces the amount of stuff I see in my terminal; configure to your needs
        'errors-only': true
    }
}));
app.use(require('webpack-hot-middleware')(compiler));


app.set('trust proxy', true);
app.set('json spaces', config.app.jsonSpaces || 0);
app.engine('ejs', ejs);
app.set('view engine', 'ejs');
app.use(fileUpload({safeFileNames: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": false}));
app.use(require("./middleware/error"));

mongoose.Promise = global.Promise;
mongoose.connect(config.mongodb.app).then((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Mongo db conneted");
});

app.listen(config.app.port, 'localhost', function (err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Listening at http://localhost:' + config.app.port);
});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////


let userModel = require("./models/UsersModel");

app.post('/upload', (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }

    let file = __dirname + '/upload/file.csv';
    let csv = req.files.csv;
    csv.mv(file, function (err) {
        if (err) {
            return res.status(500).send(err);
        }

        takeCsv(file, res);
    });
});

function takeCsv(fileName, res){
    let fs = require('fs'),
        readline = require('readline'),
        instream = fs.createReadStream(fileName),
        outstream = new (require('stream'))(),
        rl = readline.createInterface(instream, outstream);

    rl.on('line', function (line) {
        let data = line.split(",");
        let firstname = data[0];
        let surname = data[1];
        let email = data[2];

        userModel.create({
            firstname,
            surname,
            email
        }, (err, doc)=>{
            if(err) console.log(err);
            console.log(firstname + ";" + surname +";" + email);
        });

    });

    rl.on('close', function (line) {
        console.log(line);
        console.log('done reading file.');
        res.send('File uploaded and done reading file.');
    });
}