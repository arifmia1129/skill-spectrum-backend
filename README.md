# Skill Spectrum Web Application

Welcome to the Skill Spectrum Web Application! This web application is designed to showcase a list of courses and their details, as well as provide a user-friendly interface for students to enroll in courses and mark them as completed. It also features advanced state management and user authentication to ensure a secure and efficient learning experience.

## Live Site

You can access the live site of the Skill Spectrum Web Application at [https://skill-spectrum.vercel.app](https://skill-spectrum.vercel.app). Feel free to explore the various features and functionalities.

## Backend

The backend of the Skill Spectrum Web Application is hosted separately and can be accessed at [https://server-skill-spectrum.vercel.app](https://server-skill-spectrum.vercel.app). This backend provides the necessary APIs to retrieve course lists, course details, enroll in courses, and mark courses as completed.

## Postman Documentation

To get a comprehensive understanding of the API endpoints and how to interact with the backend, please refer to the Postman documentation available at [Postman Documentation](https://documenter.getpostman.com/view/21701595/2s9YXiYgfz). This documentation provides clear and concise information on how to use each API endpoint.

## Demo Video

To see the Skill Spectrum Web Application in action, you can watch the demo video at [Demo Video](https://drive.google.com/file/d/1j5T4KKMdMDIvwZJtS-gacZ4zspdw30sH/view?usp=drive_link). The video will walk you through the different screens and functionalities of the application.

## Features

### Frontend

The frontend of the Skill Spectrum Web Application includes the following features:

1. **Course Listing**: View a list of available courses, including basic information and the ability to search for courses based on various criteria.

2. **Course Details**: Access detailed information about a selected course, including course name, instructor, description, enrollment status, duration, schedule, location, prerequisites, and a syllabus.

3. **Student Dashboard**: A user-friendly dashboard for students to display enrolled courses, including course name, instructor name, a thumbnail, due date, and a progress bar. Students can also mark courses as completed.

4. **Advanced State Management**: Utilizes state management with Redux or MobX to manage the application's state effectively.

5. **User Authentication**: Ensures that only authorized students can access the dashboard, enroll in courses, and mark them as completed. API endpoints are secured with authentication and authorization checks.

6. **Pagination**: Implements pagination for the course list API to limit the number of courses returned per request, allowing users to specify the page number and the number of courses per page.

7. **Search Options**: Provides an API endpoint for students to search for courses based on specific criteria, including course name, instructor name, or keywords. Offers advanced search options, such as filtering courses by enrollment status or duration.

### Backend

The backend of the Skill Spectrum Web Application includes the following APIs:

1. **Retrieve Course List API**: Returns a list of sample courses with basic information, including course name and instructor name.

2. **Retrieve API for Course Details**: Provides detailed information about a particular course.

3. **API for Enroll in a Course**: Allows students to enroll in a course by providing their user ID and the course identifier.

4. **Retrieve Enrolled Courses**: Returns a list of courses in which a student is enrolled, including course name, instructor name, a course thumbnail, due date, and progress status.

5. **Mark Courses as Completed**: Enables students to mark a course as completed, ensuring they can only do so for courses in which they are enrolled.

6. **Course Details for Dashboard**: Provides detailed information about a specific course for the student's dashboard, with access controlled by the student's user ID and the course identifier.

## How to Run

To run the Skill Spectrum Web Application locally, follow these steps:

1. Clone the GitHub repository to your local machine.

2. Navigate to the project directory and install the necessary dependencies for both the frontend and backend.

   ```bash
   cd skill-spectrum-app
   npm install
   cd ../skill-spectrum-backend
   npm install
   ```

3. Start the frontend and backend servers.

   For the frontend:

   ```bash
   cd skill-spectrum-app
   npm start
   ```

   For the backend:

   ```bash
   cd skill-spectrum-backend
   npm start
   ```

4. Access the application by opening your web browser and navigating to [http://localhost:5173](http://localhost:5173).
