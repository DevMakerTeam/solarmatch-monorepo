module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "next/core-web-vitals",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  plugins: ["prettier", "unused-imports", "@typescript-eslint"],
  rules: {
    "prettier/prettier": "error",
    // 사용하지 않는 import 제거
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "no-unused-vars": "off", // TypeScript가 처리하므로 비활성화
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
    // React UMD 글로벌 오류 비활성화
    "@typescript-eslint/no-undef": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/triple-slash-reference": "off",
    // 필요시 규칙 추가
  },
};
