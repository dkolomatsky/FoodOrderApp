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

export default App;
