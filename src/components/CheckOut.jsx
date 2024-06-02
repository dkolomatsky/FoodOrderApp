import { useContext } from "react";
import Modal from "./UI-items/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI-items/Input";
import Button from "./UI-items/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // totalCartPrice - переменная в котрую будем записывать сумирования прайсов выбраных элементов
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  // метод для кнопки которая закрывает окно
  function handleClose() {
    userProgressCtx.hideCheckOut();
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form>
        <h2>CheckOut</h2>
        <p>Total amount: {currencyFormatter.format(totalCartPrice)}</p>
        <Input type="text" label="Full name" id="full-name" />
        <Input type="email" label="Email address" id="email" />
        <Input type="text" label="Street" id="street" />
        <div className="control-row">
          <Input type="text" label="Postal code" id="postal-code" />
          <Input type="text" label="City" id="city" />
        </div>
        <p className="modal-actions">
          <Button type="button" onlyText onClick={handleClose}>
            Close
          </Button>
          <Button>Submit Order</Button>
        </p>
      </form>
    </Modal>
  );
}
