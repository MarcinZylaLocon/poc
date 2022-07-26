module.exports = {
    Query: {
        user: (_, { userId }, { dataSources }) => dataSources.ud.getUsersWithClients(userId),
        users: (_, { userIds }, { dataSources }) => dataSources.ud.getUsers(userIds),
		devices:  async (_, { deviceIds }, { dataSources }) => {
			const devi = await dataSources.dd.getDevicesWithGroups(deviceIds);
			return devi;
			
			},
		combo: async (_, { deviceIds }, { dataSources }) => {
			const comboData = [];
			
			const devicesResp = await dataSources.dd.getDevicesWithGroups(deviceIds);

			const userIds = devicesResp.map(dr => dr.userId);
			const usersResp = await dataSources.ud.getUsers(userIds);
		
			devicesResp.forEach(comboDevice => {
				const comboUser = usersResp.find(thisUser => thisUser.user_id == comboDevice.userId && thisUser.customerId == comboDevice.customerId);
				
				const usedKeys = comboData.map(dr => dr.device_id);
				if(usedKeys.indexOf(comboDevice.device_id) === -1){
				comboData.push({
					device_id: comboDevice.device_id,
					comboDevice,
					comboUser
				})}
			});
			return comboData;
		},
    },
	User: {
    customer: (parent) => ({
      cust_id: parent.id,
      name: parent.name,
      email: parent.email
    })},
	Device: {
    deviceGroup: (parent) => ({
      devicegroup_id: parent.id,
      name: parent.name,
      type: parent.type
    })},
	// Combo: {
    // comboDevice: (parent) => ({
      // device_id: parent.id,
      // firstname: parent.name,
      // lastname: parent.type
    // }),
	// comboUser: (parent) => ({
      // user_id: parent.id,
      // username: parent.name,
      // password: parent.type
    // })
	// }
};