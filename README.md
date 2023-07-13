# Job Listings Web Application

This is a web application that displays job listings. Users can filter the jobs by type and sort them by publication date. The application fetches job data from an API and provides a user-friendly interface to view and interact with the job listings.

## Features

- Filter job listings by type (All, Full-time, Part-time).
- Sort job listings by publication date in ascending or descending order.
- Display job title, type, description, and publication date.


## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>


2. Install the dependencies:

   ```bash
   npm install
   ```

  ## Run the Project 
1. To run the project in a local host, use the following command:

    ```bash
    npm run dev
    ```

## Testing

The application includes unit tests and integration tests to ensure the correctness of its functionality. The tests are written using the Jest testing framework and the React Testing Library.

The test results will be displayed in the console, indicating whether the tests pass or fail.


   ```bash
   npm run test
   ```
    




## Technologies Used

- React: JavaScript library for building user interfaces.
- Axios: Promise-based HTTP client for making API requests.
- Mock Service Worker: Mocking library for intercepting and mocking API requests during development.
- Tailwind CSS: Utility-first CSS framework for styling the UI.
- Jest and React Testing Library: Testing frameworks for unit and integration testing.

## Folder Structure

- src/: Contains the source code for the application.
- pages/: Reusable React components used in the application.
- mocks/: Mock server setup for intercepting API requests during development.
- api/: API service for fetching job data.
- index.tsx: Main entry point for the application.
- public/: Static assets and the HTML template for the application.
- build/: Generated optimized production build files.
