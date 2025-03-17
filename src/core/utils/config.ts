const config = {
  APP_NAME: "CSEC",
  MODE: {
    PROD: import.meta.env.PROD,
  },
  API_ROOT: import.meta.env.VITE_BASE_URL,
  DEFAULT_LANG_CODE: "uz",
};

export default config;
