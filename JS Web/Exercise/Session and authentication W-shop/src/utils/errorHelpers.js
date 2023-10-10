const {MongooseError, Error} = require('mongoose');


exports.extractErrorMsg = (error) =>{
    if(error instanceof Error){
        return Object.values(error.errors)[0].message;
    }else if (error instanceof Object){
        return error.message;
    }
}