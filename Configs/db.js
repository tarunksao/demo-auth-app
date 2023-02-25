require('dotenv').config();
const {connect} = require('mongoose');

const dbConnect = connect(process.env.DB_URL);

module.exports = {
    dbConnect
};