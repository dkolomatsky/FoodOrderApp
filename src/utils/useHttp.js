import { useCallback, useEffect, useState } from "react";

// функция помощник для кастомного хука
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config); // отправка запроса и сохранение его результата в переменную
  const resData = await response.json(); // получим данные из результата ответа от бекенда для их дальнейшего использования

  if (!response.ok) {
    // если ответ от бека будет не ОК то пробросим ошибку либо с сообшением от бека либо с кастомным текстом
    throw new Error(
      resData.message || "Something went wrong, failed to send request."
    );
  }
  return resData; // ели ошибок нет и ответ ОК то просто вернем полученые данные
}

// кастомный хук который будет отвечать за управление состояниеми при запросах на бекенд
// в пропсы зададим возможность настраивать запрос: url - чтобы задавть адресс для запроса, config - чтобы настаивать запрос и initialData - чтобы задать начальное значение при необходимости
export default function useHttp(url, config, initialData) {
  // хук будет правлять тремя состояниями (успех, ожидание и ошибка)
  const [data, setData] = useState(initialData); // состояние об успешном запросе и получении данных в результате
  const [isLoading, setIsLoading] = useState(false); // состояние при ожиданнии ответа от беека при отправке запроса
  const [error, setError] = useState(); // состояние об ошибке в случае если на каком то этапе запроса получим ошибку

  // метод для очистки данных в состоянии data нужен чтобы сбрасывать состояние успешного или не успешного запрпоса после его отправки
  function clearData() {
    setData(initialData);
  }

  // функция для управления этими тремя состояниями при отправке запроса на бек. Обернем ее в хук useCallback так как она попала в зависимости в хуке useEffect и чтобы уйти от постоянного перезапуска при получении данных и в зависимости зададим что обновляться нужно только если изменится url или настройки config
  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true); // запускаем состояние процесс ожидания ответа от бека
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data }); // вызываем функцию помощник и в переменную сохраним результат того что она нам вернула
        setData(resData); // обновим состояние полученых данных
      } catch (error) {
        setError(error.message || "Something went wrong!"); // обновляем состояние ошибки
      }
      setIsLoading(false); // останавливаем процесс ожидания ответа
    },
    [url, config]
  );

  // оберенем функцию отправки запроса в хук useEffect так как в одной из компонент (Meals) эта функция будет использоватся отправляя запрос методом GET и возможно что может возникнуть бесконечный перезапуск так как компонента Meals регулярно будет обновлятся
  // но также функция sendRequest будет использоватся и в другом месте (компонента CheckOut) там где отправляется совсем другой запрос (POST) на сохранение введенных данных и та не нужен данный хук useEffect поэтому ставим проверку когда запускать метод sendRequest из хука а когда просто вызвать
  useEffect(() => {
    if ((config && (config.method === "GET" || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest]);

  return {
    data,
    isLoading,
    error,
    sendRequest, // даем возможность вызывать метод где угодно по надобности
    clearData, // даем возможность вызывать метод где угодно по надобности
  };
}
