<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your Account Credentials</title>
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
        <h2>Your Account Credentials</h2>
        <p>Dear {{ $user->first_name }}</p>
        <p>Welcome to Gado and Jess Jalandoni Scholarship Project</p>
        <p>We're thrilled to have you on board. Below are your account credentials:</p>
        <ul>
            <li>Email Address: {{ $user->email_address }}</li>
            <li>Password: {{ $plainPassword }}</li>
        </ul>

        <p>Please keep these credentials secure and do not share them with anyone. If you have any questions or encounter any issues, feel free to reach out to our support team.</p>
        <p>We're excited to see you start using [Your Company/Platform Name]!</p>
        <p>Best regards,<br>
        Christian Medallada<br>
        Gado and Jess Jalandoni Scholarship Project</p>
        tianmeds.business@gmail.com</p>
    </div>
</body>
</html>

