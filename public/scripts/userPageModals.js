const settingsModal = document.getElementById("settingsModal");
const openSettingsModal = document.getElementById("openSettingsModal");
const noteModalCont2 = document.getElementById("noteModalCont2");
const openNoteModal2 = document.getElementById("openNoteModal2");
const closeNoteModal2 = document.getElementById("closeNoteModal2");


openSettingsModal.addEventListener("click", function () {
    settingsModal.classList.add("show");
});


document.addEventListener('click', (e) => {
    if ((!settingsModal.contains(e.target)) && (!openSettingsModal.contains(e.target))) {
        settingsModal.classList.remove('show');
    }
});



openNoteModal2.addEventListener("click", function () {
    if (!noteModalCont2.classList.contains("show")) {
        noteModalCont2.classList.add("show");
        noteModal2.classList.add("show");
    } else {
        noteModalCont2.classList.remove("show");
        noteModal2.classList.remove("show");
    }
})
closeNoteModal2.addEventListener("click", (e) => {
    noteModalCont2.classList.remove("show");
    noteModal2.classList.remove("show");
    e.preventDefault();

})