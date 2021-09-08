import React, { useState } from 'react';

type Message = {
  text: string;
  variant: 'danger' | 'success' | 'warning';
};

interface alertHookProps {
  showAlert: boolean;
  setShowAlert: (bool: boolean) => void;
  message: Message;
  setMessage: (props: Message) => void;
}

const useAlert = (): alertHookProps => {
  const [showAlert, setShowAlert] = useState(true);
  const [message, setMessage] = useState<Message>({
    text: '',
    variant: 'success',
  });

  return {
    showAlert,
    setShowAlert,
    message,
    setMessage,
  };
};

export default useAlert;
