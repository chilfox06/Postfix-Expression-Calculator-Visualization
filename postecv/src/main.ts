
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
    await sam.UpdatePush(4);
    await sam.UpdateToken('-');
    await sam.UpdatePopToRight();
    await sam.UpdatePopToLeft();
    await sam.UpdateAnswer(-1);
}

main();