import React, { useCallback, useEffect } from "react";
import "./displayQuotes.css";
import { useState, useContext } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";
import FilterBy from "./FilterBy";
import FormQuotes from "./FormQuotes";
import { UserContext } from "../context/UserContext";
import { getCookie } from "../utils";
import api from "../api";

export default function DisplayQuotes() {
  const { token } = useContext(UserContext);
  console.log("token", token);

  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({});
  const [displayOnOf, setDisplayOnOf] = useState(false);
  function showResults() {
    setDisplayOnOf(!displayOnOf);
  }

  const submitHandler = useCallback(async (params) => {
    setFilters((oldValue) => ({ ...oldValue, ...params }));
  }, []);

  const updateQuote = (quote) => {
    setQuotes(
      quotes.map((q) => {
        if (q.id === quote.id) {
          return { ...quote };
        }
        return q;
      })
    );
  };

  useEffect(() => {
    (async () => {
      try {
        const [quotesRes, tagsRes] = await Promise.all([
          api.getQuotes(),
          api.getTags()
        ]);

        setQuotes(quotesRes);
        setTags(tagsRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="container-display">
      <div className="container-display-quotes">
        <button onClick={showResults}>ADD QUOTES</button>
        {displayOnOf ? <FormQuotes setQuotes={setQuotes} /> : null}
        <button
          onClick={async () => {
            const res = await api.getQuotes(filters);
            setQuotes(res);
          }}
        >
          SEARCH
        </button>
        <div className="container-tags-by">
          <FilterBy
            tags={tags}
            submitHandler={submitHandler}
            by="tags"
            multiple={true}
          />
          <FilterBy
            tags={["createdAt", "author", "upvotesCount"]}
            submitHandler={submitHandler}
            by="sortBy"
          />
        </div>

        {quotes.length ? (
          quotes.map((quote, i) => {
            return (
              <QuoteCard
                key={quote.id + i}
                quote={quote}
                getQuotes={api.getQuotes}
                updateQuote={updateQuote}
              />
            );
          })
        ) : (
          <h1>No quotes</h1>
        )}
      </div>
    </div>
  );
}
