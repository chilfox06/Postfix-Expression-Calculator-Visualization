(() => {
    let n = 0;
    document.querySelector<HTMLDivElement>('.titleBar')!.onclick = () => {
         n++;
         if (n == 10) 
        {
            document.getElementById("app")!.style.backgroundImage = 'url(../easteregg.png)';
            document.getElementById("app")!.style.backgroundSize = 'contain';
        }
        }
    })();