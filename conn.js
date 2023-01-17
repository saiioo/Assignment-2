const mongoose = require("mongoose");
async function getConnection() {
    await mongoose.connect('mongodb://localhost/site');
}

module.exports = getConnection;