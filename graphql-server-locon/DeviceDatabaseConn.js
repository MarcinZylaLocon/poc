const {Sequelize} = require('sequelize');

const { SQLDataSource } = require("datasource-sql");

const MINUTE = 60;

class DeviceDatabase extends SQLDataSource {
  getDevices() {
    return this.knex
      .select("*")
      .from("device")
      .where({ deviceId: 1 })
      .cache(MINUTE);
  }
}

module.exports = DeviceDatabase;