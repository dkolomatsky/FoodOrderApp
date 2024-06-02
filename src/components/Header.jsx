import { useContext } from "react";
import headerLogo from "../assets/logo.jpg";
import Button from "./UI-items/Button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext); // подключаем контекст
  const userProgressCtx = useContext(UserProgressContext); // подключаем контекст

  const totalCartItems = cartCtx.items.reduce((totalNumbersOfItem, item) => {
    return totalNumbersOfItem + item.quantity; // возвращаем сложение общего кол-ва элементов и кол-во нового элемента и обновляем данные в параметре в totalNumbersOfItem и так по кругу идет сумирование при добавлении элементов в массив items
  }, 0);

  // метод для открытия окна корзины при нажатии на нее
  function handleShowCart() {
    userProgressCtx.showCart(); // вызываем метод полученый из контекста
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="a food site" />
        <h1>DK restaurant</h1>
      </div>
      <nav>
        <Button onlyText="true" onClick={handleShowCart}>
          Cart({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
