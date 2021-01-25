'use strict'

const courses = [
    {
        _id: 'anyid1',
        title: 'My title 1',
        teacher: 'Mi profesor',
        description: 'una descripción',
        topic: 'programación'
    },
    {
        _id: 'anyid2',
        title: 'My title 2',
        teacher: 'Mi profesor',
        description: 'una descripción',
        topic: 'programación'
    },
    {
        _id: 'anyid3',
        title: 'My title 3',
        teacher: 'Mi profesor',
        description: 'una descripción',
        topic: 'programación'
    }
]

module.exports = {
    Query: {
        getCourses: () => {
          return courses
        },
        getCourse: (root, args) => {
            const course = courses.filter(course => 
                course._id === args.id)
            return course.pop()
        }
    }
}