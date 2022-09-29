import React, {  useState } from "react";
import api from "../../api";
// import "./FormaQuote"

function FormQuotes({ setQuotes }) {
  const addQuotes = async () => {
    const res = await api.addQuote({
      content: quotesObj.content,
      author: quotesObj.author,
      tags: quotesObj.tags,
    });
    const newQuote = res.data;
    setQuotes((oldQuotes) => [...oldQuotes, newQuote]);
  };

  const [quotesObj, setQuotesObj] = useState({
    content: "",
    author: "",
    tags: [],
  });

  const handleOnChange = (value, inputType) => {
    inputType !== "tags"
      ? setQuotesObj({ ...quotesObj, [inputType]: value })
      : setQuotesObj({ ...quotesObj, [inputType]: [value] });
  };

  return (
    <div className="container-forma">
        <label>
          <span>content:</span>
          <input
            onChange={(e) => {
              handleOnChange(e.target.value, "content");
            }}
            type="content"
            name="content"
          />
        </label>
        <label>
          <span>author:</span>
          <input
            onChange={(e) => {
              handleOnChange(e.target.value, "author");
            }}
            type="author"
            name="author"
          />
        </label>
        <label>
          <span>tags:</span>
          <input
            onChange={(e) => {
              handleOnChange(e.target.value, "tags");
            }}
            type="tags"
            name="tags"
          />
        </label>
        <button
          onClick={() => {
            addQuotes();
          }}
          
        >submit</button>
    </div>
  );
}

export default FormQuotes;
