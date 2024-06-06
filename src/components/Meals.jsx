import useHttp from "../utils/useHttp";
import MealItem from "./MealItem";
import Error from "./UI-items/Error";

const requestConfig = {}; // создаем эту константу со значением пустого обьекта вне компоненты чтобы при обновлении компоненты в пропс config всегда попадал пустой обьект а не обновлялся изначальный, потому что если бы эта константа была внутри компоненты то она также пересоздавалась кажлый раз вместе с компонентой и изначально всегда была бы undefined а потом уже пустым обьектом

export default function Meals() {
  // const {data,isLoading,error}= делаем деструктуризацию чтобы получить доступ к пропсам кастомного хука
  const { data, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );

  // поставим проверку что пока данные не загрузились и состояние isLoading пока что true то пусть будет это сообщение
  if (isLoading) {
    return <p className="center">Fetch is loading ...</p>;
  }
  if (error) {
    return <Error title="Failed to fetch meals." message={error} />;
  }

  return (
    <ul id="meals">
      {data.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
