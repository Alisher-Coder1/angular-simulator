// Interfaces

export interface IUser {
    id: number;
    name: string;
    age: number;
    isActive:boolean;
    email?: string;
}

export interface IDeveloper extends IUser {
    specialization: string;
    experienceYears: number;
}

// Variables

export type TStatus = "loading" | "success" | "error";
export type TTextFormat = "uppercase" | "lowercase"| "capitalize";

export const status: TStatus = "loading";
export const textFormat: TTextFormat = "capitalize";

// Functions

//Принимает два числа и возвращает их сумму.
export function getSum(firstNumber: number, secondNumber: number): number {
    return firstNumber + secondNumber;
}

//Принимает строку и формат,
//Возвращает строку в нужном формате: uppercase, lowercase или capitalize.
export function formatText(text: string, format: TTextFormat): string {
    if (format === "uppercase") {
        return text.toUpperCase();
    }

    if (format === "lowercase") {
        return text.toLowerCase();
    }

    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

//Принимает строку и символ и возвращает строку без указанного символа.
export function removeSymbol(text: string, symbol: string): string {
    if (symbol === "") {
        return text;
    }
    return text.split(symbol).join("");
}

// Arrays
//Массив пользователей, каждый объект соответствует интерфейсу IUser.
export const users: IUser[] = [
    {
        id: 1,
        name: "Abbos",
        age: 35,
        isActive: true,
        email: "abbos@example.com",
    },
    {
        id: 2,
        name: "Vlad",
        age: 25,
        isActive: false,
    },
    {
        id: 3,
        name: "Anna",
        age: 29,
        isActive: true,
        email: "anna@example.com"
    },
];

//Создает новый массив только из активных пользователей.
export const activeUsers: IUser[] = 
users.filter((user: IUser): boolean => {
    return user.isActive;
});

// Check results

console.log("Sum:", getSum(10,20));
console.log("Status:", status);
console.log("Text format:", textFormat);
console.log("Formatted text:", formatText("hello world", textFormat));
console.log("Text without symbol:", removeSymbol("hello world", "l"));
console.log("Active users:", activeUsers);
