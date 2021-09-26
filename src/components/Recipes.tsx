import React from "react";
import { Button } from "react-bootstrap";
import { Route, useHistory, useLocation, useRouteMatch } from "react-router";
import { v4 } from "uuid";
import BlankForm from "./BlankForm";

const Recipes = () => {
  const location = useLocation();
  console.log(location);
  const history = useHistory();
  const { url } = useRouteMatch();
  console.log(url);

  return (
    <>
      <Button
        variant="success"
        onClick={() => {
          history.push(`${url}/${v4()}`);
        }}
      >
        new recipe
      </Button>
      <Route path={`${url}`} exact={true}>
        <h3>Please select a Recipe!</h3>
      </Route>
      <Route path={`${url}/:id`}>
        <BlankForm />
      </Route>
    </>
  );
};

export default Recipes;
