class Habit {
    public _id: string;
    public _name: string;
    public _description: string;
    public _frequency: string;
    public _completedDates: Date[];
  
    constructor(id: string, name: string, description: string, frequency: string, completedDates: Date[]) {
      this._id = id;
      this._name = name;
      this._description = description;
      this._frequency = frequency;
      this._completedDates = completedDates;
    }
  
    get id(): string {
      return this._id;
    }
  
    set id(id: string) {
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