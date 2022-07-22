const { SQLDataSource } = require("datasource-sql");

class UserDatabase extends SQLDataSource {
    getUsersWithClients(userId) {
        return this.knex
            .select("usr.id as user_id", "*")
            .from("User AS usr")
            .join("Customer AS cus ", "usr.customerId", "cus.id")
           .where("usr.id", "=", 10);
    }
}

module.exports = UserDatabase;