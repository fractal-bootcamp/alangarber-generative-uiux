// LandingPage.tsx
import React, { useState } from "react";
import "./LandingPage.css";

interface LandingPageProps {
    onSubmit: (data: {
      characterImage: string;
      backgroundImage: string;
      font: string;
    }) => void;
  }

const LandingPage: React.FC<LandingPageProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate requests
    setIsSubmitting(true);
    try {
      // Fire off three API calls concurrently:
      const characterPromise = fetch("http://localhost:5001/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const backgroundPromise = fetch("http://localhost:5001/api/generate-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const fontPromise = fetch("http://localhost:5001/api/generate-font", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      // Wait for all three responses:
      const [characterRes, backgroundRes, fontRes] = await Promise.all([
        characterPromise,
        backgroundPromise,
        fontPromise,
      ]);

      const characterData = await characterRes.json();
      const backgroundData = await backgroundRes.json();
      const fontData = await fontRes.json();

      // Call onSubmit with all the generated data:
      onSubmit({
        characterImage: characterData.imageUrl,
        backgroundImage: backgroundData.imageUrl,
        font: fontData.font,
      });
    } catch (error) {
      console.error("Error generating assets:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div
      style={{ textAlign: "center", marginTop: "50px" }}
      className="landing-container"
    >
      <h1>Describe Your Imaginary Friend</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Describe your friend..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "300px", padding: "10px" }}
          className="landing-input"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ padding: "10px 20px", marginLeft: "10px" }}
          className="landing-button"
        >
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default LandingPage;
