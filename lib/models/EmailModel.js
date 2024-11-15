import mongoose from "mongoose";

// Define the schema
const EmailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // You may want to ensure no duplicate emails
        lowercase: true, // Optionally, store emails in lowercase
    },
});

// Use the model, check if it exists in mongoose models (to prevent overwriting)
const EmailModel = mongoose.models.Email || mongoose.model('Email', EmailSchema);

export default EmailModel;
