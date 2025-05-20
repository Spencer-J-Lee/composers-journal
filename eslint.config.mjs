import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginImport from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    files: ["src/**/*.{js,ts,jsx,tsx}"],
    plugins: {
      import: eslintPluginImport,
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      // Handle unresolved/duplicate imports
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      // Turn off ESLint's import order to use simple-import-sort
      "import/order": "off",

      // Import sorting rules
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Side effect imports
            ["^\\u0000"],
            // Node.js built-ins
            ["^node:"],
            // Packages (React, etc.)
            ["^react", "^@?\\w"],
            // Aliased internal imports
            ["^@/"],
            // Relative imports
            ["^\\./", "^\\.\\./"],
            // Style imports
            ["\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",

      "max-len": [
        "warn",
        {
          code: 100,
          comments: 80,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreRegExpLiterals: true,
        },
      ],
    },
  },
];

export default eslintConfig;
