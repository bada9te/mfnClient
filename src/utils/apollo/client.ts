import { ApolloClient, HttpLink } from "@apollo/client";
import cache from "./cache";
import {cfg} from "@/config";

// http
const httpLink = new HttpLink({
    uri: `${cfg.serverBase}/graphql`,
    credentials: 'include'
});

const client = new ApolloClient({
    link: httpLink,
    cache,
    connectToDevTools: true
});

export default client;