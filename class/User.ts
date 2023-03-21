import Habit from "./Habit";

class User {
    private _id: number;
    private _name: string;
    private _email: string;
    private _habits: Habit[];
  
    constructor(id: number, name: string, email: string, habits: Habit[]) {
      this._id = id;
      this._name = name;
      this._email = email;
      this._habits = habits;
    }
  
    get id(): number {
      return this._id;
    }
  
    set id(id: number) {
      this._id = id;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(name: string) {
      this._name = name;
    }
  
    get email(): string {
      return this._email;
    }
  
    set email(email: string) {
      this._email = email;
    }
  
    get habits(): Habit[] {
      return this._habits;
    }
  
    set habits(habits: Habit[]) {
      this._habits = habits;
    }
  
    addHabit(habit: Habit): void {
      this.habits.push(habit);
    }
  
    removeHabit(habit: Habit): void {
      const index = this.habits.indexOf(habit);
      if (index > -1) {
        this.habits.splice(index, 1);
      }
    }
  
    getHabits(): Habit[] {
      return this.habits;
    }
  }

  export default User;