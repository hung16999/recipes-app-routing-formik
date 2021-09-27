import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { v4 } from "uuid";
import { recipes } from "../constants/recipes";
import BlankForm from "./BlankForm";

const Recipes = () => {
  const history = useHistory();
  const location = useLocation();
  const { url } = useRouteMatch();
  const [isShowButtonNew, setIsShowButtonNew] = useState<boolean>();

  const handleClickNewRecipe = () => {
    history.push(`${url}/${v4()}`);
  };

  useEffect(() => {
    if (location.pathname === "/recipes") {
      setIsShowButtonNew(true);
    } else {
      setIsShowButtonNew(false);
    }
  }, [location]);

  return (
    <>
      <div className="row">
        <div className="col-6">
          {isShowButtonNew && (
            <Button variant="success" onClick={handleClickNewRecipe}>
              new recipe
            </Button>
          )}
        </div>

        <div className="col-6">
          <Route path={`${url}`} exact={true}>
            <h3>Please select a Recipe!</h3>
          </Route>
        </div>
      </div>

      <div className="row">
        <div className="col-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="recipe-info d-flex justify-content-between align-items-center"
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
          <Route path={`${url}/:recipeId`} exact={true}>
            <BlankForm />
          </Route>
        </div>
      </div>
    </>
  );
};

export default Recipes;
