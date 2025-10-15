import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: tsparser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            semi: ['warn', 'always'],
            'prefer-const': 'off',
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': ['warn'],
            'no-console': 'off',
            'no-undef': 'off',
        },
    },
    {
        ignores: ['build/', 'node_modules/'],
    },
];
