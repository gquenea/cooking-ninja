import { useEffect, useState } from "react";
import "./Home.css";
import RecipeList from "../../components/RecipeList";
import { projectFirestore } from "../../firebase/config";
import { IRecipe } from "../../instances/recipe";

const Home = () => {
  const [data, setData] = useState<IRecipe[] | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore.collection("recipes").onSnapshot(
      (snapshot) => {
        if (snapshot.empty) {
          setError("No recipes to load");
          setIsPending(false);
        } else {
          let results: IRecipe[] = [];
          snapshot.docs.forEach((doc) => {
            results.push({
              id: doc.id,
              title: doc.data().title,
              ingredients: doc.data().ingredients,
              method: doc.data().method,
              cookingTime: doc.data().cookingTime,
            });
          });
          setData(results);
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {data && <RecipeList recipes={data} />}
    </div>
  );
};
export default Home;
