import { Formik, Form, Field } from "formik";
import { searchMovie } from "../movies-api";
import { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import MovieList from "../components/MovieList/MovieList";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function SearchMoviesPage() {
  const [topic, setTopic] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  useEffect(() => {
    if (query === "") {
      return;
    }
    setLoading(true);

    async function getMovies() {
      try {
        const data = await searchMovie(query);
        if (data.results.length === 0) {
          toast.warning("No movies found for this query.");
        }
        setTopic(data.results);
      } catch (error) {
        toast.error("Sorry, we couldn't fetch the movies.");
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [query]);

  return (
    <>
      <Formik
        initialValues={{ topic: "" }}
        onSubmit={(values, actions) => {
          if (values.topic.trim()) {
            searchParams.set("query", values.topic);
            setSearchParams(searchParams);
            actions.resetForm();
          } else {
            toast.error("Please enter text to search for movies.");
          }
        }}
      >
        <Form>
          <Field type="text" name="topic" placeholder="Search for movies..." />
          <button type="submit">Search</button>
        </Form>
      </Formik>
      {loading && <Loader />}
      {!loading && <MovieList trendingMovies={topic} />}
      <Toaster /> {/* Компонент Toaster для отображения уведомлений */}
    </>
  );
}
