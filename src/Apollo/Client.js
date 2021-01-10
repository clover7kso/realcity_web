import { ApolloClient, InMemoryCache } from "@apollo/client";
import { defaults, resolvers } from "./LocalState";
const cache = new InMemoryCache();

export default new ApolloClient({
  cache: cache,
  uri:
    process.env.NODE_ENV === "development"
      ? "http://localhost:4000"
      : "https://prismagram-backend.herokuapp.com",
  clientState: {
    defaults,
    resolvers,
  },

  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
