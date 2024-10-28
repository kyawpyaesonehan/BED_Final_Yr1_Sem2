document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("playerList");
      responseData.forEach((Sec2Creatures) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
          <img src="./img/${Sec2Creatures.creature_id}.png" alt="Fire Phoenix" style="width: 100%;">
              <div class="card-body" >
                  <p class="card-text" style="padding: 5px 0px 0px 0px; text-align: center;">
                      Name: ${Sec2Creatures.creature_name}<br>
                  </p>
                  <a href="singleCreatureInfo.html?creature_id=${Sec2Creatures.creature_id}" class="btn btn-primary d-flex justify-content-center">View Details</a>
              </div>
          </div>
          `;
        creatureList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/Sec2Creatures", callback);
  });