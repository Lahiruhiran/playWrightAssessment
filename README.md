# API Testing with Playwright

This project contains automated API tests for the [restful-api.dev](https://restful-api.dev/) REST API using Playwright.

## Project Structure

```
src/
├── api/                # API client methods
│   └── objects.api.ts
├── data/              # Test data and providers
│   └── providers/
│       └── object.provider.ts
├── types/             # TypeScript interfaces
│   ├── request.types.ts
│   └── response.types.ts
└── utils/             # Helper functions
    └── assertions.ts
tests/
└── api.spec.ts     # Test specifications
```

## Test Coverage

The test suite covers the following scenarios:

1. Getting a list of all objects
   - Validates response structure
   - Ensures non-empty list
   - Verifies object properties

2. Creating a new object
   - Validates successful creation
   - Verifies object structure
   - Confirms data matches input

3. Retrieving a single object
   - Gets object by ID
   - Validates object properties
   - Verifies data consistency

4. Updating existing objects
   - Updates object properties
   - Validates response
   - Confirms changes applied

5. Deleting objects
   - Removes object
   - Verifies deletion
   - Checks 404 after deletion

6. Error handling
   - Get Non-existent object
   - Delete Non-existent object

## Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

## Running Tests

### Run all tests:
```bash
npm test
```

### Run specific test file:
```bash
npx playwright test tests/api.spec.ts
```

## Test Report

After running the tests, you can find the HTML report in the `playwright-report` directory. Open `playwright-report/index.html` in your browser to view the detailed test results.