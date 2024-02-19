<!DOCTYPE html>
<html lang="en">
<body>
    
    <div class="container">
        <h2>Update Scholar Profile</h2>
        <p>Dear {{ $user->first_name }}</p>
        <p>The following fields of the scholar profile for {{ $scholar->user_first_name }} have been updated:</p>
        <ul>
            @foreach ($updatedFields as $key => $value)
                <li>{{ $key }}: {{ $value }}</li>
            @endforeach
        </ul>

        <p>If you have any questions or encounter any issues, feel free to reach out to our support team.</p>
        <p>Best regards,<br>
        Christian Medallada<br>
        Gado and Jess Jalandoni Scholarship Project</p>
    </div>
</body>
</html>