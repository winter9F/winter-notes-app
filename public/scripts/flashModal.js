const flashSuccess = document.getElementById("flashSuccess");
const flashAlert = document.getElementById("flashAlert");
const closeSuccess = document.getElementById("closeSuccess");
const closeAlert = document.getElementById("closeAlert");

closeSuccess.addEventListener("click", function () {
    flashSuccess.classList.add("show");
});

closeAlert.addEventListener("click", function () {
    flashAlert.classList.add("show");
});
