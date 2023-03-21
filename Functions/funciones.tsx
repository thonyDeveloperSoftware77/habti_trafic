import React, { useContext } from "react"; import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import { HabitsContext } from "../context/HabtisContext";
import { collection, onSnapshot, updateDoc, deleteDoc, doc, runTransaction } from "firebase/firestore";
import db from "../public/db";
import Habit from "../class/Habit";



// función para agregar un nuevo hábito
export const addHabit = async (habit: Habit, userId: string, habits: Habit[], setHabits: React.Dispatch<React.SetStateAction<Habit[]>>) => {
  try {
    // creamos un nuevo documento para el hábito en la colección de hábitos del usuario
    const userDocRef = doc(db, `users/${userId}`);
    await updateDoc(userDocRef, {
      habits: firebase.firestore.FieldValue.arrayUnion({
        _id: habit.id,
        _name: habit.name,
        _description: habit.description,
        _frequency: habit.frequency,
        _completedDates: habit.completedDates,
      }),
    });
    // creamos un nuevo objeto Habit con todas sus propiedades
    const newHabit: Habit = new Habit(
      habit.id,
      habit.name,
      habit.description,
      habit.frequency,
      habit.completedDates
    );


    // actualizamos el estado global de hábitos con el nuevo hábito
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  } catch (error) {
    console.error("Error adding habit: ", error);
  }
};


export const updateHabit = async (
  habit: Habit,
  userId: string,
  habits: Habit[],
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>
) => {
  try {
    // buscamos el índice del hábito a actualizar en la lista de hábitos
    const habitIndex = habits.findIndex((h) => h._id === habit._id);
    if (habitIndex === -1) {
      throw new Error(`Habit with id ${habit._id} not found.`);
    }

    // actualizamos el documento correspondiente en la colección de hábitos del usuario
    const userDocRef = doc(db, `users/${userId}`);

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      const userData = userDoc.data();
      if (!userData || !userData.habits) {
        throw new Error("User data not found.");
      }

      // creamos una copia del arreglo de hábitos y actualizamos el elemento deseado
      const newHabits = [...userData.habits];
      const habitData = {
        _id: habit._id,
        _name: habit._name,
        _description: habit._description,
        _frequency: habit._frequency,
        _completedDates: habit._completedDates
      };
      newHabits[habitIndex] = habitData;

      // actualizamos el arreglo de hábitos en Firestore
      transaction.update(userDocRef, { habits: newHabits });
    });

    // actualizamos el hábito en el estado global de hábitos
    setHabits((prevHabits) => {
      const newHabits = [...prevHabits];
      newHabits[habitIndex] = habit;
      return newHabits;
    });
  } catch (error) {
    console.error("Error updating habit: ", error);
  }
};

export const deleteHabit = async (
  habitId: string,
  userId: string,
  habits: Habit[],
  setHabits: React.Dispatch<React.SetStateAction<Habit[]>>
) => {
  try {
    // buscamos el índice del hábito a eliminar en la lista de hábitos
    const habitIndex = habits.findIndex((h) => h._id === habitId);
    if (habitIndex === -1) {
      throw new Error(`Habit with id ${habitId} not found.`);
    }

    // eliminamos el documento correspondiente en la colección de hábitos del usuario
    const userDocRef = doc(db, `users/${userId}`);

    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(userDocRef);
      const userData = userDoc.data();
      if (!userData || !userData.habits) {
        throw new Error("User data not found.");
      }

      // creamos una copia del arreglo de hábitos y eliminamos el elemento deseado
      const newHabits = [...userData.habits];
      newHabits.splice(habitIndex, 1);

      // actualizamos el arreglo de hábitos en Firestore
      transaction.update(userDocRef, { habits: newHabits });
    });

    // eliminamos el hábito del estado global de hábitos
    setHabits((prevHabits) => {
      const newHabits = [...prevHabits];
      newHabits.splice(habitIndex, 1);
      return newHabits;
    });
  } catch (error) {
    console.error("Error deleting habit: ", error);
  }
};