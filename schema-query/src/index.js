const { ApolloServer, gql } = require("apollo-server");
const { importSchema } = require("graphql-import");

const usuarios = [
  {
    id: 1,
    nome: "Erislandio",
    email: "erislandio.soares@gmail.com",
    idade: 24,
    salario_real: 3300.1,
    vip: false
  },
  {
    id: 2,
    nome: "Erislandio Soares",
    email: "erislandio.soares@gmail.com",
    idade: 24,
    salario_real: 3300.1,
    vip: false
  },
  {
    id: 3,
    nome: "Erislandio Silva",
    email: "erislandio.soares@gmail.com",
    idade: 24,
    salario_real: 3300.1,
    vip: false
  }
];

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

      return produto.preco;
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
        nome: "Notebook",
        preco: 4899.99,
        desconto: 0
      };
    },
    numerosMegaSena() {
      const crescente = (a, b) => a - b;
      //   const removeDuplicados = (a, b) => a != b;
      return Array(6)
        .fill(0)
        .map(n => parseInt(Math.random() * 60 + 1))
        .sort(crescente);
    },
    usuarios() {
      return usuarios;
    },
    usuario(_, args) {
      console.log(_);
      return usuarios.find(usuario => {
        return usuario.id == args.id;
      });
    }
  }
};

const server = new ApolloServer({
  typeDefs: importSchema('./schema/index.graphql'),
  resolvers
});

server.listen(4000).then(({ url }) => {
  console.log(`Executando em ${url}`);
});
