module.exports = {
    Query: {
        users: (_, { userId }, { dataSources }) => dataSources.ud.getUsersWithClients(userId),
			
		devices: (_, { deviceId }, { dataSources }) => dataSources.dd.getDevicesWithGroups(deviceId),
    },
	User: {
    customer: (parent) => ({
      cust_id: parent.id,
      name: parent.name,
      email: parent.email
    })},
	Device: {
    deviceGroup: (parent) => ({
      dev_id: parent.id,
      name: parent.name,
      type: parent.type
    })}
};