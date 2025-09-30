# 🥭 SubManGo
 ```                                                                                         
  _________    ___.       _____                  ________        
 /   _____/__ _\_ |__    /     \ _____    ____  /  _____/  ____  
 \_____  \|  |  \ __ \  /  \ /  \\__  \  /    \/   \  ___ /  _ \ 
 /        \  |  / \_\ \/    Y    \/ __ \|   |  \    \_\  (  <_> )
/_______  /____/|___  /\____|__  (____  /___|  /\______  /\____/ 
        \/          \/         \/     \/     \/        \/        
```


-----



### Smart Subscription Management API built with Node.js

Never miss a subscription renewal again\! **SubManGo** is a smart, automated API that tracks your subscriptions and sends timely email reminders before renewal dates.

-----

### 📸 Project Overview

SubManGo provides a complete backend solution for managing recurring payments and subscriptions. It's built with a robust architecture to ensure reliability and ease of use.

#### **System Architecture**

API → Backend (Node.js/Express) → MongoDB → Email Workflow (Nodemailer)

#### The Problem

  * 💸 Surprise charges from forgotten subscriptions.
  * 📅 No centralized tracking of renewal dates.
  * 📧 Manual reminder systems are unreliable.

#### The Solution

SubManGo provides a RESTful API that solves these problems by:
✅ Automatically calculating renewal dates.
✅ Scheduling and sending email reminders via cron jobs.
✅ Validating subscription data in real-time.
✅ Managing subscriptions through simple API calls.

-----

### ✨ Key Features

#### 1\. Easy Subscription Creation

Add a subscription with just the service name, price, and billing cycle. The system handles the rest, automatically calculating the next renewal date.

#### 2\. Smart Validation

The API performs real-time validation for:

  * **Currency formats** (e.g., USD, EUR, INR).
  * **Billing cycles** (monthly, quarterly, yearly).
  * **Price ranges** and data types.

#### 3\. Automated Email Reminders

Cron jobs automatically check for upcoming renewals daily and send timely email notifications via Nodemailer, handling multiple subscriptions efficiently.

#### 4\. RESTful API Design

Clean, intuitive API endpoints following REST best practices for easy integration into any application.

-----

### 🛠️ Tech Stack

| Category        | Technology          |
| --------------- | ------------------- |
| **Runtime** | Node.js             |
| **Framework** | Express.js          |
| **Database** | MongoDB             |
| **Email Service** | Nodemailer (SMTP)   |
| **Background Jobs**| Node-cron           |
| **Deployment** | Render              |
| **Validation** | Express-validator   |

-----

### 🚀 Getting Started
```
Everything here can be customised
```

#### Prerequisites

  * Node.js 16+ and npm
  * MongoDB (local or MongoDB Atlas)
  * SMTP email credentials (Gmail is recommended)

#### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/yaswanthnaidu-yalla/SubManGo.git
    cd SubManGo
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up environment variables:

    ```bash
    cp .env.example .env
    # Edit .env with your configuration
    ```

    **Required Environment Variables:**

    ```
    # MongoDB Configuration
    MONGODB_URI=mongodb://localhost:27017/submango

    # Email Configuration (Gmail SMTP example)
    SMTP_HOST=smtp.gmail.com
    SMTP_PORT=587
    SMTP_USER=your-email@gmail.com
    SMTP_PASSWORD=your-app-password
    EMAIL_FROM=your-email@gmail.com

    # Server & Cron Configuration
    PORT=8080
    REMINDER_DAYS_BEFORE=7
    CRON_SCHEDULE='0 9 * * *'  # Runs daily at 9 AM
    ```

#### Start the Server

  * **Development mode** (with nodemon):
    ```bash
    npm run dev
    ```
  * **Production mode:**
    ```bash
    npm start
    ```

The API will be available at `http://localhost:8080`.

-----

### 📚 API Documentation

#### Base URL

  * **Local:** `http://localhost:8080/api/v1`
  * **Production:** `https://submango.onrender.com/api/v1` (Replace with your own URL)

#### Endpoints

##### `POST /api/v1/subscriptions` - Create a Subscription

```json
{
  "service_name": "Netflix",
  "price": 9.99,
  "currency": "USD",
  "billing_cycle": "monthly",
  "start_date": "2025-10-01"
}
```

