import { ApolloClient, HttpLink } from "@apollo/client";
import cache from "./cache";

// http
const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_SERVER_BASE}/graphql`,
    credentials: 'include'
});


export default new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: process.env.REACT_APP_VERSION_TYPE === "development"
});