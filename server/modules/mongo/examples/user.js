/* EXAMPLES for mongoose modules */

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- general*/

/* Require the module */
let mongoUser = require('./server/modules/mongo/user');

/* Create a new user */
let user = mongoUser.createNewUser('anne123', '12345');

/* Print the fields of the newly created user */
console.log(user.username);
console.log(user.password);

/* Apply functions to the newly created user */
console.log(user.debugPrinting());

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- mongoUser.saveUser */

/* Save the user to the database */
mongoUser.saveUser(user)
    .then(function(user) {
        console.log(user.debugPrinting());
    })
    .catch(function(err) {
        console.log('Error occurred while saving to the database');
    });

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- mongoUser.find */

/* Retrieve 1 user from the database */
mongoUser.find({username: 'anne123'})
    .then(function(user) {
        console.log(user.debugPrinting());
    })
    .catch(function(err) {
        console.log('No element in the database meets the search criteria');
    });

/* Retrieve 1 user from the database with multiple search criteria */
mongoUser.find({username: 'anne123', password: '12345'})
    .then(function(user) {
        console.log(user.debugPrinting());
    })
    .catch(function(err) {
        console.log('No element in the database meets the search criteria');
    });

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- mongoUser.findMultiple */

/* Retrieve multiple users from the database with multiple search criteria */
mongoUser.findMultiple({username: 'anne123', password: '12345'})
    .then(function(users) {
        for (let i = 0; i < users.length; i++) {
            console.log(users[i].debugPrinting());
        }
    })
    .catch(function(err) {
        console.log('No element in the database meets the search criteria');
    });

/* Retrieve multiple users from the database with multiple search criteria. Throws error */
mongoUser.findMultiple({username: 'anne123', password: '12345'})
    .then(function(users) {
        for (let i = 0; i < users.length; i++) {
            console.log(users[i].debugPrinting());
        }
    })
    .catch(function(err) {
        console.log('No element in the database meets the search criteria');
    });

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- mongoUser.removeUser */

/* Remove the first entry from the database matching the search criteria */
mongoUser.removeUser({username: 'anne123'})
    .then(function() {
        console.log('User removed');
    })
    .catch(function(err) {
        console.log('No element in the database meets the deletion criteria');
    });

/* ------------------------------------------------------------------------------------------------------------------ */
/* user.js -- mongoUser.removeMultiple */

/* Removes all entries from the database matching the search criteria */
mongoUser.removeMultiple({username: 'anne123'})
    .then(function() {
        console.log('Users removed');
    })
    .catch(function(err) {
        console.log('No element in the database meets the deletion criteria');
    });

/* Clears the database */
mongoUser.removeMultiple({})
    .then(function() {
        console.log('Database cleared');
    })
    .catch(function(err) {
        console.log('No element in the database meets the deletion criteria');
    });
