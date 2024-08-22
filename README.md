# Job Search Application

This Job Search Application is a job listing portal where users can search for jobs, view job details, and filter jobs based on different criteria. The application uses React.js for the frontend and provides user authentication, protected routes, and API integration.

## Features

- **User Authentication:** Login system with JWT-based authentication.
- **Protected Routes:** Ensures certain routes are accessible only after user login.
- **Job Listings:** Displays job listings with company logos, job titles, locations, and ratings.
- **Job Details:** Detailed view of each job, including description, skills required, and similar jobs.
- **Search and Filters:** Filter jobs by employment type and salary range, and search for specific job roles.
- **Responsive Design:** Optimized for both desktop and mobile views.

## API Integration
The application interacts with a jobs API to fetch job listings and job details. Ensure that the backend API is running and accessible.

API Endpoint: https://apis.ccbp.in/jobs
Authentication: The application uses JWT tokens for authentication. Ensure that a valid token is stored in the cookies for authorized API requests.


## Components
App.js: Main component that handles routing using react-router-dom.
Login.js: Component for user login functionality.
Home.js: Component that displays the homepage with a link to find jobs.
Jobs.js: Component that handles job listings with search and filter functionalities.
JobItemDetailsRoute.js: Component for displaying job details, including similar jobs.
ProtectedRoute.js: Component that restricts access to certain routes based on user authentication.
Header.js: Component that displays the navigation bar and handles user logout.

## Available Scripts
In the project directory, you can run:

npm start: Runs the app in development mode.
npm test: Launches the test runner.
npm run build: Builds the app for production.


## Technologies Used
React.js: Frontend framework for building the user interface.
React Router: For handling navigation and protected routes.
React Icons: For using icons in the UI.
JS-Cookie: For managing JWT tokens in cookies.
ThreeDots Loader: For displaying a loading spinner during API calls. 

## How to Use
Login: Enter valid credentials to access the job listings.
Find Jobs: Use the search bar and filters to find jobs that match your criteria.
View Job Details: Click on a job listing to view detailed information, including similar jobs.
Logout: Click the logout button in the header to sign out.


## Future Enhancements
Pagination: Add pagination to job listings for better user experience.
User Registration: Implement user registration functionality.
Job Application: Allow users to apply directly to jobs from within the app.
Profile Management: Enable users to update their profile information.
License