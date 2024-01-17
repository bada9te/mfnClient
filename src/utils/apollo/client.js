import { ApolloClient, HttpLink } from "@apollo/client";
import cache from "./cache";


export default new ApolloClient({
    link: new HttpLink({ uri: `${process.env.REACT_APP_SERVER_BASE}/graphql`, credentials: 'include' }),
    cache,
    connectToDevTools: process.env.REACT_APP_VERSION_TYPE === "development"
});