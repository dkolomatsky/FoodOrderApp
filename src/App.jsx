import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Input from "./components/UI-items/Input";
import { CartContextProvider } from "./store/CartContext";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    // оборачиваем контекстами все компоненты которые будут его использовать
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header />
        <Meals />
        <Cart />
        <CheckOut />
        {/* <Input /> */}
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

/*
❗❗❗ TO DO: 
⛳ реализовать поиск блюд по странице (в header сделать поле для поиска)
⛳ реализовать футтер на основной странице
⛳ реализовать пагинацию (отображать по 6 карточек на одном окне)
*/

/*
🔥❗❗info for starting the project:
1. npm install в терминале приложения
2. npm install в терминале папки бекенда(cd backend, потом инстал)
3. в теминале проекта запускается npm run dev
4. в терминале бекенда npm start
*/

export default App;
