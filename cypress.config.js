const { defineConfig } = require("cypress");
const cypressOnFix = require('cypress-on-fix');



module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions:{
    reportDir:'cypress/reporters',
    charts:true,
    embeddedScreenshots:true,
    debug:true


  },
  
   
  e2e: {
    baseUrl:"https://prestashop.ryviushop.com",
    specPattern:"cypress/e2e/**/*.feature",
    projectId: "9ea613",


  // prefix async
    async setupNodeEvents(on, config) {
      on = cypressOnFix(on);


      require('cypress-mochawesome-reporter/plugin')(on);

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

  },
},
});
   
