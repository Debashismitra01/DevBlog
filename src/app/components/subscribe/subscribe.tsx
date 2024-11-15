import React, { useState } from "react";
import axios from "axios";
import "./subscribe.css"

const SubscribeForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/email", { email });
      if (response.status === 200) {
        setMessage("Subscription successful! 🎉");
        setEmail(""); // Reset the input
      } else {
        setMessage("Something went wrong, please try again. 😢");
      }
    } catch () {
      setMessage("Failed to subscribe. Check your internet or try later. 😥");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="subscribe">
        <div className="left">
        <h2>Stay in the Loop with Our Latest Content!</h2>
        <p>Subscribe to get the freshest insights, tutorials, and stories straight to your inbox. No spam—just quality content to level up your knowledge and keep you inspired!</p>
        </div>
      <div className="right">
        <div className="alert">
      {message && (
        <p style={{color: message.includes("successful") ? "green" : "red" }}>
          {message}
        </p>
      )}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
        >
          Submit
        </button>
      </form>
      <p className="terms">By subscribing, you agree to receive email updates from our blog. We respect your privacy and promise no spam—only valuable content. You may unsubscribe anytime using the link in our emails. We won’t share or sell your email address. Enjoy our content, and thanks for being a part of our community!</p>
    </div>
    </div>
  );
};

export default SubscribeForm;
