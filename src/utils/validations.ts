function isEmpty(value: string | number): boolean {
    
    if (typeof value === "string") {
        return !value.trim()
    }

    if (typeof value === "number") {
        const numberToString = value.toString()
        return !numberToString.trim()
    }

    return false
}

function isNumber(value: number): boolean {   
    if (typeof value !== "number") {
        return false
    }
    return true
}

function isString(value: string) {
    if(typeof value !== "string") {
        return false
    }
    return true
}

function isValidEmail(email: string): boolean {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function onlyLetters(str: string): boolean {
    const regex = /^[a-zA-Z ]+$/;
    return regex.test(str);
}

function isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
}
  

export { isEmpty, isNumber, isString, isValidEmail, onlyLetters, isValidDate }
