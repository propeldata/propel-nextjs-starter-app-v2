# Propel Next.js Starter App

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app), integrated with Propel's UI Kit to create a sample dashboard.

## Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- A Propel account with access to the necessary credentials

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/propeldata/propel-nextjs-starter-app-v2.git && cd propel-nextjs-starter-app-v2
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Copy the `.env.sample` file to `.env.local`:
     ```bash
     cp .env.sample .env.local
     ```
   - Open `.env.local` and fill in your Propel credentials:
     ```
     CLIENT_ID=your_client_id
     CLIENT_SECRET=your_client_secret
     TOKEN_HOST=https://auth.us-east-2.propeldata.com
     TOKEN_PATH=/oauth2/token
     ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Features

- OAuth2 authentication with Propel
- Sample dashboard with filters, time range picker, and various charts
- Responsive design using Radix UI

## Learn More

To learn more about the technologies used in this project, check out the following resources:

- [Next.js documentation](https://nextjs.org/docs)
- [Propel documentation](https://www.propeldata.com/docs)
- [Radix UI documentation](https://www.radix-ui.com/docs/primitives/overview/introduction)

## Customization

You can start customizing the app by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Support

If you encounter any issues or have questions about this starter app, please [open an issue](https://github.com/your-repo/propel-next-js-starter-app/issues) in this repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.