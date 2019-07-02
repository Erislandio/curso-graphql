const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  #! pontos de entranda da sua api!
  type Query {
    ola: String
    hora: String
  }
`;

const resolvers = {
  Query: {
    ola() {
      return "Olá Bom dia";
    },
    hora() {
      return `${new Date()}`;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log(`Executando em ${url}`);
});
