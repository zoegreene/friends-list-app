const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;

const db = new Sequelize('postgres://localhost/friendslist', {
  logging: false
});

const Friend = db.define('friend', {
  name: {
    type: STRING,
    allowNull: false
  },
  rating: {
    type: INTEGER,
    defaultValue: 5
  }
});

module.exports = {
  db, Friend
};
