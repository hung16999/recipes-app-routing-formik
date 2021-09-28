import {
  Field,
  Formik,
  Form,
  ErrorMessage,
  FormikHelpers,
  FormikProps,
} from "formik";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { ingredientsBonus } from "../constants/ingredientsBonus";
import { Ingredient } from "../constants/interfaceRecipe";
import { recipesList } from "../constants/recipes";

const ShoppingList = () => {
  const [ingreBonus, setIngreBonus] = useState<Ingredient[]>(ingredientsBonus);
  const getIngredients = () => {
    let totalIngredients = [];

    for (const recipe of recipesList) {
      for (const item of recipe.ingredients) {
        totalIngredients.push(item);
      }
    }

    const result: Ingredient[] = [];

    totalIngredients.reduce((res: any, value) => {
      if (!res[value.name]) {
        res[value.name] = { name: value.name, quantity: 0 };
        result.push(res[value.name]);
      }
      res[value.name].quantity += value.quantity;
      return res;
    }, {});

    return result;
  };

  const onSubmit = (
    values: Ingredient,
    formikHelpers: FormikHelpers<Ingredient>
  ) => {
    ingredientsBonus.unshift(values);
    formikHelpers.resetForm();
    setIngreBonus([...ingredientsBonus]);
  };

  const validateForm = (values: Ingredient) => {
    const error: any = {};
    if (!values.name) {
      error.name = "* name require";
    }

    if (values.quantity <= 0) {
      error.quantity = "* quantity require";
    }

    if (Object.keys(error).length > 0) {
      return error;
    }
  };

  const deleteIngredient = (index: number) => {
    ingredientsBonus.splice(index, 1);
    setIngreBonus([...ingredientsBonus]);
  };

  return (
    <div className="row">
      <div className="col-6">
        <h3>Ingredients by Recipes Book</h3>
        {getIngredients().map((ingredient: Ingredient) => (
          <div
            key={ingredient.name}
            className="border border-dark border-2 p-2 m-2"
            style={{ width: "300px" }}
          >
            {ingredient.name} ({ingredient.quantity})
          </div>
        ))}
      </div>

      <div className="col-6">
        <h3>Bonus ingredients</h3>
        <Formik
          initialValues={{ name: "", quantity: "" as any }}
          onSubmit={onSubmit}
          validate={validateForm}
        >
          {(formProps: FormikProps<Ingredient>) => (
            <Form>
              <div className="d-flex">
                <div className="me-2">
                  <Field type="text" name="name" className="form-control" />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="me-2">
                  <Field
                    type="number"
                    name="quantity"
                    className="form-control"
                  />
                  <ErrorMessage
                    name="quantity"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div>
                  <Button
                    className="me-3"
                    type="submit"
                    variant="success"
                    disabled={!formProps.dirty || !formProps.isValid}
                  >
                    save
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        {!ingreBonus.length && (
          <div className="text-warning">
            * If you want to buy more ingredients, please type in the input box
          </div>
        )}

        {ingreBonus.map((ingredient, index) => (
          <div key={ingredient.name} className="d-flex m-2">
            <div
              className="border border-warning border-1 p-2 me-2"
              style={{ width: "300px" }}
            >
              {ingredient.name} ({ingredient.quantity})
            </div>
            <Button variant="danger" onClick={() => deleteIngredient(index)}>
              x
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingList;
