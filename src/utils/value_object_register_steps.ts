import {
  isEmpty,
  isString,
  isValidDate,
  isValidEmail,
  onlyLetters,
} from "./validations";

function validateEmail(value: string): string | undefined {
  let MAX_CHARACTER = 50;
  let MIN_CHARACTER = 13;

  if (isEmpty(value)) {
    return "Email is required";
  }
  if (!isString(value)) {
    return "Email must be a string";
  }
  if (!isValidEmail(value)) {
    return "Email must be a valid email";
  }
  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The email value must be less than 50 and greater than 13";
  }
}

function validateFullName(value: string): string | undefined {
  let MAX_CHARACTER = 50;
  let MIN_CHARACTER = 4;

  if (isEmpty(value)) {
    return "Full name is required";
  }
  if (!isString(value)) {
    return "The full name value must be a string";
  }
  if (!onlyLetters(value)) {
    return "The full name is not valid";
  }
  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The full name value must be less than 50 and greater than 4";
  }
}

function validateUserName(value: string): string | undefined {
  let MAX_CHARACTER = 50;
  let MIN_CHARACTER = 1;

  if (isEmpty(value)) {
    return "The userName value is required";
  }
  if (!isString(value)) {
    return "The userName value must be a string";
  }
  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The userName value must be less than 50 and greater than 1";
  }
}

function validatePhoneNumber(value: string): string | undefined {
  console.log("[VALIDADOR]", value, typeof value);
  let MAX_CHARACTER = 20;
  let MIN_CHARACTER = 12;

  if (isEmpty(value)) {
    return "Phone number is required";
  }
  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The phone number value must be less than 20 and greater than 12";
  }
}

function validateCountry(value: string): string | undefined {
  let MAX_CHARACTER = 50;
  let MIN_CHARACTER = 4;

  if (isEmpty(value)) {
    return "Country is required";
  }
  if (!isString(value)) {
    return "The country value must be a string";
  }
  if (!onlyLetters(value)) {
    return "The country is not valid";
  }

  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The country value must be less than 50 and greater than 4";
  }
}

function validateGender(value: string): string | undefined {
  if (isEmpty(value)) {
    return "Gender is required";
  }
}

function validateDateOfBirth(value: string): string | undefined {
  // Check for empty value
  if (isEmpty(value)) {
    return "Date of Birth is required";
  }

  // Validate date format (YYYY-MM-DD)
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(value)) {
    return "Invalid Date of Birth format. Use YYYY-MM-DD";
  }

  // Convert string to Date object (YYYY-MM-DD format assumed)
  const dateParts = value.split("-");
  const myDate = new Date(
    Number(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    Number(dateParts[2])
  );

  // Check for invalid date (e.g., February 31st)
  if (isNaN(myDate.getTime())) {
    return "Invalid Date of Birth";
  }

  // Get today's date
  const today = new Date();

  // Ensure the date is in the past
  if (myDate >= today) {
    return "Incorrect date of birth";
  }

  // Calculate age considering months and days (more accurate)
  let age = today.getFullYear() - myDate.getFullYear();
  const month = today.getMonth() - myDate.getMonth();

  // Adjust age if birthday hasn't passed this year
  if (month < 0 || (month === 0 && today.getDate() < myDate.getDate())) {
    age--;
  }

  // Minimum age validation (adjust as needed)
  if (age < 18) {
    return "Must be 18 years or older";
  }

  // If all checks pass, return undefined (no error)
  return undefined;
}

function validatePassword(value: string): string | undefined {
  let MAX_CHARACTER = 30;
  let MIN_CHARACTER = 8;

  if (isEmpty(value)) {
    return "Password is required";
  }

  if (value.length > MAX_CHARACTER || value.length < MIN_CHARACTER) {
    return "The password value must be less than 30 and greater than 8";
  }
}

export {
  validateEmail,
  validateUserName,
  validateFullName,
  validatePhoneNumber,
  validateCountry,
  validateGender,
  validateDateOfBirth,
  validatePassword
};
