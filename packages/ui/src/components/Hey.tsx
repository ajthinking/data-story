import React, { useState } from 'react';

export function Hey() {
  const [message, setMessage] = useState(false);

  return <h1>Hey {message}!</h1>;
}