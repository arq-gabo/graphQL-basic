"use strict";

const connectDb = require("./db");

module.exports = {
	createCourse: async (root, { input }) => {
		const defaults = {
			teacher: "",
			topic: ""
		};

		const newCourse = Object.assign(defaults, input);
		let db;
		let course;

		console.log(newCourse);

		try {
			db = await connectDb();
			course = await db.collection("courses").insertOne(input);
			input._id = course.insertedId;
		} catch (error) {
			console.log(error);
		}
		return input;
	}
};
