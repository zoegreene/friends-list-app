const Sequelize = require("sequelize")
const { STRING, INTEGER } = Sequelize
const databaseUrl =
	process.env.DATABASE_URL || "postgres://localhost/friendslist"

const db = new Sequelize(databaseUrl, {
	logging: false,
})

const Friend = db.define("friend", {
	name: {
		type: STRING,
		allowNull: false,
		//[PK] unique?
	},
	rating: {
		type: INTEGER,
		defaultValue: 5,
	},
})

module.exports = {
	db,
	Friend,
}
