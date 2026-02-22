/**
 * Title: config.js
 * Authors: Professor Krasso, Ben Hilarides, Mariea Nies
 * Date: 2/21/26
 */

'use strict'

// Declare the database object
const db = {
    username: 'taskFlo_user', // This is the username for the database
    password: 's3cret', // This is the password for the database
    name: 'taskFlo' // This is the name of the database in MongoDB
}

// Declare the config object
const config = {
    port: 3000, // This is the default port for MongoDB
    dbUrl: `mongodb+srv://${db.username}:${db.password}@bellevueuniversity.qvr6m2e.mongodb.net/${db.name}?appName=BellevueUniversity`,
    dbname: db.name // This is the name of the database in MongoDB
}

module.exports = config // Expose the config as a module