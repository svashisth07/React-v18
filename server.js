import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import renderApp from "./dist/server/ServerApp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;
const html = fs
  .readFileSync(path.resolve(__dirname, "./dist/client/index.html"), "utf8")
  .toString();

const parts = html.split("<!-- APP -->");

const app = express();

app.use(
  "/assets",
  express.static(path.resolve(__dirname, "./dist/client/assets")),
);

app.use((req, res) => {
  res.write(parts[0]);
  const stream = renderApp(req.url, {
    onShellReady: () => {
      stream.pipe(res);
    },
    onShellError: (error) => {
      console.error(error);
      res.status(500).send(error.message);
    },
    onAddReady: () => {
      res.write(parts[1]);
      res.end();
    },
    onError(error) {
      console.error(error);
      res.status(500).send(error.message);
    },
  });
});
console.log(`Listening on port http//:localhost/${PORT}`);
app.listen(PORT);
