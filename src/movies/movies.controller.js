const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Validation middleware function:
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    // Storing the existing movie in res.locals.movie
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: "Movie cannot be found." });
}

// Route handlers:
function read(req, res, next) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function listTheatersShowingMovie(req, res, next) {
  const theaters = await service.listTheatersShowingMovie(
    res.locals.movie.movie_id
  );
  res.json({ data: theaters });
}

async function listMovieReviews(req, res, next) {
  const reviewsArray = await service.listMovieReviews(
    res.locals.movie.movie_id
  );
  res.json({ data: reviewsArray });
}

async function list(req, res, next) {
  // Accessing query parameter
  const movieIsShowing = req.query.is_showing;
  // If query parameter, 'is_showing', is present and true, will only list movies that are currently showing in theaters
  if (movieIsShowing === "true") {
    const data = await service.listMoviesShowingInTheaters();
    res.json({ data });
  }
  // If no query parameter is present, will list all movies in the database
  res.json({ data: await service.list() });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  listTheatersShowingMovie: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listTheatersShowingMovie),
  ],
  listMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMovieReviews),
  ],
};
