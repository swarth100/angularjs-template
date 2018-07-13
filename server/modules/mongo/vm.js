/* Database Management for VM Objects */

/* ------------------------------------------------------------------------------------------------------------------ */

let mongoose = require('mongoose');
let helper = require('./mongoose');

/* Load the database address from the config file
 * Removes the double quotation mark using replace function
 */
/*let dbConfig = 'mongodb://' +
  process.env.DB_USER + ':' +
  process.env.DB_PASS + '@' +
  process.env.DB_HOST + ':' +
  process.env.DB_PORT; */
let dbConfig = 'mongodb://' +
  process.env.DB_HOST + ':' +
  process.env.DB_PORT;

let uniqueValidator = require('mongoose-unique-validator');

console.log(dbConfig);

/* Connect to mongoDB database */
let Schema = mongoose.Schema;
let databaseName = process.env.VM_DB_NAME;
mongoose.Promise = global.Promise;
let database = mongoose.createConnection(dbConfig + databaseName);

// TODO: Add validation

/* Handling connection errors */

database.on('error', console.error.bind(console, 'Cannot connect to database ' + databaseName + '.'));
database.once('open', function() {
    console.log('[DB ACTIVE]: ' + databaseName);
});

/* ------------------------------------------------------------------------------------------------------------------ */

/* Setters for the fields */

let vmSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    owner: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    bootTime: {
        type: String,
    },
    stats: {
        type: String,
    },
});

/* Plugin that validates unique entries */
vmSchema.plugin(uniqueValidator);

/* Helper methods on the vmSchema */

/* Prints the fields of a VM
* Parameters:
*   none
* Returns:
*   none */
vmSchema.methods.debugPrinting = function() {
    return 'name: ' + this.name + ', owner: ' + this.owner + ', description: ' + this.description +
        ', status: ' + this.status + ', bootTime ' + this.bootTime;
};

/* Pre save function [AUTORUN]
 * Used to initialise fields upon saving
 * */
vmSchema.pre('save', function(next) {
    // TODO: Handle checks before invoking next
    // Next can be invoked with an error to make it cascade through
    // i.e. new Error('something went wrong')
    next();
});

/* ------------------------------------------------------------------------------------------------------------------ */

let VMModel = database.model('VM', vmSchema);

/* Creates and returns a new database entry
* Parameters:
*   n = name
*   e = email
*   p = password
* Returns:
*   new VMModel instance */
exports.createNew = function(n, o) {
    return new VMModel({
        name: n,
        owner: o,
    });
};

/* Saves the current Vm onto the DB
 * Parameters:
 *   vm
 * Returns:
 *   Promise */
exports.save = function(vm) {
    return helper.saveHelper(vm);
};

/* Retrieves one Vm from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.find = function(p) {
    return helper.findHelper(VMModel, p);
};

/* Retrieves multiple VMs from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.findMultiple = function(p) {
    return helper.findMultipleHelper(VMModel, p);
};

/* Removes a single VM from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.remove = function(p) {
    return helper.removeElem(VMModel, p);
};

/* Removes multiple VMs from the DB
 * Parameters:
 *   Search parameters : { name : 'Anne' }
 * Returns:
 *   Promise */
exports.removeMultiple = function(p) {
    return helper.removeMultipleHelper(VMModel, p);
};

/* ------------------------------------------------------------------------------------------------------------------ */
/* Custom Functions */

/* Updates the description for a given VM */
exports.updateDescription = function(vm, description) {
  let query = {
    'description': description,
  };

  let cond = {
    'name': vm.name,
  };

  return helper.updateHelper(VMModel, cond, query);
};

/* Export the User model *
exports.userModel = User;
*/
