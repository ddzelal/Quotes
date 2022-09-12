import React, { useCallback, useEffect } from "react";
import "./displayQuotes.css";
import { useState } from "react";
import axios from "axios";
import QuoteCard from "./QuoteCard";
import FilterBy from "./FilterBy";

export default function DisplayQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [tags, setTags] = useState([]);
  const [filters, setFilters] = useState({});

  const getQuotes = useCallback((params = {}) => {
    let paramsStr = "";
    Object.keys(params).forEach((key) => {
      paramsStr = paramsStr + key + "=" + params[key]?.join(",") + "&";
    });

    return axios
      .get(`http://localhost:8000/quotes${paramsStr && "?" + paramsStr}`)
      .then(({ data }) => {
        return data.quotes;
      });
  }, []);

  const getTags = useCallback(() => {
    return axios.get("http://localhost:8000/tags").then(({ data }) => {
      return data;
    });
  }, []);

  const submitHandler = useCallback(async (params) => {
    setFilters((oldValue) => ({ ...oldValue, ...params }));
  });

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
          getQuotes(),
          getTags(),
        ]);

        setQuotes(quotesRes);
        setTags(tagsRes);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [getQuotes, getTags]);

  return (
    <div className="container-display">

    <div className="container-display-quotes">
    <button
        onClick={async () => {
          const res = await getQuotes(filters);
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
              getQuotes={getQuotes}
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
