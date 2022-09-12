import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import {
  calculateColorByPercentage,
  calculatePercentageOfVotes,
} from "../helpers";
import "./QuoteCard.css";
import axios from "axios";

const QuoteCard = ({ quote, updateQuote }) => {
  const percentage = calculatePercentageOfVotes(
    quote.upvotesCount,
    quote.downvotesCount
  ).toFixed(0);

  const updateVote = async (voteValue) => {
    let response;
    try {
      if (quote.givenVote === "upvote" && voteValue === "downvote") {
        await axios.delete(
          `http://localhost:8000/quotes/${quote.id}/${quote.givenVote}`
        );

        response = await axios.post(
          `http://localhost:8000/quotes/${quote.id}/downvote`
        );

        updateQuote(response.data);
        return;
      } else if (quote.givenVote === "downvote" && voteValue === "upvote") {
        await axios.delete(
          `http://localhost:8000/quotes/${quote.id}/${quote.givenVote}`
        );
        response = await axios.post(
          `http://localhost:8000/quotes/${quote.id}/upvote`
        );
        updateQuote(response.data);
        return;
      }
      if (quote.givenVote === voteValue) {
        response = await axios.delete(
          `http://localhost:8000/quotes/${quote.id}/${voteValue}`
        );

        updateQuote(response.data);
        return;
      }

      if (quote.givenVote === "none") {
        response = await axios.post(
          `http://localhost:8000/quotes/${quote.id}/${voteValue}`
        );

        updateQuote(response.data);
        return;
      }
    } catch (error) {
      console.log("console.log(error);", error);
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
