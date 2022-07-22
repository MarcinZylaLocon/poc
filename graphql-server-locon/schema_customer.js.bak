const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        user_id: ID!
        username: String
        password: String
		type: String
		name: String
		customer: Customer
    }
    type Customer {
        cust_id: ID
        name: String
        email: String
    }
    type Query {
        users(userId: ID!): [User]
    }
`;

module.exports = typeDefs;