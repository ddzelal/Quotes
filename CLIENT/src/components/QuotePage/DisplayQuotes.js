import React, { useCallback, useEffect } from "react";
import "./displayQuotes.css";
import { useState } from "react";
import api from "../../api";
import FormQuotes from "./FormQuotes";
import FilterBy from "./FilterBy";
import QuoteCard from "./QuoteCard";

export default function DisplayQuotes() {
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
          api.getTags(),
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
      <div className="display-left">
      <div className="add-quotes">
      <button onClick={showResults}>ADD QUOTES</button>
        {displayOnOf ? <FormQuotes setQuotes={setQuotes} /> : null}
      </div>
      
       
        <div className="container-tags-by">
        <button
          onClick={async () => {
            const res = await api.getQuotes(filters);
            setQuotes(res);
          }}
        >
          SEARCH
        </button>
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

      </div>
          <div className="display-right">
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

       
    </div>
  );
}
