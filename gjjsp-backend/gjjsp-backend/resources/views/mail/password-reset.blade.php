<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Password Reset</title>
    <style>
        /* Define your email styles here */
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 8px;
            background-color: #f9f9f9;
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        ul {
            list-style-type: none;
            padding: 0;
        }
        li {
            margin-bottom: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Password Reset Notification</h2>
        <p>Dear {{ $user->first_name }}</p>
        <p>We receive a password reset request for your Scholarlink Account. To reset your password open the application and enter the following token:</p>

            <p>Your Password Reset Token: {{ $resetPasswordToken }}</p>

        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Thank you for using Scholarlink</p>
        <p>Best regards,<br>
        Christian Medallada<br>
        Gado and Jess Jalandoni Scholarship Project</p>
        tianmeds.business@gmail.com</p>
    </div>
</body>
</html>

