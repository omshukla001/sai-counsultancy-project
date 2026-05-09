# Sai Consultancy

A web application for Sai Consultancy — featuring a lead management dashboard, admin login, and a serverless API backend deployed on Vercel.

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js (Vercel Serverless Functions)
- **Database:** MongoDB (via Mongoose)
- **Auth:** JWT (jsonwebtoken)
- **Deployment:** Vercel

## Project Structure

```
├── api/              # Vercel serverless functions
│   ├── _auth.js      # JWT auth middleware
│   ├── _db.js        # MongoDB connection
│   ├── leads.js      # Leads CRUD API
│   └── login.js      # Admin login API
├── public/           # Static frontend files
│   ├── index.html    # Landing page
│   ├── login.html    # Admin login page
│   └── dashboard.html# Leads dashboard
├── .env.example      # Environment variable template
├── vercel.json       # Vercel deployment config
└── package.json
```

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/omshukla001/sai-counsultancy-project.git
   cd sai-counsultancy-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

4. Deploy to Vercel:
   ```bash
   vercel
   ```

## Environment Variables

See `.env.example` for required variables (MongoDB URI, JWT secret, etc.).

## License

MIT
