export default function canvas() {
  // get canvas element and 2d context
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  const canvasContainer = document.getElementById("canvas-wrapper");

  // const cursor = document.getElementById("cursor");
  const brush = document.getElementById("brush");

  // Create the custom cursor element
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  // Add event listeners to the canvas to update the cursor
  canvas.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.pageX}px`;
    cursor.style.top = `${e.pageY}px`;
  });

  brush.addEventListener("click", (e) => {
    e.preventDefault();
    brushColor = colorPicker.value;
    cursor.style.backgroundColor = colorPicker.value;
  });

  // const newWidth =
  //   parseInt(
  //     window.getComputedStyle(canvasContainer).getPropertyValue("width")
  //   ) - 6;
  // ctx.canvas.setAttribute("width", `${newWidth}px`);

  ctx.canvas.setAttribute(
    "width",
    window.getComputedStyle(canvasContainer).getPropertyValue("width")
  );

  ctx.canvas.setAttribute(
    "height",
    window.getComputedStyle(canvasContainer).getPropertyValue("height")
  );

  // set initial brush color and size
  let brushColor = "#000000";
  let brushSize = 10;

  // set up event listener for color picker input
  var colorPickerWrapper = document.getElementById("color-picker-wrapper");
  const colorPicker = document.getElementById("color-picker");
  colorPicker.addEventListener("change", () => {
    brushColor = colorPicker.value;
    cursor.style.backgroundColor = colorPicker.value;
  });

  colorPicker.onchange = function () {
    colorPickerWrapper.style.backgroundColor = colorPicker.value;
  };

  // set up event listener for brush size input
  const brushSizeInput = document.getElementById("brush-size");
  brushSizeInput.addEventListener("change", () => {
    brushSize = brushSizeInput.value;

    // Update the cursor to show the size of the brush
    cursor.style.width = `${brushSize}px`;
    cursor.style.height = `${brushSize}px`;
    cursor.style.marginLeft = `-${brushSize / 2}px`;
    cursor.style.marginTop = `-${brushSize / 2}px`;
    cursor.style.borderRadius = `${brushSize / 2}px`;
  });

  // set up drawing functionality
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // set up undo functionality
  const undoStack = [];

  function saveToUndoStack() {
    undoStack.push(canvas.toDataURL());
  }

  function undo() {
    if (undoStack.length > 0) {
      const undoImage = new Image();
      undoImage.src = undoStack.pop();
      undoImage.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(undoImage, 0, 0);
      };
    }
  }

  // set up clear functionality
  const clearButton = document.getElementById("delete");
  clearButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    undoStack.length = 0;
  });

  // set up save functionality
  const saveButton = document.getElementById("save");
  const popupBackground = document.getElementById("popup-background");
  const popup = document.getElementById("popup");

  saveButton.addEventListener("click", () => {
    popupBackground.style.display = "block";
    popup.style.display = "block";
    const newCanvas = document.createElement("canvas");
    newCanvas.width = canvas.width;
    newCanvas.height = canvas.height;
    const newCtx = newCanvas.getContext("2d");

    // Set background color here
    newCtx.fillStyle = "#FFFFFF";
    newCtx.fillRect(0, 0, newCanvas.width, newCanvas.height);

    newCtx.drawImage(canvas, 0, 0);
    const image = newCanvas.toDataURL("image/jpeg");
    window.sessionStorage.setItem("drawing", image);

    // send the image data to the backend server
    // fetch("https://example.com/save-image", {
    //   method: "POST",
    //   body: JSON.stringify({ image }),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Failed to save image");
    //     }
    //     alert("Image saved successfully");
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //     alert("Failed to save image");
    //   });
    console.log(image);
  });

  const drawingSaveForm = document.getElementById("drawing-save-form");
  drawingSaveForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
      drawingName: e.target.drawingName.value,
      drawing: window.sessionStorage.getItem("drawing"),
    };
    console.log(data);
  });

  // set up event listeners
  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastX = e.offsetX;
    lastY = e.offsetY;
    saveToUndoStack();
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mouseout", () => {
    isDrawing = false;
  });

  const undoButton = document.getElementById("undo");
  undoButton.addEventListener("click", undo);

  // set up eraser functionality
  const eraserButton = document.getElementById("eraser");
  eraserButton.addEventListener("click", () => {
    brushColor = "#FFFFFF";
    cursor.style.backgroundColor = "#FFFFFF";
  });

  const brushSizeWrapper = document.getElementById("brush-size-wrapper");
  const brushSizeContainer = document.getElementById("brush-size-container");

  brushSizeWrapper.addEventListener("click", (e) => {
    e.preventDefault();
    if (brushSizeContainer.style.display == "none") {
      brushSizeContainer.style.display = "block";
    } else if (brushSizeContainer.style.display == "block") {
      brushSizeContainer.style.display = "none";
    }
  });
}
