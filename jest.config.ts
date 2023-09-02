export default {
    // Configura o Jest para testes no Node.js
    // usando Typescript.
    preset: "ts-jest", // Seta que que é um projeto desenvolvido em typescript
    testEnvironment: "node", // Seta que é um teste específico de backend
    transform: {
        ".+\\.ts$": ["ts-jest",{ isolatedModules: true }] // Transforma tudo que é typescript com jest durante os testes
    },
    // Informa em qual diretório os testes
    // estarão contidos.
    roots: ["<rootDir>/tests"], // Seta a paste que será usada como root para os testes
    // Configurações de cobertura de código.
    collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["\\\\node_modules\\\\"],
};