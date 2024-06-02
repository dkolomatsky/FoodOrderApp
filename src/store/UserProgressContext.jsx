import { Children, createContext, useState } from "react";
// контекст для определения показывать или не показывать содержимое корзины(Cart)

// шаблон заготовка для структуры контекста
const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  hideCart: () => {},
  showCheckOut: () => {},
  hideCheckOut: () => {},
});

export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }
  function hideCart() {
    setUserProgress("");
  }
  function showCheckOut() {
    setUserProgress("checkout");
  }
  function hideCheckOut() {
    setUserProgress("");
  }
  // обьект с начальным значением для метода Provider вызываемого на компоненте UserProgressContext
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckOut,
    hideCheckOut,
  };
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
