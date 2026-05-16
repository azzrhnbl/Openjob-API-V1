const routes = require("./routes");

const AuthenticationsHandler = require("./handler");

module.exports = (
  authenticationsService,
  usersService,
  tokenManager,
  validator,
) => {
  const handler = new AuthenticationsHandler(
    authenticationsService,
    usersService,
    tokenManager,
    validator,
  );

  return routes(handler);
};
