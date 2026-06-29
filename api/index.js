let serverApp;
let initError;

try {
  const serverModule = require('../server');
  serverApp = serverModule.default || serverModule;
} catch (e) {
  initError = {
    message: e.message,
    stack: e.stack,
    name: e.name
  };
}

module.exports = (req, res) => {
  if (initError) {
    res.status(200).json({ diagnosticError: initError });
  } else {
    serverApp(req, res);
  }
};
