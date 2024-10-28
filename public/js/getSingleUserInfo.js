document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("user_id");
  
    const callbackForUserInfo = (responseStatus, user) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", user);
  
      const userInfo = document.getElementById("userInfo");
  
      if (responseStatus == 404) {
        userInfo.innerHTML = `${user.message}`;
        return;
      }
  
      userInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                    User ID: ${user.user_id}<br>
                    Username: ${user.username}<br>
                    Email: ${user.email}<br>
                    Achievement: ${user.achievement}<br>
                    Diamonds: ${user.diamonds}<br>
                    User Level: ${user.user_level}<br>
                    Current Item: ${user.current_item}<br>
                    Total Points: ${user.total_points}<br>
                  </p>
              </div>
          </div>
      `;
    };
  
    fetchMethod(currentUrl + `/api/sec2User/${user_id}`, callbackForUserInfo);
  });