**Response (201 Created):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "service_name": "Netflix",
    "price": 9.99,
    "currency": "USD",
    "billing_cycle": "monthly",
    "start_date": "2025-10-01T00:00:00.000Z",
    "next_renewal": "2025-11-01T00:00:00.000Z",
    "reminder_scheduled": true,
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-01T10:00:00.000Z"
  },
  "message": "Subscription created successfully"
}
```

##### `GET /api/v1/subscriptions` - Get All Subscriptions

**Response (200 OK):**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "service_name": "Netflix",
      "price": 9.99,
      "currency": "USD",
      "billing_cycle": "monthly",
      "next_renewal": "2025-11-01T00:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "service_name": "Spotify",
      "price": 5.99,
      "currency": "USD",
      "billing_cycle": "monthly",
      "next_renewal": "2025-10-15T00:00:00.000Z"
    }
  ],
  "count": 2
}
```

##### `GET /api/v1/subscriptions/:id` - Get a Single Subscription

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "service_name": "Netflix",
    "price": 9.99,
    "currency": "USD",
    "billing_cycle": "monthly",
    "start_date": "2025-10-01T00:00:00.000Z",
    "next_renewal": "2025-11-01T00:00:00.000Z",
    "reminder_scheduled": true,
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-01T10:00:00.000Z"
  }
}
```

##### `PUT /api/v1/subscriptions/:id` - Update a Subscription

```json
{
  "price": 12.99,
  "billing_cycle": "yearly"
}
```

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "service_name": "Netflix",
    "price": 12.99,
    "currency": "USD",
    "billing_cycle": "yearly",
    "next_renewal": "2026-10-01T00:00:00.000Z"
  },
  "message": "Subscription updated successfully"
}
```

##### `DELETE /api/v1/subscriptions/:id` - Delete a Subscription

**Response (200 OK):**

```json
{
  "success": true,
  "message": "Subscription deleted successfully"
}
```

**Error Response Format:**

```json
{
  "success": false,
  "error": {
    "message": "Subscription not found",
    "statusCode": 404
  }
}
```

-----

### 🧪 Testing

  * **Run all tests:** `npm test`
  * **Run tests with coverage:** `npm run test:coverage`

**Test API with cURL:**

```bash
# Create subscription:
curl -X POST http://localhost:8080/api/v1/subscriptions \
  -H "Content-Type: application/json" \
  -d '{
    "service_name": "Netflix",
    "price": 9.99,
    "currency": "USD",
    "billing_cycle": "monthly",
    "start_date": "2025-10-01"
  }'

# Get all subscriptions:
curl http://localhost:8080/api/v1/subscriptions
```

-----

### 📁 Project Structure

```
SubManGo/
├── src/
│   ├── config/                # DB & email config
│   ├── controllers/           # Request handlers
|   ├── database/              # Databse
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API routes
│   ├── utils/                 # Validators & date calculators
│   ├── middleware/            # Error handling & validation
├── .env.example               # Environment template
├── app.js
├── package.json
└── README.md
```

-----

### 🎯 How It Works

#### Subscription Creation Flow

1.  **Request Received:** A `POST` request is sent to the API.
2.  **Data Validation:** Express-validator ensures the data is valid (correct currency, billing cycle, price, etc.).
3.  **Renewal Date Calculation:** The system calculates the `next_renewal` date based on the `start_date` and `billing_cycle`.
4.  **Database Storage:** The new subscription is saved to MongoDB.
5.  **Response Sent:** A success response is returned to the client with the subscription details.

#### Email Reminder System

1.  **Cron Job:** A daily cron job runs at a scheduled time (default 9 AM).
2.  **Find Renewals:** It queries the database for subscriptions with a `next_renewal` date in the next `REMINDER_DAYS_BEFORE` days.
3.  **Send Emails:** For each found subscription, an email is composed and sent using Nodemailer.
4.  **Status Update:** The `reminder_sent` status is updated to prevent duplicate emails.

**Cron Job Code Example:**

```javascript
// Runs daily at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  const subscriptions = await findUpcomingRenewals(7); // 7 days ahead
  
  subscriptions.forEach(async (sub) => {
    await sendReminderEmail(sub);
    console.log(`Reminder sent for ${sub.service_name}`);
  });
});
```

-----

### 🔧 Configuration Options

#### Billing Cycles Supported

```javascript
const BILLING_CYCLES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
};
```

#### Supported Currencies

```javascript
const SUPPORTED_CURRENCIES = [
  'USD', 'EUR', 'GBP', 'INR', 'CAD', 
  'AUD', 'JPY', 'CNY', 'CHF', 'SEK'
];
```

#### Email Reminder Schedule

  * **Default:** 7 days before renewal
  * **Configurable via:** `REMINDER_DAYS_BEFORE` environment variable
  * **Cron schedule:** `CRON_SCHEDULE` environment variable

-----

### 🐛 Known Issues

None at the moment\! 🎉 If you find any bugs, please open an issue on the repository.

-----

If you found this project helpful, please ⭐ star the repository
