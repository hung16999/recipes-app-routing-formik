import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { Recipe } from "../constants/interfaceRecipe";
import { recipesList } from "../constants/recipes";

interface Props {
  recipes: Recipe[];
  setRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

const RecipeDetail = ({ recipes, setRecipes }: Props) => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const [recipeDetail, setRecipeDetail] = useState<Recipe | null>(null);
  const history = useHistory();

  const getRecipe = () => {
    const recipeFinded = recipes.find((recipe) => recipe.id === recipeId);
    if (recipeFinded) {
      setRecipeDetail(recipeFinded);
    }
  };

  useEffect(() => {
    getRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  const deleteRecipe = () => {
    const recipeIndex = recipes.findIndex((item) => item.id === recipeId);
    recipesList.splice(recipeIndex, 1);
    setRecipeDetail(null);
    setRecipes([...recipesList]);
    history.push("/recipes");
  };

  return (
    <>
      {recipeDetail && (
        <div>
          <img
            width="300px"
            className="img-thumbnail"
            src={recipeDetail.imageUrl}
            alt=""
          />
          <h3>{recipeDetail.name}</h3>
          <div className="mb-3">{recipeDetail.description}</div>

          <div className="d-flex mb-3">
            <Button
              className="me-2"
              variant="success"
              onClick={() => {
                history.push("/shopping-list");
              }}
            >
              Shopping list
            </Button>
            <Button
              className="me-2"
              variant="warning"
              onClick={() => {
                history.push(`/recipes/form-edit/${recipeId}`);
              }}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={deleteRecipe}>
              Delete
            </Button>
          </div>

          {recipeDetail.ingredients.map((ingredient) => (
            <div
              className="border border-dark bg-light p-2 m-2"
              style={{ width: "250px" }}
            >
              {ingredient.name} - {ingredient.quantity}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default RecipeDetail;
