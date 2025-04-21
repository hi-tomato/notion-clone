import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    rules: {
      "no-var": "error",
      "prefer-const": "error",

      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "prefer-arrow-callback": "error",
      "no-useless-constructor": "error",

      "no-unused-expressions": "error",
      "no-unreachable": "error",
      "no-duplicate-imports": "error",
      "no-undef": "error",
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
