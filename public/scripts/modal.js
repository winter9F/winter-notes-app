const modalContainer = document.querySelector("#modalContainer");
const openModal = document.querySelector("#openModal");
const closeModal = document.querySelector("#closeModal");


openModal.addEventListener("click", function () {
    modalContainer.classList.add("show");

})
closeModal.addEventListener("click", (e) => {
    modalContainer.classList.remove("show");
    e.preventDefault();

})

