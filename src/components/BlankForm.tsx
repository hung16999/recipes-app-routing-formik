import React from "react";
import { useHistory, useParams } from "react-router";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FormikProps,
  FormikHelpers,
  FieldArrayRenderProps,
} from "formik";
import { Button } from "react-bootstrap";
import { Ingredient, Recipe } from "../constants/interfaceRecipe";
import { recipes } from "../constants/recipes";

const BlankForm = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const history = useHistory();

  const validateForm = (values: Recipe) => {
    const error: any = {};

    if (!values.name) {
      error.name = "* Name require";
    }

    if (!values.imageUrl) {
      error.imageUrl = "* Image require";
    }

    if (!values.description) {
      error.description = "* Description require";
    }

    if (!values.ingredients.length) {
      error.ingredients = "* Ingredients require";
    } else {
      for (const ingredient of values.ingredients) {
        for (const key in ingredient) {
          if (!ingredient[key]) {
            error.ingredients = "* Ingredients require";
            break;
          }
        }
      }
    }

    if (Object.keys(error).length > 0) {
      return error;
    }
  };

  const onSubmit = (values: Recipe, formikHelper: FormikHelpers<Recipe>) => {
    const newRecipe: Recipe = {
      id: values.id,
      name: values.name,
      description: values.description,
      imageUrl: values.imageUrl,
      ingredients: values.ingredients,
    };

    recipes.push(newRecipe);
    formikHelper.resetForm();
    history.push("/recipes");
  };

  return (
    <>
      <Formik
        initialValues={{
          id: recipeId,
          name: "",
          imageUrl: "",
          description: "",
          ingredients: [] as Ingredient[],
        }}
        onSubmit={onSubmit}
        validate={validateForm}
      >
        {(formHelper: FormikProps<Recipe>) => (
          <Form>
            <div className="d-flex mb-3">
              <Button
                className="me-3"
                type="submit"
                variant="success"
                disabled={!formHelper.dirty || !formHelper.isValid}
              >
                save
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  history.push("/recipes");
                }}
              >
                cancel
              </Button>
            </div>

            <div className="d-flex flex-column">
              <label className="mb-4">
                Name
                <Field type="text" name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger"
                />
              </label>

              <label className="mb-4">
                Image URL
                <Field type="text" name="imageUrl" className="form-control" />
                <ErrorMessage
                  name="imageUrl"
                  component="div"
                  className="text-danger"
                />
              </label>

              <label className="mb-4">
                Description
                <Field
                  as="textarea"
                  name="description"
                  className="form-control"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger"
                />
              </label>
            </div>

            <FieldArray name="ingredients">
              {(arrayHelper: FieldArrayRenderProps) => (
                <div>
                  {formHelper.values.ingredients.map((ingredient, index) => (
                    <div key={index} className="d-flex mb-3">
                      <Field
                        type="text"
                        name={`ingredients[${index}].name`}
                        className="form-control me-3"
                      />
                      <Field
                        type="text"
                        name={`ingredients[${index}].quantity`}
                        className="form-control me-3"
                      />
                      <Button
                        variant="danger"
                        onClick={() => {
                          arrayHelper.remove(index);
                        }}
                      >
                        x
                      </Button>
                    </div>
                  ))}
                  <ErrorMessage
                    name="ingredients"
                    component="div"
                    className="text-danger mb-4"
                  />

                  <div className="d-flex align-items-center">
                    <Button
                      className="me-3"
                      variant="info"
                      onClick={() => {
                        arrayHelper.push({ name: "", quantity: "" });
                      }}
                    >
                      Add ingredient
                    </Button>
                    {!formHelper.values.ingredients.length && (
                      <div className="text-warning">
                        * Please add ingredients for recipe
                      </div>
                    )}
                  </div>
                </div>
              )}
            </FieldArray>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BlankForm;
