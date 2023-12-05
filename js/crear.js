import { DatabaseManager } from "../js/indexDb.js";
const dbManager = DatabaseManager.getInstance();
let sendBtn=document.getElementById("enviar");

let agentName=document.getElementById("name");
let agentLore=document.getElementById("lore");
let agentAbility1=document.getElementById("ability1");
let agentAbility2=document.getElementById("ability2");
let agentAbility3=document.getElementById("ability3");
let agentUltimate=document.getElementById("ultimate");


sendBtn.addEventListener("click", checkValues);



function insertAgent() {
    dbManager.open()
      .then(() => {
        let data = {
            "name": agentName.value,
            "lore": agentLore.value,
            "ability1": agentAbility1.value,
            "ability2": agentAbility2.value,
            "ability3": agentAbility3.value,
            "ultimate": agentUltimate.value,
          };
        dbManager.addData(data)
          .then(() => {
            dbManager.counter++;
            window.location.href = 'confirmacionCrear.html';
          })
          .catch((error) => {
            console.error("Error addData: " + error);
          });
      })
      .catch((error) => {
        console.error("Error open: " + error);
      });
  }



  function checkValues() {
    let isValid = isValidValues();
  
    if (isValid) {
      insertAgent();
    } else {

      alert("Los campos no pueden estar vacíos");
    }
  }

  function isValidValues() {
    let res;
    if (
      agentName.value===""||
      agentLore.value===""||
      agentAbility1.value===""||
      agentAbility2.value===""||
      agentAbility3.value===""||
      agentUltimate.value===""
    ) {
      res = false;
    } else {
      res = true;
    }
  
    return res;
  }


