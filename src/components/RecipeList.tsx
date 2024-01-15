import { Link } from "react-router-dom";
import { IRecipe } from "../instances/recipe";
import "./RecipeList.css";
import useTheme from "../hooks/useTheme";
import deleteIcon from "../assets/delete-icon.svg";
import { projectFirestore } from "../firebase/config";

type RecipeListProps = {
  recipes: IRecipe[];
};

const RecipeList = (props: RecipeListProps) => {
  const { mode } = useTheme();

  const handleDelete = (id: string) => {
    projectFirestore.collection("recipes").doc(id).delete();
  };

  if (props.recipes.length === 0) {
    return <div className="error">No recipes to load...</div>;
  }

  return (
    <div className="recipe-list">
      {props.recipes.map((recipe) => (
        <div key={recipe.id} className={`card ${mode}`}>
          <h3>{recipe.title}</h3>
          <p>{recipe.cookingTime} to make.</p>
          <div>{recipe.method.substring(0, 100)}...</div>
          <Link to={`/recipe/${recipe.id}`}>Cook this</Link>
          <img
            className="delete"
            src={deleteIcon}
            onClick={() => handleDelete(recipe.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default RecipeList;
