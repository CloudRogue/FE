// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';

const eslintConfig = defineConfig([
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  eslintConfigPrettier,
]);

export default eslintConfig;
