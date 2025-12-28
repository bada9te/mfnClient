import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8000/graphql",
    documents: "./src/app/utils/graphql-requests/*.ts",
    ignoreNoDocuments: true,
    generates: {
        "./src/app/utils/graphql-requests/generated/schema.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                reactApolloVersion: 4,
                withResultType: true,
                withMutationOptionsType: true,
            }
        },
    },
};

export default config;
