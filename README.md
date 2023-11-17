**User Dashboard** is a NextJS Application that is built as a part of **Greenie SDE Hiring**. The App has two tabs: 

1. Account Creation
2. User Details 

The User Details tab displays user information fetched from the MongoDB database in a searchable table format, allowing users to search for specific entries.

The Account Creation tab will consist of a form for username and password input. Along with the username, phone, and Name fields. The email and usernames are unique fields. 

The App is hosted on **Vercel** and can be accessible from [https://userdash.vercel.app](https://userdash.vercel.app)

## Tech Stack

**Client:** React, NextJS, TailwindCSS

**Server:** Node

**Database:** MongoDB

## Light House Score 
![Light House Score](https://drive.google.com/uc?id=1cmqlY_UeLo3Aucf9HZNHm7Ojg2tpFSqn)

## Getting Started

### Installation

1. Star and Fork the repo to your account
2. Clone the repo in your local system 

Install required dependencies, using 
```bash
npm install
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file

`MONGO_DB_URI`

`DB_USER`

`DB_COLLECTION`

the `.env.example` is available in the project. Copy the file and rename it to `.env`

## API Reference

#### Get all users

```http
  GET /api/userData
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |

#### Get user (Search)

```http
  GET /api/search?query=${query}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `query`      | `string` | **Required**. query for search |

#### POST user data

```http
  POST /api/userData
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `api_key` | `string` | **Required**. Your API key |
| `userDetails` | `Object` | **Required**. User Data |



## Navigation
| URL | Description                |
| :-------- |  :------------------------- |
| `/dashboard` | this displays all users details |
| `/login` | account creation page |

### Users Details 

The following details are displayed on the user details page: 

1. Username
2. Name
3. Email Address
4. Phone Number
5. Account Creation Date

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Authors

- [@arpitghura](https://www.github.com/arpitghura)

Thank you for reading.
