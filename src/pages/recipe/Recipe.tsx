import { useParams } from "react-router-dom";
import "./Recipe.css";
import useTheme from "../../hooks/useTheme";
import { useEffect, useState } from "react";
import { IRecipe } from "../../instances/recipe";
import { projectFirestore } from "../../firebase/config";

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const { mode } = useTheme();
  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsPending(true);
    const unsub = projectFirestore
      .collection("recipes")
      .doc(id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data() as IRecipe);
        } else {
          setIsPending(false);
          setError("Could not find that recipe");
        }
      });
    return () => unsub();
  }, []);

  const handleUpdate = () => {
    projectFirestore.collection("recipes").doc(id).update({
      title: "something completely different",
    });
  };

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && recipe.ingredients && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <p className="method">{recipe.method}</p>
          <button onClick={handleUpdate}>Update me</button>
        </>
      )}
    </div>
  );
};
export default Recipe;
