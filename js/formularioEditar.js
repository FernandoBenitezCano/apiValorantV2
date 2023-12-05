import { DatabaseManager } from "../js/indexDb.js";

const dbManager = DatabaseManager.getInstance();
const idStorage = localStorage.getItem('myId');
let agentName = document.getElementById("name");
let agentLore = document.getElementById("lore");
let agentAbility1 = document.getElementById("ability1");
let agentAbility2 = document.getElementById("ability2");
let agentAbility3 = document.getElementById("ability3");
let agentUltimate = document.getElementById("ultimate");
let sendBtn = document.getElementById("enviar");
let paramId = new URLSearchParams(window.location.search).get('id');
let id;

// Variables para almacenar los valores originales
let originalData = {};

// Función para inicializar los valores originales al cargar la página
function initializeOriginalData() {
  originalData.name = agentName.value;
  originalData.lore = agentLore.value;
  originalData.ability1 = agentAbility1.value;
  originalData.ability2 = agentAbility2.value;
  originalData.ability3 = agentAbility3.value;
  originalData.ultimate = agentUltimate.value;
}

// Función para comprobar si se han realizado cambios
function hasChanges() {
  return (
    agentName.value !== originalData.name ||
    agentLore.value !== originalData.lore ||
    agentAbility1.value !== originalData.ability1 ||
    agentAbility2.value !== originalData.ability2 ||
    agentAbility3.value !== originalData.ability3 ||
    agentUltimate.value !== originalData.ultimate
  );
}

// Función para actualizar el agente en la base de datos
function updateAgent() {
  dbManager.open()
    .then(() => {
      let data = {
        "name": agentName.value,
        "lore": agentLore.value,
        "ability1": agentAbility1.value,
        "ability2": agentAbility2.value,
        "ability3": agentAbility3.value,
        "ultimate": agentUltimate.value,
      }
      dbManager.updateData(id, data)
        .then(() => {
          window.location.href = 'confirmacionEditar.html';
        })
        .catch((error) => {
          console.error("Error al actualizar elemento: " + error);
        });
    })
    .catch((error) => {
      console.error("Error al abrir la base de datos: " + error);
    });
}


// Función para comprobar cambios y proceder
function checkForChangesAndProceed() {
  event.preventDefault();
  if (hasChanges()) {
  
      updateAgent();
   
  } else {
    // No hay cambios, puedes redirigir o realizar alguna otra acción
    window.location.href = 'avisoEditar.html';
  }
}

// Evento del botón para verificar cambios y proceder
sendBtn.addEventListener("click", checkForChangesAndProceed);

// Función para mostrar los datos del agente
function showData() {
  id = parseInt(paramId);

  dbManager.open()
    .then(() => {
      dbManager.getData(id)
        .then((data) => {
          agentName.value = data.name;
          agentLore.value = data.lore;
          agentAbility1.value = data.ability1;
          agentAbility2.value = data.ability2;
          agentAbility3.value = data.ability3;
          agentUltimate.value = data.ultimate;

          // Inicializa los valores originales después de cargar los datos
          initializeOriginalData();
        })
        .catch((error) => {
          console.error("Error al obtener el elemento con ID " + id + ": " + error);
        });
    })
    .catch((error) => {
      console.error("Error al abrir la base de datos: " + error);
    });
}

// Llama a la función showData al cargar la página
showData();
