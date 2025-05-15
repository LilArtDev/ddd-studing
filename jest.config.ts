import { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Usa ts-jest para transpilar arquivos TS
  testEnvironment: 'node', // Ambiente de teste Node.js
  moduleDirectories: ['node_modules', 'src'], // Permite resolver módulos em node_modules e src
  transform: {
    '^.+\\.ts$': 'ts-jest' // Transforma arquivos TS usando ts-jest
  },
  testMatch: ['**/*.test.ts'], // Local dos arquivos de teste
};

export default config;