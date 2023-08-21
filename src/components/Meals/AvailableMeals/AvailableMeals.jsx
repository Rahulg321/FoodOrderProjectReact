import classes from "./AvailableMeals.module.css";
import Card from "../../UI/Card/Card";
import MealItem from "../MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);

  // will run once during initial load up, but in development can run twice
  useEffect(() => {
    async function FetchMeals() {
      const response = await fetch(
        "https://react-http-cb681-default-rtdb.firebaseio.com/Meals.json"
      );

      const responseData = await response.json();

      const loadedData = [];

      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedData);
    }

    FetchMeals();
  }, []);

  return (
    <>
      <section className={classes.meals}>
        <Card>
          <ul>
            {meals.map((meal) => {
              return (
                <MealItem
                  key={meal.id}
                  id={meal.id}
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />
              );
            })}
          </ul>
        </Card>
      </section>
    </>
  );
};

export default AvailableMeals;
