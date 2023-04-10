require("dotenv/config");
const express = require("express");
const authRoute = require("./routes/auth-route");
const subscriptionRoute = require("./routes/subscription-route");
const allMiddlewares = require("./middlewares/all-middlewares");
const errorMiddleware = require("./middlewares/error-middleware");
const path = require("path");
const app = express();
const publicPath = path.join(__dirname, "public");

allMiddlewares(app);

app.use(express.static(publicPath));

app.use("/api/auth", authRoute);

app.use("/api/subscriptions", subscriptionRoute);

app.use(errorMiddleware); // Must be at end

let port = process.env.PORT;
if (!port) {
  port = 8000;
}
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${port}`);
});
