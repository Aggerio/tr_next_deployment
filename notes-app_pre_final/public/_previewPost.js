function handleIn(divName, title, content) {
  console.log("Handling: ", divName, title, content);
  if (content != "") {
    const myDiv = document.getElementById(divName);

    myDiv.style.position = "absolute";
    myDiv.style.width = "300px";
    myDiv.style.height = "100px";
    myDiv.style.display = "";

    myDiv.style.backgroundColor = "white";
    myDiv.style.overflow = "hidden";
    myDiv.style.transform = "translate(-10px,30px)";
    myDiv.style.border = "1px solid black";
    myDiv.innerHTML = `<strong>${title}</strong><div>${content}</div>`;
  }
}

function handleOut(divName) {
  const myDiv = document.getElementById(divName);
  myDiv.innerHTML = "";
  myDiv.style.display = "none";
}
