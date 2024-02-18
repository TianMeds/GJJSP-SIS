<!DOCTYPE html>
<html lang="en">
<body>
    
    <div class="container">
        <h2>Update Project Partner</h2>
        <p>Dear {{ $user->first_name }}</p>
        <p>Project Partner {{ $previousName }} has been updated to {{ $projectPartner->project_partner_name }} in the system. </p>
        <p>If you have any questions or encounter any issues, feel free to reach out to our support team.</p>
        <p>Best regards,<br>
        Christian Medallada<br>
        Gado and Jess Jalandoni Scholarship Project</p>
    </div>
</body>
</html>