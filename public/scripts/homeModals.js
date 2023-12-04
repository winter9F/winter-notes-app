const loginModalContainer = document.querySelector("#loginModalContainer");
const loginOpen = document.querySelector("#loginOpen");
const loginClose = document.querySelector("#loginClose");
const registerModalContainer = document.querySelector("#registerModalContainer");
const registerOpen = document.querySelector("#registerOpen");
const registerClose = document.querySelector("#registerClose");


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