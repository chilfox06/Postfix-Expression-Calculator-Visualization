import { Solve, manager } from "./backend";
const app = document.getElementById("app");

if (app) {
  Object.assign(document.body.style, {
    margin: "0",
    padding: "0",
    height: "100vh",
    display: "flex",
    alignItems: "center",         // center vertically
    justifyContent: "flex-start", // align left
    // paddingLeft: "15vw",          // move from the left
    backgroundColor: "#f0f0f0",
    fontFamily: "Consolas, monospace", // Changed font
    fontSize: "18px",   
  });
  

  // Main container
  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.flexDirection = "column";
  container.style.alignItems = "center";
  container.style.background = "#ffffff";
  container.style.padding = "40px";
  container.style.borderRadius = "12px";
  container.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";

  // Input box
  const inputBox = document.createElement("input");
  inputBox.id = "inputBox";
  inputBox.readOnly = true;
  Object.assign(inputBox.style, {
    width: "320px",
    height: "50px",
    fontSize: "24px",
    padding: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "12px",
    textAlign: "left",
    fontFamily: "Consolas, monospace",
  });
  container.appendChild(inputBox);

  // Cursor/crosshair for showing current processing token
  const cursor = document.createElement("div");
  Object.assign(cursor.style, {
    position: "absolute",
    height: "20px",
    width: "1.5px",
    backgroundColor: "red",
    top: inputBox.offsetTop + "68px",
    transition: "left 0.2s ease",
  });
  container.appendChild(cursor);
  container.style.position = "relative";

  // Keyboard
  const keyboard = document.createElement("div");
  keyboard.style.display = "grid";
  keyboard.style.gridTemplateColumns = "repeat(4, 70px)";
  keyboard.style.gap = "15px";

  const keys = [
    "1", "2", "3", "+", 
    "4", "5", "6", "-", 
    "7", "8", "9", "*",
    "AC", "0", "SPACE", "/", 
    "DEL", "ENT", "PST", "mov"];
  
  keyboard.style.gridTemplateColumns = "repeat(4, 70px)"; // still 4 for now

  // Display area for finalized input
  const resultDisplay = document.createElement("div");
  resultDisplay.style.marginTop = "12px";
  resultDisplay.style.fontSize = "20px";
  resultDisplay.style.fontWeight = "bold";
  resultDisplay.style.color = "#333";
  container.appendChild(resultDisplay);
  
  let inputFinalized = false;

  function moveCursorToToken(index: number) {
    const tokens = inputBox.value.split(" ");
    const rawText = inputBox.value;
  
    // Calculate index `index`-th token
    let charIndex = 0;
    for (let i = 0; i < index && i < tokens.length; i++) {
      charIndex += tokens[i].length + 1;
    }
    charIndex++;
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    ctx.font = "24px Consolas";
  
    const textBefore = rawText.substring(0, charIndex);
    const textWidth = ctx.measureText(textBefore).width;
  
    const paddingLeft = parseInt(window.getComputedStyle(inputBox).paddingLeft, 10);
    
    cursor.style.left = (inputBox.offsetLeft + paddingLeft + textWidth) + "px";
  }  
  
  //keys on board
  keys.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = key === "SPACE" ? "␣" : key;
    Object.assign(btn.style, {
      padding: "15px",
      fontSize: "24px",
      borderRadius: "8px",
      border: "1px solid #aaa",
      backgroundColor: "#e0e0e0",
      cursor: "pointer",
      transition: "background-color 0.2s",
      fontFamily: "Consolas, monospace",
    });
    
    btn.onmouseover = () => (btn.style.backgroundColor = "#d0d0d0");
    btn.onmouseout = () => {
      btn.style.backgroundColor = "#e0e0e0";
    };
    
    let i = 0;
    moveCursorToToken(0);

    btn.onclick = async () => { 
      if (key === "DEL") {
        if (!inputFinalized) inputBox.value = inputBox.value.slice(0, -1);
      } else if (key === "SPACE") {
        if (!inputFinalized && !inputBox.value.endsWith(" ")) {
          inputBox.value += " ";
        }
      } else if (key === "ENT") {
        inputFinalized = true;
        Solve(inputBox.value);
        // resultDisplay.textContent = `${inputBox.value}`;
      } else if (key === "AC") {
        moveCursorToToken(0);
        manager.reset();
        inputFinalized = false;
        inputBox.value = "";
        resultDisplay.textContent = null;
      }  else if (key === "PST") {
        try {
          const text = await navigator.clipboard.readText();
          if (!inputFinalized) inputBox.value += text;
        } catch (err) {
          alert("Clipboard access denied. Please allow clipboard permissions.");
        }
      } else if(key === "mov") { //test
        moveCursorToToken(i);
        i++;
      } else {
        if (!inputFinalized) {
          inputBox.value += key;
        } 
      }
    };

    keyboard.appendChild(btn);
  });

  container.appendChild(keyboard);
  app.appendChild(container);
} else {
  console.error("App container not found.");
}
// inputBox.value

