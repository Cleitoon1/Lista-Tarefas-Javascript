const _ = require('lodash');

const ToDo = require('./todo')

ToDo.methods(['get', 'post', 'put', 'delete']);
ToDo.updateOptions({new: true, runValidators: true});



ToDo.after('post', sendErrosOrNext)
ToDo.after('put', sendErrosOrNext);

function sendErrosOrNext(req, res, next) {
    const bundle = res.locals.bundle;
    if(bundle.errors){
        var errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    } else{
        next();
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = [];
    _forIn(nodeRestfulErrors, error => errors.push(error.message));
    return errors;
}

ToDo.route('count', (req, res, next) => {
    Todo.count((error, value) => {
        if(error){
            res.status(500).json({errors: [error]});
        } else {
            res.json({value});
        }
    })
});

module.exports = ToDo;