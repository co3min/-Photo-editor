// model pentru dreptunghiul desenat pentru crearea selectiei
let x1 = 50,
  y1 = 50,
  x2 = 100,
  y2 = 100;
let H, W, canvas, context, img, canvasCrop, ctx;
//variabila booleana folosita in timpul miscari mouse-ului
let inMove = false;
//  coloare este o variabila folosita pentru a coordona ceea ce se deseneaza in functia de desenare
// in momentul in care este apasat un anumit buton, coloare are o valoare pentru butonul care realizeaza selectia
// are alta valoarea pentru butonul cu care inseram text-ul
let coloare = 0;
// jDownload este o variabila booleana pe care am folosit-o pentru a face diferenta la descarcare dintre ce 2 canvas-uri
// pentru anumite evenimente este folosit un canvas si vreau sa fie descarcat acela, pentru alte evenimente este folosit alt canvas si se va descraca acel canvas
let jDownload = true;
// variabile care stocheaza pozitile mouse-ului aflate intr-un eveniment creat pentru mouse
// si se folosesvc in functia de insert text pentru a pune textul la pozitia apasata cu mouse-ul pe imagine
let pozMouseX, pozMosueY;
let btnSelect = document.getElementById("select_button");
let downloadImage = document.getElementById("downloadImage");
let btnCrop = document.getElementById("crop_button");
let btnInsertText = document.getElementById("insert_text");
let btnSend = document.getElementById("btnSend");
let btnClear = document.getElementById("btnClear");
let btnschimbare_dimensiuni = document.getElementById("schimbare_dimensiuni");
let btnTrimite = document.getElementById("btnTrimite");
let btnBack = document.getElementById("back_btn");
let btnStergeZona = document.getElementById("sterge_zona");

document.getElementById("canvas_crop").style.display = "none";

btnInsertText.addEventListener("click", (e) => {
  cx = 0;
  if (img) {
    coloare = 20;
    // aici am adaugat evenimentul de mouseup pe canvas si am folosit functia mouseup in care se afla
    // stocarile pozitilor x,y ale mouse-ului in variabilele pozMouseX, pozMosueY;
    canvas.addEventListener("mouseup", mouseUp);
    jDownload = true;
    if (coloare == 1) {
      coloare = 0;
    }
    document.getElementById("form_dimensiuni").style.display = "none";
    document.getElementById("form_utilizator").style.display = "block";
  }
  document.getElementById("schimbare_dimensiuni").style.display = "none";
  document.getElementById("insert_text").style.display = "none";
  document.getElementById("select_button").style.display = "none";
  document.getElementById("back_btn").style.display = "block";
});

btnschimbare_dimensiuni.addEventListener("click", (e) => {
  if (img) {
    if (coloare == 1) {
      coloare = 0;
    }
    document.getElementById("form_dimensiuni").style.display = "block";
    document.getElementById("form_utilizator").style.display = "none";
  }
  document.getElementById("schimbare_dimensiuni").style.display = "none";
  document.getElementById("insert_text").style.display = "none";
  document.getElementById("select_button").style.display = "none";
  document.getElementById("back_btn").style.display = "block";
});

function insert_text(text, dimensiuni, culoare, pozitiaX, pozitiaY) {
  if (text != "" && dimensiuni != "") {
    context.drawImage(img, 0, 0);
    context.fillStyle = `${culoare}`;
    context.font = `bold ${dimensiuni}pt Tahoma`;

    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(`${text}`, pozitiaX, pozitiaY);
  }
}

btnStergeZona.addEventListener("click", (e) => {
  jDownload = false;

  if (coloare == 1) {
    canvas.style.display = "none";
    canvasCrop.style.display = "block";
    canvasCrop.width = img.naturalWidth;
    canvasCrop.height = img.naturalHeight;

    let x = x1 > x2 ? x2 : x1;
    let y = y1 > y2 ? y2 : y1;

    ctx.drawImage(img, 0, 0, canvasCrop.width, canvasCrop.height);

    ctx.clearRect(x, y, Math.abs(x2 - x1), Math.abs(y2 - y1));
  } else {
    canvas.style.display = "block";
    canvasCrop.style.display = "none";
  }

  document.getElementById("form_dimensiuni").style.display = "none";
  document.getElementById("form_utilizator").style.display = "none";
  document.getElementById("insert_text").style.display = "none";
  document.getElementById("schimbare_dimensiuni").style.display = "none";
  document.getElementById("select_button").style.display = "none";
  document.getElementById("crop_button").style.display = "none";
  document.getElementById("sterge_zona").style.display = "none";
  document.getElementById("back_btn").style.display = "block";
});

btnCrop.addEventListener("click", (e) => {
  jDownload = false;

  if (coloare == 1) {
    canvas.style.display = "none";

    canvasCrop.style.display = "block";
    canvasCrop.width = Math.abs(x2 - x1);
    canvasCrop.height = Math.abs(y2 - y1);

    let x = x1 > x2 ? x2 : x1;
    let y = y1 > y2 ? y2 : y1;

    ctx.drawImage(
      img,
      x,
      y,
      canvasCrop.width,
      canvasCrop.height,
      0,
      0,
      canvasCrop.width,
      canvasCrop.height
    );
  } else {
    canvas.style.display = "block";
    canvasCrop.style.display = "none";
  }

  document.getElementById("sterge_zona").style.display = "none";
  document.getElementById("form_dimensiuni").style.display = "none";
  document.getElementById("form_utilizator").style.display = "none";
  document.getElementById("insert_text").style.display = "none";
  document.getElementById("schimbare_dimensiuni").style.display = "none";
  document.getElementById("select_button").style.display = "none";
  document.getElementById("crop_button").style.display = "none";
  document.getElementById("back_btn").style.display = "block";
});

