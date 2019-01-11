/* Export direct. */
export default function (number) {
    return {
        round: Math.round(number),
        floor: Math.floor(number),
        ceil: Math.ceil(number)
    };
}
/* Export nommé `addition`. */
export function addition(number1, number2) {
    return number1 + number2;
}
/* Export nommé `substraction`. */
export function substraction(number1, number2) {
    return number1 - number2;
}
/* Export nommé `multiplication`. */
export function multiplication(number1, number2) {
    return number1 * number2;
}
/* Export nommé `division`. */
export function division(number1, number2) {
    return number1 / number2;
}