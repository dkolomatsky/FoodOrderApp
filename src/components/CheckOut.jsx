import { useContext } from "react";
import Modal from "./UI-items/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI-items/Input";
import Button from "./UI-items/Button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../utils/useHttp";
import Error from "./UI-items/Error";

// создаем эту константу вне компоненты чтобы избежать возможного попадания в бесконечный цыкл
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckOut() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  // const {data,isLoading,error, sendRequest}= делаем деструктуризацию чтобы получить доступ к пропсам кастомного хука
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  // totalCartPrice - переменная в котрую будем записывать сумирования прайсов выбраных элементов
  const totalCartPrice = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);

  // метод для кнопки которая закрывает окно
  function handleClose() {
    userProgressCtx.hideCheckOut();
  }
  // метод для очистки корзины после отправки заказа с данными о заказчике на сервер
  function handleFinished() {
    userProgressCtx.hideCheckOut();
    cartCtx.clearCart(); // очищаем корзины
    clearData(); // очищаем состояние данных об отправке запроса переведя его в начальное состояние
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

    // вызываем функцию по отправке запроса на сохранение данных на бек
    sendRequest(
      // в параметр передадим структуру для body которую требует настройки бекенда (обьект в котором свойство order со значением вложеного обьекта со свойствами items со значениями получеными из контекста, customer со значениями получеными из формы)
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  // сохраним фрагмент где отрисовываем кнопки в переменную чтобы можно было показывать или скрывать эти кнопки в зависимости от состояния запроса
  let btnActions = (
    <>
      <Button type="button" onlyText onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  // ставим проверку что пока идет запрос вместо кнопок показывать текст а потом когда запрос пройдет то показать кнопки
  if (isSending) {
    btnActions = <span>Request is sending ...</span>;
  }
  // ставим проверку когда выводить окно с сообщением об успешной отправке данных с заказом на бек
  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinished}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully! </p>
        <p>We will call you within a few minutes for some details</p>
        <p className="modal-actions">
          <Button onClick={handleFinished}>Okey!</Button>
        </p>
      </Modal>
    );
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
        {error && <Error title="Request was failed." message={error} />}
        <p className="modal-actions">{btnActions}</p>
      </form>
    </Modal>
  );
}
