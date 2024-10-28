document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(document.URL);
  const urlParams = url.searchParams;
  const task_id = urlParams.get("task_id");

  let decodedUserId;

  const tokenCallback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 200) {
      decodedUserId = responseData.userId;
      console.log(decodedUserId);
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


  const callbackForTaskInfo = (responseStatus, tasks) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", tasks);

    const taskInfo = document.getElementById("taskInfo");

    if (responseStatus == 404) {
      taskInfo.innerHTML = `${tasks.message}`;
      return;
    }

    taskInfo.innerHTML = `
      <div class="card">
        <div class="card-body" style="text-align: center;">
          <p class="card-text">
            Id: ${tasks.task_id}<br>
            Description: ${tasks.description}<br>
            Creature Id: ${tasks.creature_id}<br>
            Creature Name: ${tasks.creature_name}<br>
            Creature Level: ${tasks.creature_level}<br>
            Diamonds: ${tasks.diamonds}<br>
          </p>
          <div id="complete">
            <a class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Complete</a>
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
              Id: ${tasks.task_id}<br>
              Description: ${tasks.description}<br>
              Creature Id: ${tasks.creature_id}<br>
              Creature Name: ${tasks.creature_name}<br>
              Creature Level: ${tasks.creature_level}<br>
              Diamonds: ${tasks.diamonds}<br>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal" id="confirmButton">Confirm</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Rewards Modal Markup -->
      <div class="modal fade" id="exampleModalToggle2" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel2">Rewards</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              You got ${tasks.diamonds} diamonds.
            </div>
            <div class="modal-footer">
              <a href="paidTasks.html" class="btn btn-primary">Confirm</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const confirmButton = document.getElementById("confirmButton");
    confirmButton.addEventListener("click", function (event) {
      event.preventDefault();
  
      const callbackForPost = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
  
        if (responseStatus == 201) {
          // Redirect or handle success as needed
          window.location.href = paidTasks.html;
        }
      };
    const data = {
      user_id: decodedUserId,
      task_id: task_id,
    };

    fetchMethod(currentUrl + `/api/sec2User/DoTask/${decodedUserId}`, callbackForPost, "POST", data, localStorage.getItem("token"));
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

  fetchMethod(currentUrl + `/api/sec2Tasks/${task_id}`, callbackForTaskInfo);

  if (decodedUserId) {
    fetchMethod(
      currentUrl + `/api/sec2User/${decodedUserId}`,
      callbackForUserInfo
    );
  }
});