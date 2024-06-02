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

  // метод для кнопки по закрытию окна корзины
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  // метод для кнопки по открытию окна checkOut
  function goToCheckOut() {
    userProgressCtx.showCheckOut();
  }

  return (
    // оборачиваем наполнение корзины в кастомною компоненту модального окна
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"} // определяем что если свойство прогресс в контексте равно cart то open будет true
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null} // условие что если мы уже на странице checkout то ничего не делаем а если где то на другом окне то закрыть окно
    >
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
        {/* кнопку Go to checkout показывать только если массыв items не пуст а если пуст то не показывать*/}
        {cartCtx.items.length > 0 && (
          <Button onClick={goToCheckOut}>Go to checkout</Button>
        )}
      </p>
    </Modal>
  );
}
