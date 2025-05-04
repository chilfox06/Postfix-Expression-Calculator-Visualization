import { StackAnimationManager } from "./visualization";

export const manager = new StackAnimationManager();

// === 假設的 UI 更新函數 ===
// function UpdateView(stack: (number | string)[]): void {
//     console.log("View updated:", stack);
// }

// function UpdateAnswer(answer: number | (number | string | null)[]): void {
//     console.log("Answer updated:", answer);
// }

// === Stack 結構與操作 ===
const stack: (number | string)[] = [];

async function Push(value: number) {
    stack.push(value);
    await manager.UpdatePush(value);
}

function Pop(): number | string {
    const value = stack.pop();
    if (value === undefined) {
        throw new Error("Stack is empty! Cannot Pop.");
    }
    return value;
}

function DigitCount(n: number): number {
    if (n === 0) return 1;
    return Math.floor(Math.log10(Math.abs(n))) + 1;
}

// function Top(): number | string | undefined {
//     return stack[stack.length - 1];
// }

// === 主函數：求值 postfix 表達式 ===
export async function Solve(expression: string){
    // 清空 stack
    stack.length = 0;

    const tokens = expression.split(" ");

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (!isNaN(Number(token))) {
            // 是數字
            await Push(Number(token));
            // ArrowMoveRight(DigitCount(Number(token)) + 1); // +1 是為了空格
        } else {
            // 是運算符號
            // ArrowMoveRight(2);
            await manager.UpdateToken(token);
            const b = Pop();
            await manager.UpdatePopToRight();
            const a = Pop();
            await manager.UpdatePopToLeft();

            if (typeof a !== "number" || typeof b !== "number") {
                throw new Error("Invalid expression!");
            }

            let result: number;

            switch (token) {
                case "+":
                    result = a + b;
                    break;
                case "-":
                    result = a - b;
                    break;
                case "*":
                    result = a * b;
                    break;
                case "/":
                    result = a / b;
                    break;
                default:
                    throw new Error(`Unsupported operator: ${token}`);
            }

            if (i !== tokens.length - 1) {
                await manager.UpdateResult(result);
                await Push(result); // 如果不是最後一個 result，才 push 回去
            }
            else
            {
                await manager.UpdateAnswer(result);
            }
        }
    }

    // const finalResult = Pop();
    // if (typeof finalResult === "number") {
    //     await manager.UpdateAnswer(finalResult);
    // } else {
    //     throw new Error("Evaluation did not result in a number!");
    // }
}

// // To-do:
// ```typescript
// UpdatePush(n: number) // the number being pushed into stack

// UpdatePopToLeft() // Pop the top of stack and move to left

// UpdatePopToRight() // Pop the top of stack and move to right

// UpdateToken(op: string) // show the operator

// UpdateResult(n: number|null) // show/hide the calculated result
// ``` - 實作一個向右移動箭頭函式;