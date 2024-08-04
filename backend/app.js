const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const movieRoutes = require("./routes/movie");
const genreRoutes = require("./routes/genre");
const mediaTypeRoutes = require("./routes/mediaType");

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/movies", movieRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/media-types", mediaTypeRoutes);

// Xử lý 404
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

// Trả về lỗi
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const { message } = error;
  res.status(status).json({ message });
});

app.listen(port);
