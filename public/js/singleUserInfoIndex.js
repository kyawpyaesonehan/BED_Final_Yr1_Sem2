const tokenCallback = (responseStatus, responseData) => {
  console.log("responseStatus:", responseStatus);
  console.log("responseData:", responseData);
  if (responseStatus == 200) {
    decodedUserId = responseData.userId;
    console.log(decodedUserId);
    fetchUserInfo();
  } else if (responseStatus == 401) {
    localStorage.removeItem("token");
  } else {
    alert(responseData.message);
  }
};

const fetchUserInfo = () => {
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
        <div class="card-body" style="text-align: center;">
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
          <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</a>
        </div>
      </div>

      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              Are you sure you want to delete this account?
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a href="login.html" class="btn btn-danger" id="delete-${user.user_id}">Delete</a>
            </div>
          </div>
        </div>
      </div>

    `;

    const updateForm = document.getElementById("updateForm");
    updateForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 200) {
          // Redirect or perform further actions for logged-in user
          location.reload();
        } else {
          alert(responseData.message);
        }
      };

      const newName = document.getElementById("newName").value;
      const newEmail = document.getElementById("newEmail").value;
      const newPassword = document.getElementById("newPassword").value;
      const data = {
        username: newName,
        email: newEmail,
        password: newPassword
      };
      fetchMethod(currentUrl + `/api/sec2User/${user.user_id}`, callbackForUpdate, "PUT", data, localStorage.getItem("token"));
    });

    const deleteButton = document.getElementById(`delete-${user.user_id}`);
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();
      const callbackForDelete = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        localStorage.removeItem("token");
        window.location.href = "login.html";
      };
      fetchMethod(
        currentUrl + `/api/sec2User/${user.user_id}`, callbackForDelete, "DELETE", null, localStorage.getItem("token")
      );
    });

    const updateItemForm = document.getElementById("updateItemForm");
    updateItemForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const callbackForUpdateItem = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 200) {
          // Redirect or perform further actions for logged-in user
          location.reload();
        } else {
          alert(responseData.message);
        }
      };

      const item_id = document.getElementById("item_id").value;
      const data = {
        user_id: user.user_id,
        item_id: item_id
      };
      fetchMethod(currentUrl + `/api/sec2User/updateItem/${user.user_id}`, callbackForUpdateItem, "PUT", data, localStorage.getItem("token"));
    });

    const levelUpButton = document.getElementById("levelUpButton");
    if (levelUpButton) {
      levelUpButton.addEventListener("click", function (event) {
        event.preventDefault();

        const callbackForLevelUp = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);

          if (responseStatus == 200) {
            // Redirect or perform further actions for logged-in user
            alert("Level upgraded successfully. 70 diamonds decuted");
            location.reload();
          } else {
            alert(responseData.message);
          }
        };

        const data = {
          user_id: user.user_id
        };
        fetchMethod(currentUrl + `/api/sec2User/levelUp`, callbackForLevelUp, "PUT", data, localStorage.getItem("token"));
      });
    }

    // Assuming taskProgressBody is the tbody where you want to insert rows
    const taskProgressBody = document.getElementById("taskProgressBody");
    const callbackForTaskProgress = (responseStatus, taskProgressList) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", taskProgressList);
  
      if (responseStatus == 200) {
        // Clear existing rows
        taskProgressBody.innerHTML = "";
  
        // Insert new rows
        taskProgressList.forEach(taskProgress => {
          const newRow = document.createElement("tr");
          newRow.innerHTML = `
            <td>${taskProgress.progress_id}</td>
            <td>${taskProgress.user_id}</td>
            <td>${taskProgress.task_id}</td>
            <td>${taskProgress.completion_date}</td>
            <td>${taskProgress.notes}</td>
          `;
          taskProgressBody.appendChild(newRow);
        });
      }
    };
  
    // Fetch task progress data and insert rows dynamically
    fetchMethod(currentUrl + `/api/task_progress/user/${user.user_id}`, callbackForTaskProgress);
  };

  if (decodedUserId) {
    fetchMethod(currentUrl + `/api/sec2User/${decodedUserId}`, callbackForUserInfo);
  }
};

fetchMethod(
  currentUrl + "/api/jwt/verify",
  tokenCallback,
  "GET",
  null,
  localStorage.getItem("token")
);
