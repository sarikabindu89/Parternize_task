const { defineConfig } = require("cypress");


module.exports = defineConfig({
   
  e2e: {
    baseUrl:"https://prestashop.ryviushop.com",
    specPattern:"cypress/e2e/**/*.feature",

  
    // prefix async
    async setupNodeEvents(on, config) {
      const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild').createEsbuildPlugin
      const createBundler = require('@bahmutov/cypress-esbuild-preprocessor')

      // await here
      await require('@badeball/cypress-cucumber-preprocessor').addCucumberPreprocessorPlugin(on, config)

      on('file:preprocessor',   createBundler({
        plugins: [createEsbuildPlugin(config)],
      }));

      // return any mods to Cypress
      return config
    },
  
  env:{
    productname:"Blouse"

  }
}
   
})
