document.addEventListener("DOMContentLoaded", function () {
    let decodedUserId;

    const callbackForUserInfo = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
        username = responseData.username;
        // Add logic to handle user information retrieval if needed
    };

    const tokenCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseStatus === 200) {
            decodedUserId = responseData.userId;
            console.log(decodedUserId);

            // Execute the rest of the code after setting decodedUserId
            executeAfterTokenVerification();
        } else if (responseStatus === 401) {
            localStorage.removeItem("token");
        } else {
            alert(responseData.message);
        }
    };

    const executeAfterTokenVerification = () => {
        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);

            const messageList = document.getElementById("messageList");
            responseData.forEach((message) => {
                const displayItem = document.createElement("div");
                if (message.user_id === decodedUserId) {
                    displayItem.className =
                        "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3 text-end";
                    displayItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${message.username}</h5>
                                <p class="card-text">
                                    ${message.message_text}<br>
                                    <button type="submit" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-${message.id}"><i class="fa-solid fa-pencil"></i></button>
                                    <button type="submit" class="btn btn-primary" id="deleteButtondelete-${message.id}"><i class="fa-solid fa-trash"></i></button>
                                </p>
                            </div>
                        </div>

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal-${message.id}" aria-hidden="true" aria-labelledby="exampleModalToggleLabel2" tabindex="-1">
                            <div class="modal-dialog modal-dialog-centered">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form id="updateForm-${message.id}" class="row g-3">
                                        <input type="text" class="form-control" id="updated_text-${message.id}" value="${message.message_text}" placeholder="Type your message..." required>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <a href="message.html" class="btn btn-primary" id="updateButton-${message.id}">Confirm</a>
                                </div>
                            </div>
                            </div>
                        </div>
                  
                    `;
                    messageList.appendChild(displayItem);

                    const deleteButton = displayItem.querySelector(`#deleteButtondelete-${message.id}`);
                    deleteButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        const callbackForDelete = (responseStatus, responseData) => {
                            console.log("responseStatus:", responseStatus);
                            console.log("responseData:", responseData);
                            window.location.reload();
                        };
                        fetchMethod(
                            currentUrl + `/api/message/${message.id}`, callbackForDelete, "DELETE", null, localStorage.getItem("token")
                        );
                    });

                    const updateButton = displayItem.querySelector(`#updateButton-${message.id}`);
                    updateButton.addEventListener("click", (event) => {
                        event.preventDefault();
                        const updated_text = document.getElementById(`updated_text-${message.id}`).value;
                        const callbackForPut = (responseStatus, responseData) => {
                            console.log("responseStatus:", responseStatus);
                            console.log("responseData:", responseData);
                            if (responseStatus == 200) {
                                // Reset the input field
                                window.location.href = "message.html";
                                // Handle successful message creation (if needed)
                            } else if (responseStatus == 401) {
                                localStorage.removeItem("token");
                                window.location.href = "message.html";
                            } else {
                                alert(responseData.message);
                            }
                        };
                        const data = {
                            message_text: updated_text,
                            user_id: message.user_id,
                            id: message.id
                        };
                        fetchMethod(
                            currentUrl + "/api/message/" + message.id, callbackForPut,"PUT",data, localStorage.getItem("token")
                        );
                    });

                } else {
                    displayItem.className =
                        "col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 p-3";
                    displayItem.innerHTML = `
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${message.username}</h5>
                                <p class="card-text">
                                    ${message.message_text}<br>
                                </p>
                            </div>
                        </div>
                    `;
                    messageList.appendChild(displayItem);
                }
            });
        };

        const messageForm = document.getElementById("messageForm");
        messageForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const callbackForSend = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);

                if (responseStatus === 201) {
                    location.reload();
                } else {
                    alert(responseData.message);
                }
            };

            const newMessage = document.getElementById("newMessage").value;
            const data = {
                user_id: decodedUserId,
                message_text: newMessage,
            };

            fetchMethod(
                currentUrl + "/api/message",
                callbackForSend,
                "POST",
                data,
                localStorage.getItem("token")
            );
        });

        fetchMethod(currentUrl + "/api/message", callback);

        if (decodedUserId) {
            fetchMethod(
                currentUrl + `/api/sec2User/${decodedUserId}`,
                callbackForUserInfo
            );
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
