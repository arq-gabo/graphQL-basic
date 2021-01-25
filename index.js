'use strict'

const { graphql, buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()
const port = process.env.PORT || 3000

//definiendo el esquema

const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

// Configurar los resolvers
const resolvers = {
    hello: () => {
        return 'Hola Mundo!!!'
    },
}

app.use('/api', graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
}))

app.listen(port, () => {
    console.log(`Server on listening at http://localhost:${port}/api`)
})