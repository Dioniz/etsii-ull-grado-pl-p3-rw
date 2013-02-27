"use strict"; // Use ECMAScript 5 strict mode in browsers that support it

$(document).ready(function() {
   $("#fileinput").change(calculate);
});

function generateOutput(contents) {
  return contents.replace(/\b([a-z_A-Z]\w*)(\s+)\1\b/ig,'$1$2');
}//sustituir las palabras repetidas(RegExp/opciones, reemplazo)

function calculate(evt) {
  var f = evt.target.files[0]; // se guarda en f, los ficheros seleccionados por el evento, en este caso solo hay 1, por ello lo del: [0]
  var contents = ''; //vamos a guardar aqui el contenido del fichero

  if (f) {
    var r = new FileReader();
    r.onload = function(e) { //Evento de carga del fichero(onload)
      contents = e.target.result;//contenido del fichero
      var escaped  = escapeHtml(contents);//trata los elementos especiales <tag> del fichero
      var outdiv = document.getElementById("out");
      outdiv.className = 'unhidden';//Cambia el nombre de la clase en html
      finaloutput.innerHTML = generateOutput(escaped);
      initialinput.innerHTML = escaped;

    }
    r.readAsText(f);//momento en el que se lee el fichero (Se ejecuta esto antes que el evento onload)[Primero se lee el fichero y luego se produce el evento de carga] Pero hay que definir antes el evento onload, para la siguiente leida de fichero.
  } else { 
    alert("Failed to load file");
  }
}

var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

function escapeHtml(string) {
  return String(string).replace(/[&<>""''\/]/g, function (s) {
    return entityMap[s];
  });//sustituir los elementos de entityMap por los de la derecha
}