let lat = document.querySelector("#latime");
// let inal = document.querySelector("#inaltime");
btnTrimite.addEventListener("click", (e) => {
  jDownload = false;
  canvas.style.display = "none";

  canvasCrop.style.display = "block";

  const scala = lat.value / img.width;

  canvasCrop.width = lat.value;
  canvasCrop.height = img.height * scala;

  ctx.drawImage(img, 0, 0, canvasCrop.width, canvasCrop.height);
});

btnClear.addEventListener("click", (e) => {
  curatamForm();
});

btnBack.addEventListener("click", (e) => {
  if (img) {
    coloare = 0;
  }
  document.getElementById("canvas_crop").style.display = "none";
  document.getElementById("canvas_image").style.display = "block";
  document.getElementById("insert_text").style.display = "block";
  document.getElementById("schimbare_dimensiuni").style.display = "block";
  document.getElementById("select_button").style.display = "block";
  document.getElementById("back_btn").style.display = "none";
  document.getElementById("crop_button").style.display = "none";
  document.getElementById("form_dimensiuni").style.display = "none";
  document.getElementById("form_utilizator").style.display = "none";
  document.getElementById("sterge_zona").style.display = "none";
});

function curatamForm() {
  document.querySelector("#text").value = "";
  document.querySelector("#dimensiuni").value = "";
}

function drawing() {
  requestAnimationFrame(drawing);

  H = canvas.height = img.naturalHeight;
  W = canvas.width = img.naturalWidth;

  if (coloare == 0) {
    context.drawImage(img, 0, 0);
  } else if (coloare == 20) {
    context.drawImage(img, 0, 0);
    let text = document.querySelector("#text").value;
    let dimensiuni = document.querySelector("#dimensiuni").value;
    let culoare = document.querySelector("#colorpicker").value;
    let pozitiaX = pozMouseX;
    let pozitiaY = pozMosueY;

    context.fillStyle = "rgb(0,255,0)";
    context.fillRect(pozitiaX, pozitiaY, 10, 10);

    insert_text(text, dimensiuni, culoare, pozitiaX, pozitiaY);
  } else {
    context.drawImage(img, 0, 0);
    context.strokeStyle = "rgb(0,0,255)";
    context.strokeRect(x1, y1, x2 - x1, y2 - y1);
  }
}

function drag_drop() {
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  document.addEventListener("drop", (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files;

    if (file.length > 0) {
      const reader = new FileReader();

      reader.addEventListener("load", (e) => {
        img = document.createElement("img");
        img.addEventListener("load", function () {
          drawing();
        });
        img.setAttribute("src", e.target.result);
      });
      reader.readAsDataURL(file[0]);
    }
  });
}

function mouseUp(e) {
  let x = e.x - canvas.getBoundingClientRect().left;
  let y = e.y - canvas.getBoundingClientRect().top;
  inMove = false;
  pozMosueY = y;
  pozMouseX = x;
}

function mouseDown(e) {
  let x = e.x - canvas.getBoundingClientRect().left;
  let y = e.y - canvas.getBoundingClientRect().top;
  x1 = x;
  y1 = y;
  x2 = x;
  y2 = y;
  inMove = true;
}

function mouseMove(e) {
  let x = e.x - canvas.getBoundingClientRect().left;
  let y = e.y - canvas.getBoundingClientRect().top;

  if (inMove) {
    x2 = x;
    y2 = y;
  }
}

function application() {
  canvas = document.getElementById("canvas_image");
  context = canvas.getContext("2d");
  canvasCrop = document.getElementById("canvas_crop");
  ctx = canvasCrop.getContext("2d");

  drag_drop();

  btnSelect.addEventListener("click", (e) => {
    coloare = 1;

    jDownload = true;
    canvas.addEventListener("mouseup", mouseUp);
    canvas.addEventListener("mousedown", mouseDown);
    canvas.addEventListener("mousemove", mouseMove);

    document.getElementById("insert_text").style.display = "none";
    document.getElementById("schimbare_dimensiuni").style.display = "none";
    document.getElementById("crop_button").style.display = "block";
    document.getElementById("back_btn").style.display = "block";
    document.getElementById("select_button").style.display = "none";
    document.getElementById("form_dimensiuni").style.display = "none";
    document.getElementById("form_utilizator").style.display = "none";
    document.getElementById("sterge_zona").style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", application);

downloadImage.addEventListener("click", (e) => {
  let dataUrl;
  if (jDownload == true) {
    dataUrl = canvas.toDataURL();
  } else {
    dataUrl = canvasCrop.toDataURL();
  }

  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = "image.png";
  a.click();
});

// încărcare imagine prin drag and drop sau control input de tip file și salvare rezultat final
// implementare selecție (inițial toată imaginea, modificare cu mouse down - mouse up, similar cu mecanismul de selecție din Microsoft Paint)
// adăugare text (utilizatorul furnizează textul, dimensiunea, culoarea, poziția)
// scalare imagine cu păstrarea proporțiilor (utilizatorul va furniza noua lățime sau noua lungime)
// crop interactiv (utilizatorul trebuie să poată selecta zona din imagine cu ajutorul mouseului)
// ștergere selecție -> pixelii din selecție vor deveni albi
