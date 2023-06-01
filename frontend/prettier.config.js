const prettierSortConfig = {
  importOrder: [
    '^react',
    '^next',
    '<THIRD_PARTY_MODULES>',
    '^@mui',
    '',
    '^domain/(.*)$',
    '^infrastructure/(.*)$',
    '^application/(.*)$',
    '^[./]',
  ],
  // 'importOrderBuiltinModulesToTop': true,
  importOrderCaseInsensitive: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderMergeDuplicateImports: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderSortSpecifiers: true,
};

module.exports = {
  trailingComma: 'all',
  semi: true,
  singleQuote: true,
  singleAttributePerLine: true,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  htmlWhitespaceSensitivity: 'css',
  jsxSingleQuote: false,
  bracketSameLine: false,
  proseWrap: 'never',
  quoteProps: 'preserve',
  tabWidth: 2,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  pluginSearchDirs: false,
  tailwindFunctions: ['clsx', 'cva'],

  ...prettierSortConfig,
};
