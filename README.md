# 🚀 App Automation for Instagram

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Tech](https://img.shields.io/badge/tech-stack-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

> 💬 Automate Instagram DMs and comments to boost customer engagement for your business.  
> 🎯 Designed for SMEs and marketing teams looking for efficiency without losing personalization.

---

## 🧭 Overview

**App Automation for Instagram** is an intelligent web application that automates replies to Instagram DMs and comments based on predefined **keywords** and smart **AI-powered responses**.

This solution helps:

- Manage **high volumes of messages** from customers.
- Provide **fast and personalized** replies.
- Improve **customer satisfaction and sales conversions**.



---

## ✨ Key Features

- 🤖 **Auto Response**  
  Automatically reply to DMs or comments containing specific keywords.

- 🧠 **AI Chat Integration**  
  Natural and human-like conversations powered by AI (OpenAI or Dialogflow).

- 🔗 **Instagram Account Integration**  
  Seamless connection with Instagram Business accounts via OAuth 2.0.

- 📊 **Interactive Dashboard**  
  Monitor and manage automation activities with a user-friendly interface.

- 🔧 **Trigger Management**  
  Create, update, and delete keyword-based triggers for auto-responses.

---

## 👥 Target Users

This app is ideal for:

- 🏪 **Business Owners** (especially SMEs)
- 📞 **Customer Support Staff**
- 📣 **Marketing Teams**
- 👨‍💻 **Developers & Project Managers**

---

## 💻 Tech Stack

| Layer        | Technology                                 |
| ------------ | ------------------------------------------ |
| **Frontend** | React.js                                   |
| **Backend**  | Next.js (Fullstack Framework)              |
| **Database** | PostgreSQL & Prisma                        |
| **Auth**     | Clerk                                      |
| **API**      | Instagram Graph API, OpenAI API            |


---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/muhammadwildanskyyy/auto-mention.git
```

### 2. Install Dependencies
Navigate into the project folder and install required packages:

```bash
cd your-project-folder
npm install
```

### 3. Configure Environment Variables
Create a .env file in the root directory and fill it with the necessary credentials:

```bash
DATABASE_URL=
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=
STRIPE_SUBSCRIPTION_PRICE_ID=
STRIPE_CLIENT_SECRET=
NEXT_PUBLIC_HOST_URL=
INSTAGRAM_BASE_URL=
INSTAGRAM_EMBEDDED_OAUTH_URL=
redirect_uri=
INSTAGRAM_CLIENT_ID=
INSTAGRAM_CLIENT_SECRET=
INSTAGRAM_TOKEN_URL=
OPEN_AI_KEY=
```

### 4. Run the Development Server
Start the development
```bash
npm run dev
```
### 5. Expose Local Server with ngrok
To allow Instagram Webhooks to reach your local server, use ngrok:
```bash
ngrok http://localhost:3000
```
### 6. Access the App
Open your browser and visit:

```bash
http://localhost:3000
```
