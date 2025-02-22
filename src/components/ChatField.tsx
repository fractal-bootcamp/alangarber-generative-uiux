// ChatField.tsx
import React, { useState, useEffect } from "react";
import { loadGoogleFont } from "../utils/loadGoogleFonts";
import './ChatField.css';

interface ChatMessage {
  sender: "character" | "user";
  text: string;
}

interface ChatFieldProps {
  characterDescription: string;
  fontFamily: string;
}

const ChatField: React.FC<ChatFieldProps> = ({
  characterDescription,
  fontFamily,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");

    // Load the font when the component mounts or fontFamily changes
    useEffect(() => {
        if (fontFamily) {
          loadGoogleFont(fontFamily);
        }
      }, [fontFamily]);

  // On mount, fetch an introductory message from the character
  useEffect(() => {
    const fetchIntro = async () => {
      const introPrompt = `
      Based on the following description of an imaginary friend: "${characterDescription}",
      write a friendly introductory message from this character to a new user. 
      The message should be in a casual and engaging tone.
      `;
      try {
        const response = await fetch("http://localhost:5001/api/generate-intro", {
          // You would create this endpoint similarly
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: introPrompt }),
        });
        const result = await response.json();
        setMessages((prev) => [
          ...prev,
          { sender: "character", text: result.text },
        ]);
      } catch (error) {
        console.error("Error fetching intro:", error);
      }
    };

    fetchIntro();
  }, [characterDescription]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    // Append user message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);
    // Here you can later add a call to your chatbot API to get a response
    setInput("");
  };

  return (
    <div
      className="chat-container"
      style={{
        fontFamily: fontFamily,
        position: "absolute",
        top: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "10px",
        backgroundColor: "#fff",
        overflowY: "auto",
      }}
    >
      <h4>Chat with Your Friend</h4>
      <div style={{ flexGrow: 1 }}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "character" ? "left" : "right",
              margin: "5px 0",
            }}
            className={`class-message ${msg.sender}`}
          >
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <form
        onSubmit={handleSend}
        style={{ display: "flex", marginTop: "10px" }}
        className="chat-input-wrapper"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flexGrow: 1, marginRight: "5px" }}
          placeholder="Say something..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatField;
