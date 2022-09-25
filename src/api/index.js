import axios from "axios";
import { getTokenFromStorage } from "../helpers";

const api = {
  getQuotes: async (params = {}) => {
    let paramsStr = "";
    Object.keys(params).forEach((key) => {
      paramsStr = paramsStr + key + "=" + params[key]?.join(",") + "&";
    });
    console.log("asd", getTokenFromStorage());
    const res = await axios.get(
      `http://localhost:8000/quotes${paramsStr && "?" + paramsStr}`,
      {
        headers: { Authorization: "Bearer " + getTokenFromStorage() },
      }
    );

    return res.data.quotes;
  },

  getTags: async () => {
    const res = await axios.get("http://localhost:8000/tags", {
      headers: { Authorization: "Bearer " + getTokenFromStorage() },
    });

    return res.data;
  },

  login: async (user) => {
    return await axios.post("http://localhost:8000/sessions", user);
  },

  addQuote: async (data) => {
    return await axios.post("http://localhost:8000/quotes", data, {
      headers: { Authorization: "Bearer " + getTokenFromStorage() },
    });
  },
  deleteVote: async (quote) => {
    return await axios.delete(
      `http://localhost:8000/quotes/${quote.id}/${quote.givenVote}`,
      { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
    );
  },

  downVote: async (quote) => {
    return await axios.post(
      `http://localhost:8000/quotes/${quote.id}/downvote`,
      null,
      { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
    );
  },

  upVote: async (quote) => {
    return await axios.post(
      `http://localhost:8000/quotes/${quote.id}/upvote`,
      null,
      { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
    );
  },
};

export default api;
