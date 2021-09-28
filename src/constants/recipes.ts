import { Recipe } from "./interfaceRecipe";

export const recipesList: Recipe[] = [
  {
    id: "df",
    name: "Bún chả",
    imageUrl:
      "https://top10tphcm.com/wp-content/uploads/2021/01/Quan-bun-cha-ha-noi-o-TPHCM.jpg",
    description: "Very good, please enjoy",
    ingredients: [
      { name: "thịt lợn", quantity: 500 },
      { name: "nước mắm", quantity: 200 },
      { name: "hành khô", quantity: 5 },
    ],
  },
  {
    id: "dfff32f",
    name: "Gà luộc",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcbHjacxP3cJTXhu8sV6LF94LJ4zWtoVlTQ&usqp=CAU",
    description: "Very good, please enjoy",
    ingredients: [
      { name: "gà", quantity: 2 },
      { name: "hành khô", quantity: 14 },
      { name: "nước mắm", quantity: 90 },
    ],
  },
];
