import { Ingredient } from "../constants/interfaceRecipe";
import { recipes } from "../constants/recipes";

const ShoppingList = () => {
  const getIngredients = () => {
    let totalIngredients = [];

    for (const recipe of recipes) {
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

  return (
    <>
      {getIngredients().map((ingredient: Ingredient) => (
        <div
          key={ingredient.name}
          className="border border-3 p-2 m-2"
          style={{ width: "300px" }}
        >
          {ingredient.name} ({ingredient.quantity})
        </div>
      ))}
    </>
  );
};

export default ShoppingList;
