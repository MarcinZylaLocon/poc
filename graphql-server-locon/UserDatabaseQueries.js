const { SQLDataSource } = require("datasource-sql");

class UserDatabase extends SQLDataSource {
    getUsersWithClients(userId) {
        return this.knex
            .select("usr.id as user_id", "*")
            .from("User AS usr")
            .join("Customer AS cus ", "usr.customerId", "cus.id")
           .where("usr.id", "=", userId);
    }
}

class DeviceDatabase extends SQLDataSource {
	getDevicesWithGroups(deviceId) {
        return this.knex
            .select("d.deviceId as device_id", "*")
            .from("Device AS d")
            .join("DeviceGroup AS dg ", "d.customerId", "dg.customerId")
           .where("d.deviceId", "=", deviceId);
    }
}

module.exports = { UserDatabase, DeviceDatabase };