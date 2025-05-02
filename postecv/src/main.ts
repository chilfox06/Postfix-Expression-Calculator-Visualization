const app = document.getElementById("app");

if (app) {
  Object.assign(document.body.style, {
    margin: "0",
    padding: "0",
    height: "100vh",
    display: "flex",
    alignItems: "center",         // center vertically
    justifyContent: "flex-start", // align left
    paddingLeft: "15vw",          // move from the left
    backgroundColor: "#f0f0f0",
    fontFamily: "Arial, sans-serif",
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
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "30px",
    textAlign: "left",
  });
  container.appendChild(inputBox);

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
    "DEL", "ENT", "PST"];
  
  keyboard.style.gridTemplateColumns = "repeat(4, 70px)"; // still 4 for now

  // Display area for finalized input
  const resultDisplay = document.createElement("div");
  resultDisplay.style.marginTop = "25px";
  resultDisplay.style.fontSize = "20px";
  resultDisplay.style.fontWeight = "bold";
  resultDisplay.style.color = "#333";
  container.appendChild(resultDisplay);
  
  let inputFinalized = false;

  keys.forEach(key => {
    const btn = document.createElement("button");
    btn.textContent = key === "SPACE" ? "␣" : key;
    Object.assign(btn.style, {
      padding: "15px",
      fontSize: "18px",
      borderRadius: "8px",
      border: "1px solid #aaa",
      backgroundColor: "#e0e0e0",
      cursor: "pointer",
      transition: "background-color 0.2s",
    });
  
    btn.onmouseover = () => (btn.style.backgroundColor = "#d0d0d0");
    btn.onmouseout = () => {
      btn.style.backgroundColor = "#e0e0e0";
    };

    btn.onclick = async () => {
      
      if (key === "DEL") {
        if (!inputFinalized) inputBox.value = inputBox.value.slice(0, -1);
      } else if (key === "SPACE") {
        if (!inputFinalized && !inputBox.value.endsWith(" ")) {
          inputBox.value += " ";
        }
      } else if (key === "ENT") {
        inputFinalized = true;
        resultDisplay.textContent = `${inputBox.value}`;
      } else if (key === "AC") {
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