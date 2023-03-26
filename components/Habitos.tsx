import styles from "../src/styles/Home.module.css";
import { addHabit, deleteHabit, updateHabit } from "../Functions/funciones";
import { useState, useRef, useContext, useEffect } from "react";
import Habit from "../class/Habit";
import { HabitsContext } from "../context/HabtisContext";
import Modal from "react-modal"
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
import DayOfWeekSelector from "./DayOfWeekSelector";
import React from "react";

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


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [habitToEdit, setHabitToEdit] = useState<Habit | null>(null);
    const [selectedOption, setSelectedOption] = useState('daily');
    const [selectedTime, setSelectedTime] = useState(new Date());

    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    //Use state for frequncy
    const [isDaily, setIsDaily] = useState(true);
    const [isWeekly, setIsWeekly] = useState(false);
    const [isMonthly, setIsMonthly] = useState(false);
    const [isCustomize, setIsCustomize] = useState(false);



    const handleDayOfWeekChange = (selected: string[]) => {
        setSelectedDays(selected);
    };
    function handleSelectChange(event: any) {
        const value = event.target.value;
        if (value === 'daily') {
            setIsDaily(true);
            setIsWeekly(false);
            setIsMonthly(false);
            setIsCustomize(false);
        } else if (value === 'weekly') {
            setIsDaily(false);
            setIsWeekly(true);
            setIsMonthly(false);
            setIsCustomize(false);
        } else if (value === 'monthly') {
            setIsDaily(false);
            setIsWeekly(false);
            setIsMonthly(true);
            setIsCustomize(false);
        } else if (value === 'customize') {
            setIsDaily(false);
            setIsWeekly(false);
            setIsMonthly(false);
            setIsCustomize(true);
        }
        setSelectedOption(value);
    }

    const handleTimeChange = (time: Date | null) => {
        if (time) {
            setSelectedTime(time);
        }
    };

    const handleEditHabit = (habit: Habit) => {
        setIsModalOpen(true);
        setHabitToEdit(habit);
    };

    const initialDays: Date[] = [];


    const handleAddHabit = () => {
        const name = nameRef.current?.value ?? "";
        const description = descriptionRef.current?.value ?? "";

        const frequency = frequencyRef.current?.value ?? "";
        const habit = new Habit(Math.random().toString(), name, description, isDaily, isWeekly, isMonthly, isCustomize, selectedDays, selectedTime, []);
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
                                            <div>
                                                <label htmlFor="select-option">Select option:</label>
                                                <select id="select-option" value={selectedOption} onChange={handleSelectChange}>
                                                    <option value="daily">Daily</option>
                                                    <option value="weekly">Weekly</option>
                                                    <option value="monthly">Monthly</option>
                                                    <option value="customize">Customize</option>
                                                </select>
                                                {selectedOption === 'customize' ? (
                                                    <div>
                                                        <h2>Select days of the week</h2>
                                                        <DayOfWeekSelector onChange={handleDayOfWeekChange} />
                                                        <p>Selected days: {selectedDays.join(", ")}</p>
                                                    </div>

                                                ) : null}
                                            </div>
                                            <div>
                                                <label>Recordatorio:</label>
                                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                    <KeyboardTimePicker
                                                        margin="normal"
                                                        id="time-picker"
                                                        label="Time picker"
                                                        value={selectedTime}
                                                        onChange={handleTimeChange}
                                                        KeyboardButtonProps={{
                                                            'aria-label': 'change time',
                                                        }}
                                                    />
                                                </MuiPickersUtilsProvider>
                                            </div>



                                            <button onClick={() => {
                                                if (habitToEdit) {
                                                    updateHabit(
                                                        new Habit(habitToEdit._id ?? "", nameEditRef.current?.value ?? "", descriptionEditRef.current?.value ?? "", isDaily, isWeekly, isMonthly, isCustomize, selectedDays, selectedTime, habitToEdit._completedDates),
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
                    <div>
                        <label htmlFor="select-option">Select option:</label>
                        <select id="select-option" value={selectedOption} onChange={handleSelectChange}>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                            <option value="customize">Customize</option>
                        </select>
                        {selectedOption === 'customize' ? (
                            <div>
                                <h2>Select days of the week</h2>
                                <DayOfWeekSelector onChange={handleDayOfWeekChange} />
                                <p>Selected days: {selectedDays.join(", ")}</p>
                            </div>

                        ) : null}
                    </div>
                    <div>
                        <label>Recordatorio:</label>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardTimePicker
                                margin="normal"
                                id="time-picker"
                                label="Time picker"
                                value={selectedTime}
                                onChange={handleTimeChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>

                    <button onClick={() => handleAddHabit()}>Agregar</button>
                </div>
                <div>


                </div>
            </div>
        </>
    )
}

export default Habitos;
