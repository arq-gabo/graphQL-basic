"use strict";

const connectDb = require("./db");
const { ObjectID } = require("mongodb");

module.exports = {
	// Create Course
	createCourse: async (root, { input }) => {
		const defaults = {
			teacher: "",
			topic: ""
		};

		const newCourse = Object.assign(defaults, input);
		let db;
		let course;

		try {
			db = await connectDb();
			course = await db.collection("courses").insertOne(newCourse);
			newCourse._id = course.insertedId;
		} catch (error) {
			console.log(error);
		}
		return newCourse;
	},

	// Create Student
	createStudent: async (root, { input }) => {
		let db;
		let student;

		try {
			db = await connectDb();
			student = await db.collection("students").insertOne(input);
			input._id = student.insertedId;
		} catch (error) {
			console.log(error);
		}
		return input;
	},

	// Edit Course
	editCourse: async (root, { _id, input }) => {
		let db;
		let course;

		try {
			db = await connectDb();
			await db
				.collection("courses")
				.updateOne({ _id: ObjectID(_id) }, { $set: input });
			course = await db.collection("courses").findOne({ _id: ObjectID(_id) });
		} catch (error) {
			console.log(error);
		}
		return course;
	},

	// Edit Student
	editStudent: async (root, { _id, input }) => {
		let db;
		let student;

		try {
			db = await connectDb();
			await db
				.collection("students")
				.updateOne({ _id: ObjectID(_id) }, { $set: input });
			student = await db.collection("students").findOne({ _id: ObjectID(_id) });
		} catch (error) {
			console.log(error);
		}
		return student;
	},

	// Delete Course
	deleteCourse: async (root, { _id }) => {
		let db;
		let deleteId;
		try {
			db = await connectDb();
			deleteId = await db.collection("courses").findOne({ _id: ObjectID(_id) });
			await db.collection("courses").deleteOne({ _id: ObjectID(_id) });
		} catch (error) {
			console.error(error);
		}
		return `Course ${deleteId._id} was deleted`;
	},

	// Delete Student
	deleteStudent: async (root, { _id }) => {
		let db;
		let deleteId;
		try {
			db = await connectDb();
			deleteId = await db
				.collection("students")
				.findOne({ _id: ObjectID(_id) });
			await db.collection("students").deleteOne({ _id: ObjectID(_id) });
		} catch (error) {
			console.log(error);
		}
		return `Student ${deleteId.name} was deleted`;
	}
};
