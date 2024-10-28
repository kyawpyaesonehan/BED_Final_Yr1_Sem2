document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {  // Change 'user' to 'responseData'
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const userList = document.getElementById("userList");
      responseData.forEach((user) => {  // Change 'user' to 'responseData'
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
              <div class="card-body" style="text-align: center;">
                  <p class="card-text">
                      Name: ${user.username}<br>
                      <a href="singleUserInfo.html?user_id=${user.user_id}" class="btn btn-primary">View Details</a>
                  </p>
              </div>
          </div>
          `;
        userList.appendChild(displayItem);
      });
    };
    
    fetchMethod(currentUrl + "/api/sec2User", callback);
});
