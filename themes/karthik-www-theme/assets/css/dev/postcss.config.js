const themeDir = __dirname + "/../../../";

module.exports = {
  plugins: [
    require("postcss-import")({
      path: [themeDir],
    }),
    require("autoprefixer")({
      grid: true,
    }),
    require("tailwindcss")(themeDir + "assets/css/tailwind.config.js"),
  ],
};
