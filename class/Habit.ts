class Habit {
    private _id: number;
    private _name: string;
    private _description: string;
    private _frequency: string;
    private _completedDates: Date[];
    private _userId: number;
  
    constructor(id: number, name: string, description: string, frequency: string, completedDates: Date[], userId: number) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._frequency = frequency;
      this._completedDates = completedDates;
      this._userId = userId;
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
  
    get description(): string {
      return this._description;
    }
  
    set description(description: string) {
      this._description = description;
    }
  
    get frequency(): string {
      return this._frequency;
    }
  
    set frequency(frequency: string) {
      this._frequency = frequency;
    }
  
    get completedDates(): Date[] {
      return this._completedDates;
    }
  
    set completedDates(completedDates: Date[]) {
      this._completedDates = completedDates;
    }
  
    get userId(): number {
      return this._userId;
    }
  
    set userId(userId: number) {
      this._userId = userId;
    }
  
    addCompletedDate(date: Date): void {
      this.completedDates.push(date);
    }
  
    removeCompletedDate(date: Date): void {
      const index = this.completedDates.indexOf(date);
      if (index > -1) {
        this.completedDates.splice(index, 1);
      }
    }
  
    getCompletedDates(): Date[] {
      return this.completedDates;
    }
  }
  export default Habit;