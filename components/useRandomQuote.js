import React, { useEffect, useState } from "react";

function useRandomQuote() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () =>
      await fetch(`https://type.fit/api/quotes`)
        .then((res) => res.json())
        .then((data) => {
          setQuote(data[Math.floor(Math.random() * data.length)]);
        });
    fetchQuote();
  }, []);
  console.log(quote);
  return quote;
}

export default useRandomQuote;
