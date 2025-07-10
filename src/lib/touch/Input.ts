export enum FilterToInputType {
    Number, Text, Integer, FloatingPoint
}

export enum InputFeedback {
    NaN = "The input provided is not a number!",
    NotInt = "The input provided is not an integer!",
    NotFloat = "The input provided is not a decimal value!",
    InvalidCharacters = "The input provided has invalid characters!",

    Correct = "The input provided is valid.",
    
}

export interface ValidityResult {
    valid: boolean;
    feedback: InputFeedback
}

export const validState = { valid: true, feedback: InputFeedback.Correct };

export function checkInputValidity (input:string, filterTo:FilterToInputType): ValidityResult {

    // ? If the input is empty, return a valid state
    if (input.length === 0) return validState;
    
    switch(filterTo) {
        case FilterToInputType.Number:
            return checkNumberValidity({floatingPoint: true, integer: true, testNumber: input});
        case FilterToInputType.Integer:
            return checkNumberValidity({floatingPoint: false, integer: true, testNumber: input});
        case FilterToInputType.FloatingPoint:
            return checkNumberValidity({floatingPoint: true, integer: false, testNumber: input});
        default:
            // ? If no specific filter is applied
            return validState;
    }
}

export function checkNumberValidity({floatingPoint, integer, testNumber} : {floatingPoint: boolean; integer: boolean, testNumber: string}): ValidityResult {
    // ! Check one: Is it a number?
    // @ts-ignore
    if (isNaN(testNumber)) {
        return { valid: false, feedback: InputFeedback.NaN };
    }

    // ! Check two: Does it conform to floating point and integer form requirements?
    

    // ? If the number can be either a floating point or an integer, its already valid
    if (floatingPoint && integer) return validState;

    const num = parseFloat(testNumber);

    // ? If the number can only be a floating point
    if (floatingPoint && !integer &&
        (num % 1 === 0) // ? All decimal values when modulo to 1, return a non-zero value
    ) return { valid: false, feedback: InputFeedback.NotFloat };

    // ? If the number can only be an integer
    if (!floatingPoint && integer &&
        (num % 1 !== 0) // ? All decimal values when modulo to 1, return a non-zero value
    ) return { valid: false, feedback: InputFeedback.NotInt }

    return validState; // ? All tests passed, return a valid state
}

export function deduceIconType(filter: FilterToInputType): string | undefined {
    // TODO get icons
    switch(filter) {
        case FilterToInputType.FloatingPoint:
            return 'speed_0_5';
        case FilterToInputType.Integer:
            return 'tag';
        case FilterToInputType.Text:
            return 'format_size';
        case FilterToInputType.Number:
            return 'speed_1_5';
        default:
            return undefined;
    }
}