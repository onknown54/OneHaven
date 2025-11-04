const catchError = (fn) => {
  return (req, resp, next) => fn(req, resp, next).catch(next);
};

export default catchError;
