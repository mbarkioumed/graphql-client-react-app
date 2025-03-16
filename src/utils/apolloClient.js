import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://localhost:8080/graphql",
    cache: new InMemoryCache(),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "network-only",
            nextFetchPolicy: "cache-first",
        },
    },
});

export default client;
