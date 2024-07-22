import axios from "axios";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NWI0OWY5NjhhNmI3NDQ0MWZlNGUwODA1ODg2OTE2NyIsIm5iZiI6MTcyMTE0MTM3Ny45MjQ4NzEsInN1YiI6IjY2OTQwNDQ0OWI2ZmRmNmYxMTg5NjcyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g9a9IfuK4A2E4pmu_OoSMeuZ5JA1bQ8oDwifwyS5F_w",
  },
};

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export async function fetchMovies() {
  try {
    const response = await axios.get(
      "/trending/movie/day?language=en-US",
      options
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchMovieById(id) {
  try {
    const response = await axios.get(`/movie/${id}?language=en-US`, options);

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchCredits(id) {
  try {
    const response = await axios.get(
      `/movie/${id}/credits?language=en-US`,
      options
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function fetchReviews(id) {
  try {
    const response = await axios.get(
      `/movie/${id}/reviews?language=en-US&page=1`,
      options
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function searchMovie(query) {
  try {
    const response = await axios.get(
      `/search/movie?include_adult=false&language=en-US&page=1&query=${query}`,
      options
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
