### README.md

This repository contains the source code for a Backend Developer Task: 10Xers, built using Express.js.

---

## Explanation video: https://www.loom.com/share/aed1ee03f4804547954037170711cac6?sid=edd5ff42-6694-45c2-b6e3-d3f4d78f6661

---

ERD Diagram:
![Alt text](https://github.com/neuthos/10xers-backend-test/blob/master/erd.png?raw=true)

---

You can access the Postman documentation through this link: [Postman Documentation](https://documenter.getpostman.com/view/14405527/2sA3JGgPo5)

Alternatively, you can download and import it yourself using the following file:

```
./Mobile Phone Store.postman_collection.json
```

---

#### Requirements

- Node.js (minimum version: 16)
- npm (Node Package Manager)

#### Installation

1. Clone the repository to your local machine:

   ```
   git clone https://github.com/neuthos/10xers-backend-test.git
   ```

2. Navigate to the project directory:

   ```
   cd 10xers-backend-test
   ```

3. Install dependencies:

   ```
   npm install
   ```

4. Change your development database config at `src/configs/config.json`:

5. Run migration and seeder with:

   ```
   npm run init-data
   npm run undo-data (to undo)
   ```

#### Configuration

1. Create a `.env` file in the root directory of the project.
2. Add the following configurations to the `.env` file:
   ```
   ACCESS_TOKEN_SECRET=[Access token hashing secret]
   PORT=3000
   ```

#### Running the Application in Development Mode

To start the Express server, run the following command:

```
npm run dev
```

The server will start on port 3000 by default. You can access the application by navigating to `http://localhost:3000` in your web browser.

#### Project Structure

- `index.js`: Main entry point of the application.
- `src/routes`: Contains route handlers for different endpoints.
- `src/controllers`: Contains controller logic for each route.
- `src/services`: Contains service files for handling business logic and data manipulation.
- `src/models`: Contains database models.
- `src/configs`: Contains configuration files.

#### Testing

To run tests, use:

```
npm run test
```
