import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  calculateColorByPercentage,
  calculatePercentageOfVotes,
} from "../helpers";
import "./QuoteCard.css";
import api from "../api";

const QuoteCard = ({ quote, updateQuote }) => {

  const percentage = calculatePercentageOfVotes(
    quote.upvotesCount,
    quote.downvotesCount
  ).toFixed(0);

  const updateVote = async (voteValue) => {
    let response;

    try {
      if (quote.givenVote === "upvote" && voteValue === "downvote") {
        await api.deleteVote(quote);

        response = await api.downVote(quote);

        updateQuote(response.data);
        return;
      } else if (quote.givenVote === "downvote" && voteValue === "upvote") {
        await api.deleteVote(quote);

        response = await api.upVote(quote);

        updateQuote(response.data);
        return;
      }
      if (quote.givenVote === voteValue) {
        response = await api.deleteVote(quote);

        updateQuote(response.data);
        return;
      }

      if (quote.givenVote === "none") {
        if (voteValue === "upvote") {
          response = await api.upVote(quote);
        } else {
          response = await api.downVote(quote);
        }

        updateQuote(response.data);
        return;
      }
    } catch (error) {
      console.log( error);
    }
  };

  return (
    <div className="container-quote">
      <div className="left-container">
        <div className="up-icon">
          <FontAwesomeIcon
            onClick={() => updateVote("upvote")}
            icon={faCaretUp}
            style={quote.givenVote === "upvote" && { color: "lightGreen" }}
          />
        </div>
        <div
          className="percentage"
          style={{ color: calculateColorByPercentage(percentage) }}
        >
          {percentage}%
        </div>
        <div className="mark">
          {quote.upvotesCount} / {quote.downvotesCount}
        </div>
        <div className="down-icon">
          <FontAwesomeIcon
            onClick={() => updateVote("downvote")}
            icon={faCaretDown}
            style={quote.givenVote === "downvote" && { color: "red" }}
          />
        </div>
      </div>
      <div className="right-container">
        <p>{quote.content}</p>
        <h5>-{quote.author}</h5>
      </div>
    </div>
  );
};

export default QuoteCard;
