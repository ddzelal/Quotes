export const calculatePercentageOfVotes = (upVotes, downVotes) => {
  if (upVotes === 0 && downVotes === 0) {
    return 0;
  }
  return (100 / (upVotes + downVotes)) * upVotes;
};

export const calculateColorByPercentage = (percentage) => {
  const colorsArr = ["#ed6c40", "#F4A460", "#DAA520", "#ADFF2F", "#22ff04"];
  const index = (percentage / 20).toFixed(0) - 1;
  return colorsArr[index];
};

export const getTokenFromStorage = () => {
  console.log(
    'localStorage.getItem("authToken")',
    localStorage.getItem("authToken")
  );
  return localStorage.getItem("authToken");
};

export const setTokenToStorage = (token) => {
  return localStorage.setItem("authToken", token);
};

export const deleteTokenFromStorage = () => {
  return localStorage.removeItem("authToken");
};
