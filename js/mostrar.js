import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();



async function getAgents() {
  try {
    const apiUrl = `https://valorant-api.com/v1/agents?language=es-ES&isPlayableCharacter=true`;
    const response = await fetch(apiUrl);
    const agentsData = await response.json();

    const divContainer = document.querySelector('main');

    if (response.ok) {
      agentsData.data.forEach(agent => {
        let agentDiv = document.createElement('div');
        agentDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
        'card', 'mt-1', 'mb-1', 'mx-1', 'col-2', 'agente');
        

        let image = document.createElement('img');
        image.classList.add('card-img-top', 'img-fluid', 'img-agente', 'pt-2','rounded');
        image.src = agent.displayIcon;

        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

        let name = document.createElement('h3');
        name.classList.add('card-title', 'mb-2','fw-bold');
        name.textContent = agent.displayName;

        let habilidadesDiv = document.createElement('div');
        habilidadesDiv.classList.add('habilidades', 'pb-3');

        agent.abilities.forEach(ability => {
          if (ability.displayIcon) {
            let abilityImg = document.createElement('img');
            abilityImg.classList.add('img-fluid', 'rounded-circle', 'habilidad');
            abilityImg.style.filter = "invert(100%)";
            abilityImg.src = ability.displayIcon;
            abilityImg.style.maxWidth = '40px';
            habilidadesDiv.appendChild(abilityImg);
          }
        });

        cardBody.appendChild(name);
        cardBody.appendChild(habilidadesDiv);

        agentDiv.appendChild(image);
        agentDiv.appendChild(cardBody);
        divContainer.appendChild(agentDiv);
      });
    } else {
      console.error(`Error al obtener los datos de la API. Código de estado: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener agentes:", error);
  }
}

function showAllAction() {
  try {
    dbManager.open()
      .then(() => dbManager.getAllData())
      .then(allData => {
        const divContainer = document.querySelector('main');

        allData.forEach(data => {
          let agentDiv = document.createElement('div');
          agentDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
          'card', 'mt-1', 'mb-1', 'mx-1', 'col-2', 'agente');
          let iconDel=document.createElement('i');
          iconDel.classList.add('bx', 'bx-recycle');
          let iconUpd=document.createElement('i');
          iconUpd.classList.add('bx', 'bxs-edit');
          let divicons=document.createElement('div');
          divicons.appendChild(iconDel);
          divicons.appendChild(iconUpd);
          divicons.classList.add('upd-del-icon');
          let image = document.createElement('img');
          image.classList.add('card-img-top', 'img-fluid', 'img-agente', 'pt-2');
          image.src = "../img/default.png";

          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

          let name = document.createElement('h3');
          name.classList.add('card-title', 'mb-2','fw-bold');
          name.textContent = data.name;

          let habilidadesDiv = document.createElement('div');
          habilidadesDiv.classList.add('habilidades', 'pb-3');

          for (let index = 0; index < 4; index++) {
            let abilityImg = document.createElement('img');
            abilityImg.classList.add('img-fluid', 'rounded-circle', 'habilidad');
            abilityImg.src = "../img/habDef.jpg";
            abilityImg.style.maxWidth = '40px';
            habilidadesDiv.appendChild(abilityImg);
          }

          iconUpd.addEventListener("click", () => {
           window.location.href = '/html/formularioEditar.html?id=' + data.id;
          });

          iconDel.addEventListener("click", () => {
            deleteData(data.id);

           });
          cardBody.appendChild(name);
          cardBody.appendChild(habilidadesDiv);

          agentDiv.appendChild(divicons);
          agentDiv.appendChild(image);
          agentDiv.appendChild(cardBody);
          divContainer.appendChild(agentDiv);
        });
      })
      .catch(error => console.error("Error al obtener todos los elementos:", error));
  } catch (error) {
    console.error("Error al mostrar todos los agentes:", error);
  }
}


function deleteData(id) {
  dbManager.open()
    .then(() => {
      dbManager.deleteData(id)
        .then(() => {
          window.location.href = '/html/confirmacionBorrar.html';
        })
        .catch((error) => {
          console.error("Error deleteData: " + error);
        });
    })
    .catch((error) => {
      console.error("Error open: " + error);
    });
}

getAgents();
showAllAction();
