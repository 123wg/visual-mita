module.exports = {
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {
      fix: true, // boolean (default: true)
      // files: '', // string | [string] (default: ['src/**/*.{vue,htm,html,css,sss,less,scss}'])
    },
  },
  productionSourceMap: false,
  css: {
    loaderOptions: {
      sass: {
        // cli4.2lastest data-->prependData
        prependData: `
            @import "@/assets/style/gloable.scss";
        `,
      },
    },
  },
};
