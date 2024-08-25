exports.generateInvitationHtml = function(projectName, inviterName, invitationDate, acceptUrl, rejectUrl) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Xcali Project Invitation</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
            .invitation-container {
                background-color: #fff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                width: 100%;
                text-align: center;
            }
            .invitation-container h1 {
                font-size: 24px;
                color: #333;
            }
            .invitation-container p {
                font-size: 16px;
                color: #666;
                margin-bottom: 20px;
            }
            .invitation-container .invitation-details {
                margin: 20px 0;
                text-align: left;
            }
            .invitation-container .invitation-details p {
                margin: 5px 0;
            }
            .invitation-container .buttons {
                display: flex;
                justify-content: space-between;
            }
            .invitation-container .button {
                padding: 10px 20px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 16px;
                text-transform: uppercase;
                width: 48%;
                text-decoration: none;
                display: inline-block;
                text-align: center;
            }
            .accept-btn {
                background-color: #28a745;
                color: #fff;
            }
            .accept-btn:hover {
                background-color: #218838;
            }
            .reject-btn {
                background-color: #dc3545;
                color: #fff;
            }
            .reject-btn:hover {
                background-color: #c82333;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #aaa;
            }
        </style>
    </head>
    <body>
        <div class="invitation-container">
            <h1>Welcome to Xcali!</h1>
            <p>Xcali is a collaborative platform where creativity meets technology. Join forces with like-minded individuals and bring your ideas to life.</p>
            
            <div class="invitation-details">
                <h2>Project Invitation</h2>
                <p><strong>Project Name:</strong> ${projectName}</p>
                <p><strong>Invited by:</strong> ${inviterName}</p>
                <p><strong>Date:</strong> ${invitationDate}</p>
            </div>
            
            <p>You have been invited to collaborate on this project. Would you like to accept the invitation?</p>
            
            <div class="buttons">
                <a href="${acceptUrl}" class="button accept-btn">Accept</a>
                <a href="${rejectUrl}" class="button reject-btn">Reject</a>
            </div>

            <div class="footer">
                <p>© 2024 Xcali. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
