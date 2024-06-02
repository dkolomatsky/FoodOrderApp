// компонента для создания карточки еды
import { useContext } from "react";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI-items/Button";
import CartContext from "../store/CartContext";

export default function MealItem({ meal }) {
  const cartCxt = useContext(CartContext); // вызываем хук и передаем в него значение контекста и сохраним в переменную для дальнейшего использования
  // метод для добавления элемента в корзину при нажатии на кнопку
  function handleAddMealToCart() {
    cartCxt.addItem(meal); // из контекста получаем доступ к функции addItems и вызываем ее , передав через параметр элемент который пришел в компоненту MealItem через пропс из родительской компоненты Meal
  }
  return (
    <li className="meal-item">
      <article>
        {/* используя бектики и интерполяцию можно динамически получать изображение из бекенда в виде строки */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {/* обернули поле вывода валюты в шаблон который будет отображать ее в правильном формате */}
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
