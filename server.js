import app from "./app.js";

const port = process.env.PORT || 5000;

const server = app.listen(port, () =>
  console.log(`Server running on localhost:${port}...`)
);

process.on("unhandledRejection", (err, _promise) => {
  console.log(`Error: ${err.message}`);
});

export default app;
