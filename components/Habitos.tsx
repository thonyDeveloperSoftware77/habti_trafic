import styles from "../src/styles/Home.module.css";
import { addHabit, deleteHabit, updateHabit } from "../Functions/funciones";
import { useState, useRef, useContext, useEffect } from "react";
import Habit from "../class/Habit";
import { HabitsContext } from "../context/HabtisContext";
import Modal from "react-modal"

interface HabitosProps {
    uid: string;
}

function Habitos(props: HabitosProps) {

    const { habits, setHabits } = useContext(HabitsContext);
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const frequencyRef = useRef<HTMLInputElement>(null);

    const nameEditRef = useRef<HTMLInputElement>(null);
    const descriptionEditRef = useRef<HTMLInputElement>(null);
    const frequencyEditRef = useRef<HTMLInputElement>(null);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);

    const handleEditHabit = (habit: Habit) => {
        setIsModalOpen(true);
        setHabitToEdit(habit);
    };

    const handleAddHabit = () => {
        const name = nameRef.current?.value ?? "";
        const description = descriptionRef.current?.value ?? "";
        const frequency = frequencyRef.current?.value ?? "";
        const habit = new Habit(Math.random().toString(), name, description, frequency, []);
        if (name == "" || description == "" || frequency == "") {
            alert("Llena todos los campos");
        } else {
            addHabit(habit, props.uid, habits, setHabits);
        }
    };

    const handleDeleteHabit = (habitId: string) => {
        deleteHabit(habitId, props.uid, habits, setHabits);
    }

    useEffect(() => {
        console.log(habits);
    }, [habits]);

    return (
        <>
            <div>
                <div>
                    <h2>Tus habitos</h2>
                    <ul>
                        {habits.map((habit) => (
                            <div>
                                <li key={habit._id}>{habit._name + "\nDescipcion" + habit._description}</li>

                                <button onClick={() => handleDeleteHabit(habit._id)}>Eliminar</button>
                                <Modal isOpen={isModalOpen} ariaHideApp={false}>
                                    {habitToEdit && (
                                        <div style={{ backgroundColor: "black" }}>
                                            <h2>Editar Hábito</h2>
                                            <label>Nombre:</label>
                                            <input type="text" ref={nameEditRef} defaultValue={habitToEdit._name} />
                                            <br />
                                            <label>Descripción:</label>
                                            <input type="text" ref={descriptionEditRef} defaultValue={habitToEdit._description} />
                                            <br />
                                            <label>Frecuencia:</label>
                                            <input type="text" ref={frequencyEditRef} defaultValue={habitToEdit._frequency} />
                                            <br />


                                            <button onClick={() => {
                                                if (habitToEdit) {
                                                    updateHabit(
                                                        new Habit( habitToEdit._id ?? "", nameEditRef.current?.value ?? "", descriptionEditRef.current?.value ?? "", frequencyEditRef.current?.value ?? "", habitToEdit._completedDates),
                                                        props.uid,
                                                        habits,
                                                        setHabits
                                                    );
                                                }
                                                setIsModalOpen(false);
                                            }}>Guardar cambios</button>
                                        </div>
                                    )}
                                </Modal>
                                <button onClick={() => handleEditHabit(habit)}>Editar</button>
                            </div>

                        ))}

                    </ul>
                </div>
                <div>
                    <h2>Tus habitos</h2>

                    <h2>Añadir un habito</h2>
                    <span>Nombre del habito</span>
                    <input type="text" ref={nameRef} />
                    <span>Descripcion</span>
                    <input type="text" ref={descriptionRef} />
                    <span>Frecuencia</span>
                    <input type="text" ref={frequencyRef} />

                    <button onClick={() => handleAddHabit()}>Agregar</button>
                </div>
                <div>


                </div>
            </div>
        </>
    )
}

export default Habitos;
