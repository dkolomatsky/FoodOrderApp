import { useContext } from "react";
import Modal from "./UI-items/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI-items/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext); // получаем доступ к контексту
  const userProgressCtx = useContext(UserProgressContext); // получаем доступ к контексту
  // totalCartPrice - переменная в котрую будем записывать сумирования прайсов выбраных элементов
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  // метод для закрытия окна корзины
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    // оборачиваем наполнение корзины в кастомною компоненту модального окна
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>You Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => cartCtx.removeItem(item.id)} // через пропс передадим из контекста метод для уменьшения кол-ва элементов
            onIncrease={() => cartCtx.addItem(item)} // через пропс передадим из контекста метод для увеличения кол-ва элементов
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(totalCartPrice)}</p>
      <p className="modal-actions">
        <Button onlyText="true" onClick={handleCloseCart}>
          Close
        </Button>
        <Button onClick={handleCloseCart}>Go to checkout</Button>
      </p>
    </Modal>
  );
}
