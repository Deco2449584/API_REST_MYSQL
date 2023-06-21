// Realizar una llamada a la API REST para recuperar los datos de los empleados
fetch("http://localhost:3000/api/employes")
  .then((response) => response.json())
  .then((data) => {
    // Recuperar la tabla de empleados
    const table = document.querySelector("#employe-table");

    // Iterar a través de los datos de los empleados y agregar filas a la tabla
    data.forEach((employe) => {
      const row = document.createElement("tr");
      row.innerHTML = `
       <td>${employe.name}</td>
       <td>${employe.age}</td>
       <td>${employe.position}</td>
     `;
      table.appendChild(row);
    });
  });

// Obtener el formulario de creación
const createForm = document.querySelector("#create-form");

// Escuchar el evento de envío del formulario de creación
createForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Recuperar los datos del formulario
  const formData = new FormData(createForm);
  const name = formData.get("name");
  const age = formData.get("age");
  const position = formData.get("position");

  // Enviar una solicitud POST a la API REST para crear un nuevo empleado
  fetch("http://localhost:3000/api/employes", {
    method: "POST",
    body: JSON.stringify({ name, age, position }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      // Recuperar la tabla de empleados
      const table = document.querySelector("#employe-table");

      // Crear una nueva fila en la tabla
      const row = document.createElement("tr");
      row.innerHTML = `
         <td>${data.name}</td>
         <td>${data.age}</td>
         <td>${data.position}</td>
         <td>
           <button class="update-button">Modificar</button>
           <button class="delete-button">Eliminar</button>
         </td>
       `;
      table.appendChild(row);
    });
});
