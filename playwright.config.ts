import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Directory containing the test files */
  testDir: './tests',
  
  /* Pattern for test files */
  testMatch: '**/*.spec.ts',
  
  /* Maximum time one test can run for */
  timeout: 30 * 1000,
  
  /* Run tests in files in parallel */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  reporter: process.env.CI ? 'blob' : 'html',
  
  // /* Reporter to use */
  // reporter: [
  //   ['html'],
  //   ['list'] // Adds a list reporter for CLI output
  // ],
  
  /* Shared settings for all the projects below */
  use: {
    /* Base URL to use in actions like `await page.goto('/')` */
    baseURL: 'https://api.restful-api.dev',

    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
    
    /* Maximum time each action such as `click()` can take */
    actionTimeout: 10000,
    
    /* Whether to ignore HTTPS errors */
    ignoreHTTPSErrors: true
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'API Tests',
      testMatch: /.*\.spec\.ts/,
      use: {
        /* Collect API response data */
        extraHTTPHeaders: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      },
    }
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});