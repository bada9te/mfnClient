import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: "http://localhost:8000/graphql",
    documents: "./app/utils/graphql-requests/*.ts",
    generates: {
        'src/utils/graphql-requests/generated/schema.ts': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        },
    },
};

export default config;