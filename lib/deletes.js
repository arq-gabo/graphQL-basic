"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");

module.exports = {
	// Delete Course
	deleteCourse: async (root, { _id }) => {
		let db;
		try {
			db = await connectDb();
			await db.collection("courses").delete({ _id: ObjectID(_id) });
		} catch (error) {
			console.error(error);
		}
	}
};
