import { createContext, useReducer } from "react";

// создаем шаблон заготовку для структуры контекста
const CartContext = createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});
// фунция reducer которая будет получать состояние, и при получении определенных действий будет изменять его и возвращать новое значение
function cartReducer(state, action) {
  if (action.type === "ADD_ITEMS") {
    // проверка на то есть ли в массиве элемент с таким же id как и в том элементе который приходит из action. метод findIndex проверит каждый элемент массива и вернет true с индексом элемента в этом масиве при совпадении или -1 если не найдет
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items]; // сделаем копиию массива для его обновления
    // доп проверка если полученый индекс в массииве больше чем -1 (это означает что массив не пустой и там есть элемент с таким id) то будем увеличивать значение этого элемента а если нет то в блоке else добавим этот елемент в копию массива
    if (existingCartItemIndex > -1) {
      //обновим обьект updateItems поместив в него старый масив с элементами и создадим свойство quantity где будем обновлять кол-во этого елемента на +1,
      const updatedItem = {
        ...state.items[existingCartItemIndex], // добавляем старый массив елементов
        quantity: state.items[existingCartItemIndex].quantity + 1, // обращаемся к элементу и его свойству quantity и добавляем единицу
      };
      updatedItems[existingCartItemIndex] = updatedItem; // обновляем элемент в массиве. обращаемся к массиву получаем доступ к индексу елемента и в него записываем обновленный элемент
    } else {
      updatedItems.push({ ...action.item, quantity: 1 }); // добавляем элемент в массив и добавляем ему свойство quantity с стартовым знчаением чтобы потом при обновлении это свойство уже было и его можно было спользовать
    }
    return { ...state, items: updatedItems }; // возвращаем обьект с обновленными элементами в массиве items
  }
  if (action.type === "REMOVE_ITEMS") {
    // делаем туже проверку что и в условии добавления элемента(находим элементы из массива с совпадающим id с выбраным элементом в action )
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex]; // определяем в переменную существуюший индекс элемента чтобы с ним можно было взаимодействовать(уменьшать кол-во или вообще удалить)
    const updatedItems = [...state.items]; // сделаем копиию массива для его обновления

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItem, 1); // на масиве вызываем метод splice который возьмет существующий элемент и просто удалит его (метод сплайс берет индекс(мы указали что это будет индекс существующего елемента) и вторым параметром указываем сколько индексов надо удалить(в нашем случае мы просто удаляем весь элемент))
    } else {
      // если quantity элемента не равно 1 то обновим сам элемент уменьшив значение его свойства quantity на 1
      const updatedItem = {
        ...existingCartItem, // добавляем старый массив елементов
        quantity: existingCartItem.quantity - 1, // обновляем значение свойства quantity
      };
      updatedItems[existingCartItemIndex] = updatedItem; // обновляем элемент в массиве. обращаемся к массиву получаем доступ к индексу елемента и в него записываем обновленный элемент
    }

    return { ...state, items: updatedItems }; // возвращаем обьект с обновленными элементами в массиве items
  }
  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] }; // возвращаем обьект с обновленными элементами в массиве items в начальном состоянии а именно пустым масивом
  }
  return state;
}

// функция компонента которой будем оборачивать компоненты где будет нужно использовать данный контекст(чтобы управлять состоянием)
export function CartContextProvider({ children }) {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
  }); // используем хук useReducer() вместо useState() так как он позволит работать с несколькими состояниями в одном хуке

  // функция для добавления элемента в корзину
  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEMS",
      item,
    });
  }
  // функция для удаления элемента из корзины
  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEMS",
      id: id,
    });
  }
  // функция для очистки корзины после отправки заказа на сервер
  function clearCart() {
    dispatchCartAction({
      type: "CLEAR_CART",
    });
  }

  // создаем кастомный обьект который будет использоваться как value для контекста
  const cartContext = {
    items: cartState.items, // создали свойство со значением стейта
    addItem, // создали свойство с методом addItem (так как название свойства и метода одинаковые то можно сократить код)
    removeItem, // создали свойство с методом addItem (так как название свойства и метода одинаковые то можно сократить код)
    clearCart,
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
