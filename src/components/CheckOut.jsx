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
  // метод для отправки данных(формы) на сервер
  function handleSubmit(event) {
    event.preventDefault(); // запрещаем браузеру самостоятельно отправлять запросы
    /*
    1. в каждом поле input устанвмть обработичик onChange={} и работать с состоянием 
    2. можно в инпутах использовать ref и через forwardRef получать значения по ссылке
    3. ✅❗а можно через встроеный метод new FormData
    */
    const fd = new FormData(event.target); // получаем данные из формы используя встроеный обьект FormData и передаем в него форму target - это наша форма
    const customerData = Object.fromEntries(fd.entries()); // ❗✅ используя Object.fromEntries можно преобразовать обьект fd в более простой JavaScript обьект где инпуты будут означать свойства а введенные данные будут их знчаениями типа вот так {email : dkolomatsky@gmail.com}

    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // в тело передаем данные в формате JSON в той структуре которую требует настройки бекенда (обьект в котором свойство order со значением вложеного обьекта со свойствами items со значениями получеными из контекста, customer со значениями получеными из формы)
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      }),
    });
  }
  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>CheckOut</h2>
        <p>Total amount: {currencyFormatter.format(totalCartPrice)}</p>
        <Input type="text" label="Full name" id="name" />
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
