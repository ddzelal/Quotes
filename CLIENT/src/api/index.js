import axios from "axios";
import { getTokenFromStorage } from "../helpers";
import {API_URL} from "../CONSTANT";



// console.log(process.env.REACT_APP_BASE_URL)
// const API_URL= process.env.REACT_APP_BASE_URL;
console.log(API_URL)

const getQuotes = async (params = {}) => {

  let paramsStr = "";
  Object.keys(params).forEach((key) => {
    paramsStr = paramsStr + key + "=" + params[key]?.join(",") + "&";
  });
  const res = await axios.get(
    `${API_URL}/quotes${paramsStr && "?" + paramsStr}`,
    {
      headers: { Authorization: "Bearer " + getTokenFromStorage() },
    }
    
    );

  return res.data.quotes;
};

//not working, because my very low iq!
const paginationQuotes = async (page , pageNumber) => {
  const res = await axios.get( `${API_URL}/quotes?pageSize=${page}&page=${pageNumber}`,
  {
    headers: { Authorization: "Bearer " + getTokenFromStorage() },
  })
  console.log(res.data.quotes)
  return res.data.quotes
}

const getTags = async () => {
  const res = await axios.get(`${API_URL}/tags`, {
    headers: { Authorization: "Bearer " + getTokenFromStorage() },
  });
  return res.data;
};

const login = async (user) => {
console.log(API_URL)

  
  // console.log(user);
  return await axios.post(`${API_URL}/sessions`, user);
};

const addQuote = async (data) => {
  return await axios.post(`${API_URL}/quotes`, data, {
    headers: { Authorization: "Bearer " + getTokenFromStorage() },
  });

};
const deleteVote = async (quote) => {
  return await axios.delete(
    `${API_URL}/quotes/${quote.id}/${quote.givenVote}`,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
};

const downVote = async (quote) => {
  return await axios.post(
    `${API_URL}/quotes/${quote.id}/downvote`,
    null,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
  
};

const upVote = async (quote) => {
  return await axios.post(
    `${API_URL}/quotes/${quote.id}/upvote`,
    null,
    { headers: { Authorization: "Bearer " + getTokenFromStorage() } }
  );
};

const api = {
  getQuotes,
  addQuote,
  getTags,
  login,
  deleteVote,
  downVote,
  upVote,
};

export default api;
