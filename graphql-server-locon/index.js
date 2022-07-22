const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema_customer");
const UserDatabase = require("./UserDatabaseQueries");
const resolvers = require("./resolver");

const knexConfig1 = {
  client: "pg",
  connection: {
    host : 'localhost',
	port : 5432,
	user : 'locon',
	password : 'locon',
	database : 'locon_test_1'
  }
};
const knexConfig2 = {
  client: "pg",
  connection: {
    host : 'localhost',
	port : 5432,
	user : 'locon',
	password : 'locon',
	database : 'locon_test_2'
  }
};

const ud = new UserDatabase(knexConfig2);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
        ud
    }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`);
});