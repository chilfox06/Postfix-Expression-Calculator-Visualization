import { StackArray, ViewData, Op } from "./types";

class StackAnimationManager
{
    prevData: ViewData;
    baseHTML: string;

    constructor()
    {
        this.prevData = {stack: [], left: null, right: null, ans: null, operator: null};
        this.baseHTML = `
        <div>
        
        
        `
    }
}


function updateView(data: ViewData): void
{
    
}