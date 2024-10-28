document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const creature_id = urlParams.get("creature_id");
  
    const callbackForCreatureInfo = (responseStatus, creature) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", creature);
  
      const creatureInfo = document.getElementById("creatureInfo");
  
      if (responseStatus == 404) {
        creatureInfo.innerHTML = `${creature.message}`;
        return;
      }
  
      creatureInfo.innerHTML = `
          <div class="card">
              <div class="card-body" style="text-align: center;">
              <img src="./img/${creature_id}.png" alt="Fire Phoenix" style="width: 30%;">
                  <p class="card-text">
                    Name: ${creature.creature_name}<br>
                    Level: ${creature.level}<br>
                    Power Description: ${creature.power}<br>
                    Amount: ${creature.amount}
                  </p>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/sec2Creatures/${creature_id}`, callbackForCreatureInfo);
  });