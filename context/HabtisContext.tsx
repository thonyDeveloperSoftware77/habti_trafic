import React, { createContext, useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import db from "../public/db";
import Habito from "../class/Habit";
import getData from "../public/getInfo"
import { async } from "@firebase/util";

interface IHabitsContext {
  habits: Habito[];
  setHabits: React.Dispatch<React.SetStateAction<Habito[]>>;
}

interface IHabitsProviderProps{
  children: React.ReactNode;
  userIdParam: string; // Agregamos userId como parámetro
}

interface dataHabits {
  name: string;
  photo: string;
  uid: string;
  email: string;
  habits: Habito[];

}
//1.Create the context 
export const HabitsContext = createContext<IHabitsContext>({
  habits: [],
  setHabits: () => {},
});

// 2. Define the provider
const HabitsProvider: React.FC<IHabitsProviderProps> = ({ children, userIdParam }) => {
  // 3. Define state and function to update state
  const [habits, setHabits] = useState<Habito[]>([]);
  const data =  getData();
  const obtenerHabits = async () => {
    const data = await getData();
    if (data?.habits) {
      setHabits(data.habits);
    }
  };
  // 4. Fetch habits from Firestore
  useEffect (() => {
    obtenerHabits()
  }, []);

  // 11. Return the provider
  return (
    <HabitsContext.Provider value={{ habits, setHabits }}>
      {children}
    </HabitsContext.Provider>
  );
};

export default HabitsProvider;
