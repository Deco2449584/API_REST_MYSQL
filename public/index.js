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
              <td>${employe.salary}</td>
              <td>
                <button class="update-button" data-id="${employe.id}">Modificar</button>
                <button class="delete-button" data-id="${employe.id}">Eliminar</button>
              </td>
            `;
      table.appendChild(row);
    });

    // Obtener todos los botones de modificar
    const updateButtons = document.querySelectorAll(".update-button");
    updateButtons.forEach((button) => {
      button.addEventListener("click", handleUpdate);
    });

    // Obtener todos los botones de eliminar
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", handleDelete);
    });
  });

function handleUpdate(event) {
  const employeId = event.target.getAttribute("data-id");
  const name = prompt("Ingrese el nuevo nombre:");
  const salary = prompt("Ingrese el nuevo salario:");

  fetch(`http://localhost:3000/api/employes/${employeId}`, {
    method: "PATCH",
    body: JSON.stringify({ name, salary }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Empleado modificado:", data);
      location.reload(); // Recargar la página después de modificar el empleado
    })
    .catch((error) => {
      console.error("Error al modificar el empleado:", error);
    });
}

function handleDelete(event) {
  const employeId = event.target.getAttribute("data-id");

  const confirmed = window.confirm(
    "¿Estás seguro de que deseas eliminar este empleado?"
  );

  if (confirmed) {
    fetch(`http://localhost:3000/api/employes/${employeId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Empleado eliminado:", data);
        location.reload(); // Recargar la página después de eliminar el empleado
      })
      .catch((error) => {
        console.error("Error al eliminar el empleado:", error);
      });
  }
}

// Obtener el formulario de creación
const createForm = document.querySelector("#create-form");

// Escuchar el evento de envío del formulario de creación
createForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Recuperar los datos del formulario
  const formData = new FormData(createForm);
  const name = formData.get("name");
  const salary = formData.get("salary");

  // Enviar una solicitud POST a la API REST para crear un nuevo empleado
  fetch("http://localhost:3000/api/employes", {
    method: "POST",
    body: JSON.stringify({ name, salary }),
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
              <td>${data.salary}</td>
              <td>
                <button class="update-button" data-id="${data.id}">Modificar</button>
                <button class="delete-button" data-id="${data.id}">Eliminar</button>
              </td>
            `;
      table.appendChild(row);

      // Obtener el botón de modificar de la nueva fila
      const updateButton = row.querySelector(".update-button");
      updateButton.addEventListener("click", handleUpdate);

      // Obtener el botón de eliminar de la nueva fila
      const deleteButton = row.querySelector(".delete-button");
      deleteButton.addEventListener("click", handleDelete);

      // Limpiar los campos del formulario
      createForm.reset();
    });
});
