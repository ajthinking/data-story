import { useState } from "react";
export function Hey() {
  const [message, setMessage] = useState("");

  return <h1>Hey {message}!</h1>;
}
