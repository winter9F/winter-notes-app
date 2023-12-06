const loginModalContainer = document.getElementById("loginModalContainer");
const loginOpen = document.getElementById("loginOpen");
const loginClose = document.getElementById("loginClose");
const registerModalContainer = document.getElementById("registerModalContainer");
const registerOpen = document.getElementById("registerOpen");
const registerClose = document.getElementById("registerClose");


loginOpen.addEventListener("click", function () {
    loginModalContainer.classList.add("show");

});
loginClose.addEventListener("click", (e) => {
    loginModalContainer.classList.remove("show");
    e.preventDefault();

});

registerOpen.addEventListener("click", function () {
    registerModalContainer.classList.add("show");

});
registerClose.addEventListener("click", (e) => {
    registerModalContainer.classList.remove("show");
    e.preventDefault();

});