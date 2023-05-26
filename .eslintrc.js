module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'eslint-plugin-import-helpers'],
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "no-magic-numbers": "off",
    "@typescript-eslint/no-magic-numbers": "error",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@app/',
          '/^@domain/',
          '/^@domain-core/',
          '/^@infra/',
          '/^@main/',
          '/^@presentation/',
          '/^@usuario/',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: { order: 'asc', ignoreCase: true },
      },],
    "@typescript-eslint/no-extraneous-class": "warn",
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/explicit-function-return-type": "warn",
    "@typescript-eslint/member-ordering": "warn",   
  },
  overrides: [
    {
      files: ["**/*.spec.ts", "**/*.dto.ts"],
      rules: {
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-magic-numbers": "off",
      },
    },
    {
      files: ["**/*.module.ts"],
      rules: {
        "@typescript-eslint/no-extraneous-class": "off"
      },
    },
    {
      files: ["main.ts"],
      rules: {
        "@typescript-eslint/no-floating-promises": "off"
      },
    },
    {
      files: ["**/*.strategy.ts", "validation.pipe.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-call": "off"
      },
    },
    {
      files: ["validation.pipe.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-return": "off",
        "@typescript-eslint/no-unsafe-argument": "off",
        "@typescript-eslint/no-unsafe-member-access": "off"
      },
    },
    {
      files: ["validation.pipe.ts", "logger.interceptor.ts"],
      rules: {
        "@typescript-eslint/no-unsafe-assignment": "off",
      },
    },
    {
      files:["**/*.decorator.ts"],
      rules:{
        "@typescript-eslint/explicit-function-return-type": "off"
      }
    }
  ],
};
