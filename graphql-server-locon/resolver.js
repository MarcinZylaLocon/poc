module.exports = {
    Query: {
        users: (_, { userId }, { dataSources }) =>
            dataSources.ud.getUsersWithClients(userId),
    },
	User: {
    customer: (parent) => ({
      cust_id: parent.id,
      name: parent.name,
      email: parent.email
    }),
	}
};