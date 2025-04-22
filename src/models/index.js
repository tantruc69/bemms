const User = require('./user');
const Link = require('./link');

User.hasMany(Link, { foreignKey: 'user_id' });
Link.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  Link
};
