const Sequelize = require('sequelize')

var db = {}

const sequelize = new Sequelize('postgres://postgres:@localhost:5432/locon_test_2')

let models = [
    require('./customer.js'),
]

// Initialize models
models.forEach(model => {
    const seqModel = model(sequelize, Sequelize)
    db[seqModel.name] = seqModel
})

// Apply associations
Object.keys(db).forEach(key => {
    if ('associate' in db[key]) {
        db[key].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db

export const typeDefs = gql`
    extend type Query {
        cusomers: [Cusomer]
        cusomer(id: ID!): Cusomer
    }
    type Cusomer {
        id: ID!
        name: String
        email: String
    }
`

export const resolvers = {
    Query: {
        cusomers: async () => db.cusomers.findAll(),
        cusomer: async (obj, args, context, info) => db.cusomers.findByPk(args.id),
    },
}