module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    allowedHosts: "all",
    client: {
      webSocketURL: {
        hostname: "0.0.0.0",
        //pathname: "/ws",
        port: 8080,
      },
    },
  },
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: (config) => {
    config.optimization.minimizer("terser").tap((args) => {
      args[0].terserOptions.output = {
        ...args[0].terserOptions.output,
        comments: false, // exclude all comments from output
      }
      return args
    })
  },
  /*css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/../public/css/__variables.scss";`
      }
    }
  }*/
}
