"use strict";

module.exports = {
  input: ["./src/**/*.ts", "./src/**/*.tsx"], // Glob patterns to match your source code files.
  output: "./",
  options: {
    lngs: ["ru", "uz", "en"],
    debug: false,
    resource: {
      loadPath: "public/locales/{{lng}}.json",
      savePath: "public/locales/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    func: {
      list: ["t"], // This should match the function you use for translations in your code (e.g., 't' or 'i18n.t').
      extensions: [".ts", ".tsx"],
    },
    trans: false, // You don't need to provide translations in this configuration.
  },
};
