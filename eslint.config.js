import js from "@eslint/js";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-config-prettier";
import reactDom from "eslint-plugin-react-dom";
import reactHooks from "eslint-plugin-react-hooks";
import { reactRefresh } from "eslint-plugin-react-refresh";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
  },

  // ====================
  // Ignore
  // ====================
  globalIgnores(["**/dist/**", "**/build/**", "**/coverage/**", "**/.vite/**"]),

  // ====================
  // App (React + TS)
  // ====================
  {
    files: ["src/**/*.{ts,tsx}"],

    extends: [
      js.configs.recommended,

      // TypeScript
      tseslint.configs.recommendedTypeChecked,

      // React
      reactHooks.configs.flat.recommended,
      reactDom.configs.recommended,
      reactRefresh.configs.vite(),

      // Disable rules that conflict with Prettier
      prettier,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.browser,
      },

      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      // ====================
      // React Refresh
      // ====================
      "react-refresh/only-export-components": "warn",

      // ====================
      // Import sort
      // ====================
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // ====================
      // TypeScript unused
      // ====================
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],

      // ====================
      // Type import
      // ====================
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],

      // ====================
      // Console
      // ====================
      "no-console": ["error", { allow: ["warn", "error"] }],
    },
  },

  // ====================
  // Node (config files)
  // ====================
  {
    files: ["**/*.config.{js,ts}", "e2e/**/*.ts"],

    extends: [js.configs.recommended, tseslint.configs.recommended, prettier],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    plugins: {
      "simple-import-sort": simpleImportSort,
    },

    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "no-console": "off",
    },
  },
]);
