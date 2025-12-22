import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
]);

export default eslintConfig;
