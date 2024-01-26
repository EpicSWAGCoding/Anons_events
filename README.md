
# Announcement - Description of the project

The Announcement project is a final qualification work (WRC) and is an information system designed to manage and organize events in an educational university environment. The system covers various aspects of planning, registration and participation in events, ensuring effective communication between participants.

Technologies and tools
The project is being developed using technology:

- Next.js: For building scalable and efficient web applications.
- MongoDB and Mongoose: For storing and managing data related to events and participants.
- React and React Hook Form: To create a dynamic and interactive user interface.
- Stripe: To provide a payment system and registration for paid events.
- Tailwind CSS: To style the user interface with a convenient approach to creating an adaptive design.
- Zod: For data validation and security when processing user input.
## Project structure
The main components of the project are distributed as follows:
- `/app:` Here are the main files and the structure of the application itself, such as routing, configurations and basic logical components.
- `/components:` This folder contains React components that are used in various parts of the application and components of the shadcn-ui package
- `/constans:` The folder contains files with constants used in various parts of the project.
- `/lib:` This folder contains the main tools for working with the database: sending queries, uploading images, database models, validation
- `/public:` This folder contains static files such as images, fonts, or other resources that should be accessible directly from the browser.
- `/types:` There are files with TypeScript types for the project. They provide static typing for the code, which improves the readability and security of the application.
## Installation

1. Clone a repository:
```bash
git clone https://github.com/your_username/your_project.git
cd your_project
```
2. Install dependencies:
```bash
npm install   # или yarn install
```
3. Launch a project:
```bash
npm start   # или yarn start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file

`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
`CLERK_SECRET_KEY`
`NEXT_PUBLIC_CLERK_SIGN_IN_UR`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL=`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`
`MONGODB_URI`
`WEBHOOK_SECRET`
`UPLOADTHING_SECRET`
`UPLOADTHING_APP_ID`
`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
`STRIPE_SECRET_KEY`
`STRIPE_WEBHOOK_SECRET`
`NEXT_PUBLIC_SERVER_URL`


## Demo

![hero_image](https://github.com/EpicSWAGCoding/Anons_events/blob/main/public/hero_image.png?raw=true)

[Demo live](https://anons-events.vercel.app/)
## Feedback

If you have any feedback, please reach out to us at i@epicswag123.ru


## Authors

- [@EpicSWAG](https://github.com/EpicSWAGCoding)

