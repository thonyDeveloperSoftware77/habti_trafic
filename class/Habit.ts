class Habit {
  public _id: string;
  public _name: string;
  public _description: string;
  public _daily: boolean;
  public _weekly: boolean;
  public _monthly: boolean;
  public _customize: boolean;
  public _customDays: string[];
  public _selectedTime: Date;
  public _completedDates: Date[];

  constructor(
    id: string,
    name: string,
    description: string,
    daily: boolean,
    weekly: boolean,
    monthly: boolean,
    customize: boolean,
    customDays: string[],
    selectedTime: Date,
    completedDates: Date[]
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._daily = daily;
    this._weekly = weekly;
    this._monthly = monthly;
    this._customize = customize;
    this._customDays = customDays;
    this._selectedTime = selectedTime;
    this._completedDates = completedDates;
  }

  // getters & setters

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get selectedTime(): Date {
    return this._selectedTime;
  }

  set selectedTime(selectedTime: Date) {
    this._selectedTime = selectedTime;
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

  get daily(): boolean {
    return this._daily;
  }

  set daily(daily: boolean) {
    this._daily = daily;
  }

  get weekly(): boolean {
    return this._weekly;
  }

  set weekly(weekly: boolean) {
    this._weekly = weekly;
  }

  get monthly(): boolean {
    return this._monthly;
  }

  set monthly(monthly: boolean) {
    this._monthly = monthly;
  }

  get customize(): boolean {
    return this._customize;
  }

  set customize(customize: boolean) {
    this._customize = customize;
  }

  get customDays(): string[] {
    return this._customDays;
  }

  set customDays(customDays: string[]) {
    this._customDays = customDays;
  }

  get completedDates(): Date[] {
    return this._completedDates;
  }

  set completedDates(completedDates: Date[]) {
    this._completedDates = completedDates;
  }
  

  // methods

  addCompletedDate(date: Date): void {
    this._completedDates.push(date);
  }

  removeCompletedDate(date: Date): void {
    const index = this._completedDates.indexOf(date);
    if (index > -1) {
      this._completedDates.splice(index, 1);
    }
  }

  getCompletedDates(): Date[] {
    return this._completedDates;
  }
}

export default Habit;
