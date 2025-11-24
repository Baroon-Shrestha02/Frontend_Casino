import React, { useState } from "react";
import { IoLogoWhatsapp, IoClose, IoSend } from "react-icons/io5";

export default function Whatsapp() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [message, setMessage] = useState("");

  const defaultGreeting = "Hello! I would like to get in touch with you.";

  const handleSendMessage = () => {
    const fullMessage = defaultGreeting + "\n\n" + message;
    const encodedMessage = encodeURIComponent(fullMessage);
    const whatsappUrl = `https://wa.me/9779851407135?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
    // Reset form
    setMessage("");
    setIsFormOpen(false);
  };

  return (
    <>
      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110"
        >
          <IoLogoWhatsapp className="w-8 h-8" />
        </button>
      </div>

      {/* Chat Box */}
      {isFormOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-80 bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="bg-green-500 text-white p-3 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <IoLogoWhatsapp className="w-5 h-5" />
              <h3 className="font-medium text-sm">WhatsApp Chat</h3>
            </div>
            <button
              onClick={() => setIsFormOpen(false)}
              className="text-white hover:bg-green-600 p-1 rounded"
            >
              <IoClose className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="p-4 h-48 flex flex-col">
            {/* Default Greeting Message */}
            <div className="bg-green-100 p-2 rounded-lg mb-3 text-sm">
              {defaultGreeting}
            </div>

            {/* Input Area */}
            <div className="mt-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 transition"
                >
                  <IoSend className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
