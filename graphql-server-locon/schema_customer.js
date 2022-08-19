const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        user_id: ID
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
	type Device {
        device_id: ID
		customerId: Int
		userId: Int
		caregiverGroupId: Int
		adminGroupId: Int
        firstname: String
        lastname: String
		deviceGroup: DeviceGroup
    }
    type DeviceGroup {
        devicegroup_id: ID
		customerId: Int
		userId: Int
        name: String
        type: String
    }
	type Combo {
		device_id: ID
        comboDevice: Device
        comboUser: User
	}
    type Query {
        user(userId: ID!): [User]
        users(userIds: [ID!]): [User]
        devices(deviceIds: [ID!]): [Device]
        combo(deviceIds: [ID!]): [Combo]
    }
`;

module.exports = typeDefs;