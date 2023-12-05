require('../untils/MongoUnil.js');
const Models = require('./module.js');

const AdminDAO = {
  async selectByUsernameAndPassword(username, password) {
    const query = { username: username, password: password };
    const admin = await Models.Admin.findOne({ username: username, password: password });
    return admin;
  }
};
module.exports = AdminDAO;