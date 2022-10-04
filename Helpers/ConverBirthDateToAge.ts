
 export const ConvertBirthDateToAge = (date: string) : number => {
    const tmpDate: Date = new Date(date)
    const deltaDate: number = Date.now() - tmpDate.getTime();
    const age: number = new Date(deltaDate).getFullYear() - 1970;
    return age;
  }

