document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const task_id = urlParams.get("task_id");
  
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
                    Name: ${tasks.title}<br>
                    Description: ${tasks.description}<br>
                    Points: ${tasks.points}<br>
                  </p>
              </div>
          </div>

              `;
    };
  
    fetchMethod(currentUrl + `/api/tasks/${task_id}`, callbackForTaskInfo);
  });