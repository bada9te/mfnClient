import { ApolloClient, HttpLink, split } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import cache from "./cache";

// http
const httpLink = new HttpLink({
    uri: `${process.env.REACT_APP_SERVER_BASE}/graphql`,
    credentials: 'include'
});

// ws
const wsLink = new GraphQLWsLink(createClient({
    url: `${process.env.REACT_APP_WS_SERVER_BASE}/subscriptions`,
}));

// split link
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

export default new ApolloClient({
    link: splitLink,
    cache,
    connectToDevTools: process.env.REACT_APP_VERSION_TYPE === "development"
});