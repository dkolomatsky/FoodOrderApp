// компонента для создания карточки еды
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI-items/Button";

export default function MealItem({ meal }) {
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
          <Button>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
