import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();

const tableContainer = document.getElementById("table-container");
let id;
const idStorage = localStorage.getItem('myId');



function showAllAction() {
  tableContainer.classList.remove('hide');

  dbManager.open()
    .then(() => {
      dbManager.getAllData()
        .then((allData) => {
          // Verifica si hay datos para mostrar
          if (allData.length > 0) {
            // Construye la tabla HTML
            const table = document.createElement("table");
            table.classList.add("table");
            table.classList.add("table-striped");
            table.classList.add("table-hover");
            table.classList.add("table-bordered");
            const thead = document.createElement("thead");
            const tbody = document.createElement("tbody");

            // Crea la fila de encabezado con los nombres de las propiedades (columnas)
            const headerRow = document.createElement("tr");

            // Agrega las demás columnas, excluyendo la columna "id"
            Object.keys(allData[0]).forEach((property) => {
              if (property !== "id") {
                const th = document.createElement("th");
                th.textContent = property;
                headerRow.appendChild(th);
              }
            });

            thead.appendChild(headerRow);

            // Crea las filas de datos
            allData.forEach((data, index) => {
              const row = document.createElement("tr");

              // Agrega las demás celdas, excluyendo la celda "id"
              Object.keys(data).forEach((property) => {
                if (property !== "id") {
                  const td = document.createElement("td");
                  td.textContent = data[property];
                  row.appendChild(td);
                }
              });

              // Agrega un evento de clic a cada fila
              row.addEventListener("click", () => {
                id = parseInt(data["id"]);
                deleteRow(id, row);
              });

              tbody.appendChild(row);
            });

            // Añade la tabla al contenedor
            table.appendChild(thead);
            table.appendChild(tbody);
            tableContainer.appendChild(table);
          } else {
            // Muestra un mensaje si no hay datos
            tableContainer.textContent = "No hay datos en la base de datos.";
          }
        })
        .catch((error) => {
          console.error("Error al obtener todos los elementos: " + error);
        });
    })
    .catch((error) => {
      console.error("Error al abrir la base de datos: " + error);
    });
}



showAllAction();

function deleteRow(id, row) {
  dbManager.open()
    .then(() => {
      dbManager.deleteData(id)
        .then(() => {
          window.location.href = 'confirmacionBorrar.html';
        })
        .catch((error) => {
          console.error("Error deleteData: " + error);
        });
    })
    .catch((error) => {
      console.error("Error open: " + error);
    });
}







