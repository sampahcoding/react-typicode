const getParamId = (history) => {
  const { match } = history;
  return parseInt(match.params.id, 0) || null;
};

export default getParamId;
