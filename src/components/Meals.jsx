import { useEffect, useState } from "react";
import MealItem from "./MealItem";

export default function Meals() {
  const [loadedMeals, setLoadedMeals] = useState([]);

  // используем хук useEffect чтобы избавится от sideeffect и бесконечного перезапуска компоненты так как она регулярно отправляет и получает данные на серевер
  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");
      if (!response.ok) {
        // ...
      }
      const meals = await response.json(); // запишем полученые данные в правильный формат json
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
