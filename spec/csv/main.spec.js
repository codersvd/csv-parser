const mongoose = require('mongoose');
const fs = require('fs');
const config = require("./../../server/config.json");
const userModel = require("./../../server/models/UsersModel");
const csv = require("./csv");

describe("Csv test", function() {
    it("file access", function(done) {
        let filename = __dirname+ "/../../server/upload/file.csv";
        csv.read(filename, (data)=>{
            expect(data ? true : false).toBe(true);
            done();
        });
    });
    it("file not access", function(done) {
        let filename = __dirname+ "/../../server/upload/file2.csv";
        csv.read(filename, (data)=>{
            expect(data ? true : false).toBe(false);
            done();
        });
    });

    it("check data", function(done) {
        let filename = __dirname+ "/../../server/upload/file.csv";
        csv.readline(filename, (line)=>{
                let data = line.split(",");
                expect(data.length === 3).toBe(true);
                done();
        });
    });
});

/*describe("Main test", function() {

    it("mongodb connect", function(done) {
        var result;
        mongoose.Promise = global.Promise;
        mongoose.connect(config.mongodbTest.app).then((err) => {
            if (err) {
                result = false;
            }
            result = true;

            return result;
        }).then(res=>{
            expect(res).toBe(true);
            done();
        });
    });

    it("insert a user into DB ", function(done){
        let random = Math.random();
        let user = {firstname: "userName"+random, surname: "surname"+random, email: "user"+random+"@test.com"};
        userModel.create(user, (err, result)=>{
            return result;
        }).then(res => {
            expect(typeof res).toEqual("object");
            done();
        });
    });

    it("select a user from DB ", function(done){
        let user = new userModel();
        userModel.findOne({}, (err,res) => {
            return res;
        } ).then(res=>{
            expect(res).not.toBeNull();
            done();
        });
    });
});*/
