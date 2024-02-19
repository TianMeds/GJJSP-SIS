<!DOCTYPE html>
<html lang="en">
<body>
    
    <div class="container">
        <h2>Scholar Data Update</h2>
        <p>Dear {{ $user->first_name }}</p>
        <p>Your scholar profile has been updated. Here are the details of the changes:</p>

        <ul>
            @foreach($updatedFields as $field => $value)
                <li>{{ $field }}</li>
            @endforeach
        </ul>

        <p>If you have any questions or encounter any issues, feel free to reach out to our support team.</p>
        <p>Best regards,<br>
        Christian Medallada<br>
        Gado and Jess Jalandoni Scholarship Project</p>
    </div>
</body>
</html>