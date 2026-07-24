/*


Create a small utility program that:

1. Takes a user's full name and formats it using string methods.
2. Converts a price string into a number using parseFloat().
3. Rounds numbers using different Math methods.
4. Generates a random number between 1 and 100.
5. Displays the current date and time in a readable format.
6. Calculates the number of days remaining until New Year's Day.



*/

//! 1. Takes a user's full name and formats it using string methods.
const fullName = "satyam kumar";
const formattedName = fullName.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' ');
console.log("Formatted Name:", formattedName);

//! 2. Converts a price string into a number using parseFloat().
const priceString = "$123.45";
const priceNumber = parseFloat(priceString.replace('$', ''));
console.log("Price as Number:", priceNumber);


//! 3. Rounds numbers using different Math methods.
const number = 4.7;
console.log("Math.floor:", Math.floor(number));
console.log("Math.ceil:", Math.ceil(number));
console.log("Math.round:", Math.round(number));

//! 4. Generates a random number between 1 and 100.
const randomNumber = Math.floor(Math.random() * 100) + 1;
console.log("Random Number between 1 and 100:", randomNumber);



//! 5. Displays the current date and time in a readable format.
const currentDate = new Date();
console.log(currentDate)
console.log("Current Date and Time:", currentDate.toLocaleString());


//! 6. Calculates the number of days remaining until New Year's Day.
const newYear = new Date(currentDate.getFullYear() + 1, 0, 1);
const timeDifference = newYear - currentDate;
const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
console.log("Days Remaining until New Year's Day:", daysRemaining);