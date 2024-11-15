import { NextResponse } from "next/server";
import ConnectDB from "../../../../lib/config/db";
import EmailModels from "../../../../lib/models/EmailModel";

// Function to validate email format using regex
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export async function POST(request) {
    try {
        // Ensure the database connection is established
        await ConnectDB();

        // Parse the JSON body
        const body = await request.json();
        const email = body.email;

        // Validate the email format
        if (!email || !isValidEmail(email)) {
            return NextResponse.json(
                { message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create a new email entry in the database
        const emailData = { email };
        await EmailModels.create(emailData);
        console.log("Email submitted:", email);

        // Return a success response
        return NextResponse.json({ message: 'Email submitted successfully!' });
    } catch (error) {
        // Handle any errors
        console.error("Error submitting email:", error);
        return NextResponse.json(
            { message: 'An error occurred', error: error.message },
            { status: 500 }
        );
    }
}
