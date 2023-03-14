// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');


// eslint-disable-next-line prefer-destructuring
const Account = mongoose.model('Account', {
    username: {
        type: String,    
        required: true,
    },
    account_type: {
        type: String,
        required: true,
    }
}, 'Account');


module.exports = {
    Account
}

