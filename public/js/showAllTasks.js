document.addEventListener("DOMContentLoaded", function () {
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

  const callback = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    const taskList = document.getElementById("taskList");
    responseData.forEach((tasks) => {
      const displayItem = document.createElement("div");
      displayItem.className =
        "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3";
      displayItem.innerHTML = `
        <div class="card">
          <div class="card-body" style="text-align: center;">
            <p class="card-text">
              Name: ${tasks.title}<br>
              <a href="singleTaskInfo.html?task_id=${tasks.task_id}" class="btn btn-primary">View Details</a>
            </p>
          </div>
        </div>
      `;
      taskList.appendChild(displayItem);
    });

    const createTask = document.getElementById("createTask");
    createTask.addEventListener("submit", function (event) {
      event.preventDefault();

      const callbackForUpdate = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus == 201) {
          location.reload();
        } else {
          alert(responseData.message);
        }
      };

      const newTaskTitle = document.getElementById("newTaskTitle").value;
      const newTaskescription = document.getElementById("newTaskescription").value;
      const newTaskPoints = document.getElementById("newTaskPoints").value;
      const data = {
        title: newTaskTitle,
        description: newTaskescription,
        points: newTaskPoints
      };

      fetchMethod(currentUrl + `/api/tasks`, callbackForUpdate, "POST", data, localStorage.getItem("token"));
    });
  };

  fetchMethod(currentUrl + "/api/tasks", callback);

  const completeTask = document.getElementById("completeTask");
  completeTask.addEventListener("submit", function (event) {
    event.preventDefault();

    const callbackForPost = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);

      if (responseStatus == 201) {
        location.reload();
      } else {
        alert(responseData.message);
      }
    };

    const task_id = document.getElementById("task_id").value;
    const completion_date = document.getElementById("completion_date").value;
    const notes = document.getElementById("notes").value;
    const data = {
      user_id: decodedUserId,
      task_id: task_id,
      completion_date: completion_date,
      notes: notes
    };

    fetchMethod(currentUrl + `/api/task_progress`, callbackForPost, "POST", data, localStorage.getItem("token"));
  });

  const callbackForPost = (responseStatus, responseData) => {
    console.log("responseStatus:", responseStatus);
    console.log("responseData:", responseData);

    if (responseStatus == 201) {
        // Get the tbody element where rows will be inserted
        const taskProgressBody = document.getElementById("taskProgressBody");

        // Create a new row
        const newRow = document.createElement("tr");

        // Add cells with task progress data
        newRow.innerHTML = `
            <td>${responseData.task_id}</td>
            <td>${responseData.completion_date}</td>
            <td>${responseData.notes}</td>
        `;

        // Append the new row to the tbody
        taskProgressBody.appendChild(newRow);

        location.reload(); // You may consider removing this line if you don't want to reload the page
    } else {
        alert(responseData.message);
    }
};

  if (decodedUserId) {
    fetchMethod(
      currentUrl + `/api/sec2User/${decodedUserId}`,
      callbackForUserInfo
    );
  }
});
