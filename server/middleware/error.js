var errorList = require('../errors.json');

module.exports = function(req, res, next) {
    res.success = function(view, results) {
        res.render(view, Object.assign( res.locals,results ) );
    };
    res.error = function(code, text) {
        res.sendStatus(errorList[code] ? errorList[code].code : errorList[404].code);
        res.render('error', {
            code: errorList[code] ? errorList[code].code : errorList[404].code,
            message: errorList[code] ? errorList[code].message : errorList[404].message,
            text: text
        });
    };
    next();
};