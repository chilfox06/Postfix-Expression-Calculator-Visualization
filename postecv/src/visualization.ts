import './stackAnimation.css'
import './easteregg.ts'

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

class NumberNode
{
    element: HTMLDivElement;
    number: number;

    constructor(n: number)
    {
        this.element = document.createElement('div');
        this.element.classList.add('numberNode');
        this.number = n;
        this.element.innerText = n.toString();
        this.setFontSize();
    }

    setNumber(n: number)
    {
        this.number = n;
        this.element.innerText = n.toString();
        this.setFontSize();
    }

    setPositon(top: number, left: number)
    {
        this.element.style.top = `${top}%`;
        this.element.style.left = `${left}%`;
        this.element.style.opacity = "100%";
    }

    setFontSize(mul: number = 1)
    {
        const charCount = this.number.toString().length;
        const baseSize = 30;

        if (charCount > 4)
        {
            this.element.style.fontSize = `${mul * baseSize * 4 / charCount}px`;
        }
    }

    del()
    {
        this.element.remove();
    }
}

export class StackAnimationManager
{
    numberNode: {stack: NumberNode[], left: NumberNode|null, right: NumberNode|null, ans: NumberNode|null};
    container: HTMLDivElement;
    stack: HTMLDivElement;
    operatorBubble: HTMLDivElement;
    
    static positions: {[p: string]: [number, number]} = {
        "ans": [15, 50],
        "left": [15, 25],
        "right": [15, 75],
        "stackBottom": [83, 50]
    };
    static delayTime: number = 750;

    constructor()
    {
        this.numberNode = {stack:[], left: null, right: null, ans: null};

        this.container = document.createElement('div');
        this.container.classList.add('SAContainer');

        this.stack = document.createElement('div');
        this.stack.classList.add('SAStack');
        this.container.appendChild(this.stack);

        this.operatorBubble = document.createElement('div');
        this.operatorBubble.classList.add('operatorBubble');
        this.container.appendChild(this.operatorBubble);

        document.querySelector("#app")!.appendChild(this.container);
    }

    async UpdatePush(n: number)
    {
        if (this.numberNode.ans)
        {
            this.numberNode.ans.del();
        }
        const node = new NumberNode(n);
        this.numberNode.stack.push(node);
        this.container.appendChild(node.element);

        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);

        const pos = StackAnimationManager.positions['stackBottom'];
        node.setPositon(pos[0] - 10 * (this.numberNode.stack.length - 1), pos[1]);

        await delay(StackAnimationManager.delayTime);
    }

    async UpdatePopToLeft()
    {
        this.numberNode.left = this.numberNode.stack.pop()!;
        this.numberNode.left.setPositon(...StackAnimationManager.positions['left']);

        await delay(StackAnimationManager.delayTime);
    }

    async UpdatePopToRight()
    {
        this.numberNode.right = this.numberNode.stack.pop()!;
        this.numberNode.right.setPositon(...StackAnimationManager.positions['right']);

        await delay(StackAnimationManager.delayTime);
    }

    async UpdateToken(op: string)
    {
        if (op == '*') op = '×';
        if (op == '/') op = '÷';
        this.operatorBubble.innerText = op;
        this.operatorBubble.style.opacity = "100%";
        
        await delay(StackAnimationManager.delayTime);
    }

    async UpdateResult(n: number)
    {
        this.numberNode.left!.setPositon(...StackAnimationManager.positions['ans']);
        this.numberNode.left!.element.style.opacity = "0%";
        this.numberNode.right!.setPositon(...StackAnimationManager.positions['ans']);
        this.numberNode.right!.element.style.opacity = "0%";
        this.operatorBubble.style.opacity = "";

        const node = new NumberNode(n);
        this.numberNode.ans = node;
        node.element.classList.add('numberNodeResult');
        this.container.appendChild(node.element);

        await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
            
        this.numberNode.ans.setPositon(...StackAnimationManager.positions['ans']);

        await delay(StackAnimationManager.delayTime);

        this.numberNode.left!.del();
        this.numberNode.right!.del();
    }

    async UpdateAnswer(n: number)
    {
        await this.UpdateResult(n);

        this.stack.style.opacity = "0";

        this.numberNode.ans!.setPositon(50, 50);
        this.numberNode.ans!.setFontSize(3);
    }

    reset(): void
    {
        this.stack.style.opacity = "";

        for (const n of this.numberNode.stack) n.del();
        this.numberNode.stack = [];

        if (this.numberNode.left) this.numberNode.left.del();
        this.numberNode.left = null;

        if (this.numberNode.right) this.numberNode.right.del();
        this.numberNode.right = null;

        if (this.numberNode.ans) this.numberNode.ans.del();
        this.numberNode.ans = null;
    }
}

/* below is the test code.
paste it into main.ts to see the result

import { StackAnimationManager } from './visualization'

const sam = new StackAnimationManager();

async function main()
{
    await sam.UpdatePush(2);
    await sam.UpdatePush(1);
    await sam.UpdateToken('+');
    await sam.UpdatePopToRight();
    await sam.UpdatePopToLeft();
    await sam.UpdateResult(3);
    await sam.UpdatePush(3);
}

main();
*/