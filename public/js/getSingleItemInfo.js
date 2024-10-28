document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const item_id = urlParams.get("item_id");
  let decodedUserId;

  const tokenCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 200) {
      decodedUserId = responseData.userId;
      console.log(decodedUserId);

      const callbackForItemInfo = (responseStatus, shop) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", shop);

        const itemInfo = document.getElementById("itemInfo");

        if (responseStatus == 404) {
          itemInfo.innerHTML = `${shop.message}`;
          return;
        }

        itemInfo.innerHTML = `
          <div class="card">
            <div class="card-body" style="text-align: center;">
              <img src="./img/${shop.item_id}shop.png" alt="Fire Phoenix" style="width: 30%;">
              <p class="card-text">
                Name: ${shop.item_name}<br>
                Power: ${shop.power}<br>
                Power Amount: ${shop.amount}<br>
                Cost: ${shop.cost}
              </p>
              <div id="complete">
                <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Buy Now!</a>
              </div>
            </div>
          </div>

          <!-- Modal Markup -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  This will cost ${shop.cost} diamonds
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <a href="shop.html" class="btn btn-primary" id="confirmButton">Confirm</a>
                </div>
              </div>
            </div>
          </div>
        `;
        
        const callbackForUserInfo = (responseStatus, user) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", user);

          const confirmButton = document.getElementById("confirmButton");
          confirmButton.addEventListener("click", function (event) {
            event.preventDefault();

            const callbackForPost = (responseStatus, responseData) => {
              console.log("responseStatus:", responseStatus);
              console.log("responseData:", responseData);

              if (responseStatus == 201) {
                alert("Successfully purchased");
                // Redirect or handle success as needed
                window.location.href = "shop.html"; // Change this to the desired URL
              }
              else if (responseStatus == 409) {
                // Alert for conflict
                alert("Conflict: Item already owned by the user.");
                
                // Redirect to a specific page after showing the alert
                window.location.href = "shop.html";
              }
              
            };

            const data = {
              user_id: decodedUserId,
              item_id: item_id,
              item_name: shop.item_name,
              username: user.username,
              user_level: user.user_level
            };

            fetchMethod(currentUrl + `/api/sec2Shop/buyItem/${decodedUserId}`, callbackForPost, "POST", data, localStorage.getItem("token"));
          });

          const token = localStorage.getItem("token");
          const complete = document.getElementById("complete");
          if (complete) {
            if (token) {
              complete.classList.remove("d-none");
            } else {
              complete.classList.add("d-none");
            }
          }
        };

        fetchMethod(currentUrl + `/api/sec2User/${decodedUserId}`, callbackForUserInfo);
      };

      fetchMethod(currentUrl + `/api/sec2Shop/${item_id}`, callbackForItemInfo);
    } else if (responseStatus == 401) {
      localStorage.removeItem("token");
    } else {
      alert(responseData.message);
    }
  };

  fetchMethod(
    currentUrl + "/api/jwt/verify",
    tokenCallback,
    "GET",
    null,
    localStorage.getItem("token")
  );
});
