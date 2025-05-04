(() => {
    let n = 0;
    document.querySelector<HTMLDivElement>('.titleBar')!.onclick = e => {
         n++;
         if (n == 10) document.getElementById("app")!.style = `background-image: url(../easteregg.png);background-size: contain;`
        }
    })();