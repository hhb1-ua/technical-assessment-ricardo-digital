# assessment-ricardo
Technical assessment for Ricardo Digital
***

## Requirements
Create a user interface using JavaScript, consisting of multiple screens that are synchronized with each other. The application will manage a list of companies and users, allowing CRUD (Create, Read, Update, Delete) operations on both.

### Screens:
* List of Companies
    * Display a list of companies.
    * Provide access to the CRUD operations for companies.
* CRUD Companies
    * Create, Read, Update, and Delete companies.
    * Display a list of users associated with each company.
* List of Users
    * Display a list of users.
    * Provide access to the CRUD operations for users.
* CRUD Users
    * Create, Read, Update, and Delete users.
    * Display the company each user belongs to.

### Rules:
* Ensure all information is synchronized between different screens.
* Each company should display its associated users.
* Each user should display the company they belong to.
* The list of fields for each screen is up to you and will be evaluated.
* The functionality you introduce will be evaluated.
* Workflows and page logic will be evaluated.

### Technical Requirements:
* Implement the application using React and TypeScript.
* Use Lint and Prettier for code formatting and linting.

### Backend Mock:
* Use json-server to create a mock backend.
* Provide a db.json file to serve as the mock database.
* Ensure the mock server supports CRUD operations for both companies and users.

### Extra Points (Optional):
* Use a UI framework (preferably PrimeReact).
* Use a request/query client (e.g., React Query).
* Implement routing with React Router.

### Evaluation Criteria:
* Code Quality:
    * Adherence to best practices in React and TypeScript.
    * Proper use of Lint and Prettier.
    * Clean, readable, and maintainable code.
* Functionality:
    * Correct implementation of CRUD operations.
    * Synchronization between different screens.
    * Usability and user experience.
* Bonus Points:
    * Effective use of UI frameworks.
    * Integration of React Query or similar for data fetching and state management.
    * Seamless navigation using React Router.

### Submission:
* Provide a link to a public repository (e.g., GitHub) containing your solution.
* Include instructions on how to set up and run your application, including the mock backend.
* Ensure the repository includes a README file with an overview of your approach and any assumptions made.

## Solution

### Running the application
* To set up the application, simply download the repo and install the dependencies using ```npm install```.
* To run the application, first start the mock backend using ```npm run api``` (ensure that json-server is installed in your machine). Then, run the actual application using ```npm run dev``` (this will execute it in developer mode).

### Extra points
* I've implemented the interface using PrimeReact components.
* I've used Axios as a request client.
* I've implemented routing using ReactRouter.

### Additional functionality
* The data sent to the API is previously sanitized using Zod, which allows data validation.
* I've written unit tests that can be executed using ```npm run test```.