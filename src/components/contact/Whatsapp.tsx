import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <a
      href="https://wa.me/447375387114"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-400 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300"
    >
      <FaWhatsapp size={24} />
      <span className="sr-only">Chat with us on WhatsApp</span>
      <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-900 rounded-full animate-ping"></span>
    </a>
  );
};

export default Whatsapp;
