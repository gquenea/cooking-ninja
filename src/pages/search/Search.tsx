import { useLocation } from "react-router-dom";
import "./Search.css";
import useFetch from "../../hooks/useFetch";
import RecipeList from "../../components/RecipeList";

const Search = () => {
  const quesryString = useLocation();
  const queryParams = new URLSearchParams(quesryString.search);
  const query = queryParams.get("q");

  const url = "http://localhost:3000/recipes?q=" + query;
  const { error, isPending, data } = useFetch({ url });

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};
export default Search;
