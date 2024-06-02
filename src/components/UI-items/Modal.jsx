import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// компонента для модального окна
// в пропсы получаем:
// children - чтобы при иоборачивании любых частей их контент отображался динамически
// open - возможность управлять открыьием окна из другой компоненты используя forwardRef
// className=" " - для задавания разных классов при использовании в разных местах, изначально задали пустую строку чтоб не было undef если не передадим значение

export default function Modal({ children, open, className = "", onClose }) {
  const dialog = useRef(); // используем хук чтобы получить доступ к элементу <dialog></dialog>
  useEffect(() => {
    const modal = dialog.current; // лучше хранить значение текущего ref в константе а не использовать напрямую типа так dialog.current.showModal() или dialog.current.close(). ❗❗ потому-что функция очистки выполнится позже чем функция useEffect и теоретически в этом промежутке ref мог бы изменится, но в этом приложении все бы работало и без константы
    if (open) {
      // если в open будет true то на выбраном элементе показать окно (showModal - встроеный метод)
      modal.showModal();
    }
    // а если не true тогда вернуть очищающую функцию на которой вызвать метод close и выйти
    return () => modal.close();
  }, [open]);
  // createPortal(param1 , param2) - это обертка для создания портала между реальным и виртуальным DOM. param1 - это элемент который хотим отправить в портал а param2 - это получение доступа к порталу в реал дом (в index.html подготовлено место с id : <div id='modal'></div>)
  return createPortal(
    // ref={dialog} - связало элемент с сылкой которая следит
    // className={`modal ${className}`} - дает возможность задавать названия класса динамически в зависимости от места использования элемента
    // onClose={onClose} - получит функцию которая будет закрыать окно и обновлять состояние в контексте
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}
