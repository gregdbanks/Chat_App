const verify = (req) => {
  if (req.header("token")) {
    return req.header("token");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    return req.headers.authorization.split(" ")[1];
    // Set token from cookie
  } else if (req.cookies.token) {
    return req.cookies.token;
  }
};

module.exports = verify;
