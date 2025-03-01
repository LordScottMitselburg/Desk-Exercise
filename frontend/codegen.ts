import type { CodegenConfig } from '@graphql-codegen/cli';



const config: CodegenConfig = {
  overwrite: true,
  schema: {
    'http://localhost:8000/graphql': {
    },
  },
  documents: ['src/**/*.tsx', 'src/**/*.ts'],
  generates: {
    'src/generated/': {
      preset: 'client',
      presetConfig: {
        persistedDocuments: true,
      },
    },
  },
};

export default config;
