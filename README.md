# Subscription Management System

This part of the project is all about giving users full control over their subscriptions. No more forgetting renewal dates or getting hit with surprise charges! This system is designed to be smart, secure, and helpful.

# Key Features

**Easy Subscription Creation**: Users can quickly add new subscriptions, providing simple details like the service name, price, and how often they're charged. Our system automatically calculates the next renewal date for them.

**Smart Validation**: The application double-checks all the information entered to make sure it's correct. If you try to enter an invalid currency, for example, it will let you know right away.

**Automated Email Reminders**: Forgetfulness is a thing of the past! As soon as a subscription is created, a workflow is set up to send timely email reminders before the renewal date. This gives users a heads-up so they can decide whether to keep or cancel the subscription.

# Behind the Scenes

The magic happens through our API endpoint. By sending a POST request to the /api/v1/subscriptions endpoint, you can create a new subscription with all the necessary details. This action kicks off the entire process, from saving the data to scheduling the email reminders.
