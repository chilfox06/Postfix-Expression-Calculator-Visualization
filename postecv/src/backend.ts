// // === 假設的 UI 更新函數 ===
// function UpdateView(stack: (number | string)[]): void {
//     console.log("View updated:", stack);
// }

// function UpdateAnswer(answer: number | (number | string | null)[]): void {
//     console.log("Answer updated:", answer);
// }

// === Stack 結構與操作 ===
const stack: (number | string)[] = [];

function Push(value: number | string): void {
    stack.push(value);
    UpdateView(stack);
}

function Pop(): number | string{
    const value = stack.pop();
    UpdateView(stack);
    if (value === undefined) {
        throw new Error("Stack is empty! Cannot Pop.");
    }
    return value;
}

function Top(): number | string | undefined {
    return stack[stack.length - 1];
}

// === 主函數：求值 postfix 表達式 ===
function Solve(expression: string): void {
    // 清空 stack
    stack.length = 0;

    const tokens = expression.split(" ");

    for (const token of tokens) {
        if (!isNaN(Number(token))) {
            // 是數字
            Push(Number(token));
        } else {
            // 是運算符號
            UpdateAnswer([null, token, null]);
            const b = Pop();
            UpdateAnswer([NaN, token, b]);
            const a = Pop();
            UpdateAnswer([a, token, b]);

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

            UpdateAnswer(result);
            Push(result); // 可以改成最後一個不要 push
            UpdateAnswer([null, null, null]);
        }
    }

    const finalResult = Pop();
    if (typeof finalResult === "number") {
        UpdateAnswer(finalResult);
    } else {
        throw new Error("Evaluation did not result in a number!");
    }
}
