document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("playerList");
      responseData.forEach((shop) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
          <img src="./img/${shop.item_id}shop.png" alt="Fire Phoenix" style="width: 100%;">
              <div class="card-body">
              <p class="card-text" style="padding: 10px 0px 0px 0px; text-align: center;">
                      Name: ${shop.item_name}<br>
                  </p>
                  <a href="singleItemInfo.html?item_id=${shop.item_id}" class="btn btn-primary d-flex justify-content-center">View Details</a>
              </div>
          </div>
          `;
        shopList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/sec2Shop", callback);
  });