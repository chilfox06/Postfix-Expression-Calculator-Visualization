/*
  import them with syntax:

  import {[type1], [type2], ..., [typen]} from './types.ts'

*/

export type StackArray = number[]; 
/*
  like C typedef
  Define StackArray as an Array contains only numbers.
  (note: In JS/TS, both int and float count as type 'number')
*/

export type Op = '+' | '-' | '*' | '/';
/*
  Restricting Op to only be those 4 char. (string actually)
*/

export interface ViewData
{
    stack:    StackArray; // can be empty array
    left:     number | null;
    right:    number | null;
    operator: Op | null;
    ans:      number | null;
}
/*
  like C struct, but the syntax is
  [name]: [type];
*/

export type Expression = (number | Op)[];