
export const calculatePercentageOfVotes = (upVotes, downVotes) => {
  return (100 / (upVotes + downVotes)) * upVotes;
};

export const calculateColorByPercentage = (percentage) => {
  const colorsArr = ["#ed6c40", "#F4A460", "#DAA520", "#ADFF2F", "#22ff04"];
  const index = (percentage / 20).toFixed(0) - 1;
  return colorsArr[index];
};

