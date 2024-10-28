document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const playerList = document.getElementById("paidTasksList");
      responseData.forEach((tasks) => {
        const displayItem = document.createElement("div");
        displayItem.className =
          "col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 p-3";
        displayItem.innerHTML = `
          <div class="card">
            <div class="card-body" style="text-align: center;">
                  <p class="card-text">
                      Name: ${tasks.title}<br>
                      <a href="singlePaidTaskInfo.html?task_id=${tasks.task_id}" class="btn btn-primary">View Details</a>
                  </p>
              </div>
          </div>
          `;
        paidTaskList.appendChild(displayItem);
      });
    };
  
    fetchMethod(currentUrl + "/api/sec2Tasks", callback);
  });