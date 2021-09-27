import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { v4 } from "uuid";
import { recipes } from "../constants/recipes";
import BlankForm from "./BlankForm";
import RecipeDetail from "./RecipeDetail";

const Recipes = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [isShowButtonNew, setIsShowButtonNew] = useState<boolean>();

  const handleClickNewRecipe = () => {
    history.push(`${url}/form/${v4()}`);
  };

  useEffect(() => {
    if (location.pathname.includes("/recipes/form")) {
      setIsShowButtonNew(false);
    } else {
      setIsShowButtonNew(true);
    }
  }, [location]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          <Button
            variant="success"
            onClick={handleClickNewRecipe}
            disabled={!isShowButtonNew}
          >
            new recipe
          </Button>
        </div>

        <div className="col-6">
          <h3>Please select a Recipe!</h3>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-info d-flex justify-content-between align-items-center"
              onClick={() => {
                history.push(`${url}/${recipe.id}`);
              }}
            >
              <div>
                <b>{recipe.name}</b>
                <p>{recipe.description}</p>
              </div>

              <img className="img-avatar" src={recipe.imageUrl} alt="" />
            </div>
          ))}
        </div>
        <div className="col-6">
          <Route path={`${url}/form/:recipeId`} exact={true}>
            <BlankForm />
          </Route>

          <Route path={`${url}/:recipeId`}>
            <RecipeDetail />
          </Route>
        </div>
      </div>
    </>
  );
};

export default Recipes;
