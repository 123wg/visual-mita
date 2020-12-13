module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // 暂时注释 不习惯标签换行  'plugin:vue/recommended' // essential,
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
parserOptions: {
    ecmaVersion: 2020,
  },
  globals: {
    Konva: false,
    gifler: false,
    SuperGif:false,
    vm:false,
    CONFIG:false
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'class-methods-use-this': 'off',
    'max-len': ['error', { code: 100000 }],
    'vue/html-indent': ['error', 4],
    "no-param-reassign": 0,
    "@typescript-eslint/no-this-alias": ["off"],
    camelcase: 'off',
    '@typescript-eslint/camelcase': 0,
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
