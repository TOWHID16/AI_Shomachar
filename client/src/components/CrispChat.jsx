// CrispChat.jsx
import React, { useEffect } from 'react';
import { Crisp } from 'crisp-sdk-web';

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("YOUR_CRISP_WEBSITE_ID"); // Replace with your actual Crisp ID
  }, []);

  return null;
};

export default CrispChat;