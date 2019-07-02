const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  #! pontos de entranda da sua api!

  scalar Date

  type Usuario {
    id: ID!
    nome: String!
    email: String!
    idade: Int
    salario: Float
    vip: Boolean
  }

  type Produto {
    nome: String!
    preco: Float!
    desconto: Float
    precoComDesconto: Float
  }

  type Query {
    ola: String
    hora: Date
    usuarioLogado: Usuario
    produtoEmDestaque: Produto
  }
`;

const resolvers = {
  Usuario: {
    salario(usuario) {
      return usuario.salario_real;
    }
  },
  Produto: {
    precoComDesconto(produto) {
      if (produto.desconto) {
        const descontoTotal = produto.preco * (1 - produto.desconto);
        return parseFloat(descontoTotal).toFixed(2);
      }

      return 0
    }
  },
  Query: {
    ola() {
      return "Olá Bom dia";
    },
    hora() {
      return `${new Date()}`;
    },
    usuarioLogado() {
      return {
        id: 1,
        nome: "Erislandio",
        email: "erislandio.soares@gmail.com",
        idade: 24,
        salario_real: 3300.1,
        vip: false
      };
    },
    produtoEmDestaque() {
      return {
        nome: "Notbook",
        preco: 4899.99,
        desconto: 0.20
      };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen(4000).then(({ url }) => {
  console.log(`Executando em ${url}`);
});
