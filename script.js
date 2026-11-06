const form = document.getElementById("cliente-form");
const lista = document.getElementById("clientes-lista");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const fila = document.createElement("tr");
  const datos = [
    document.getElementById("nombre").value.trim(),
    document.getElementById("telefono").value.trim(),
    document.getElementById("correo").value.trim(),
  ];

  datos.forEach(function (dato) {
    const celda = document.createElement("td");
    celda.textContent = dato;
    fila.appendChild(celda);
  });

  lista.appendChild(fila);
  form.reset();
});
