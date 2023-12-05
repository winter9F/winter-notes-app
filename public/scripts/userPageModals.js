const settingsModal = document.getElementById("settingsModal");
const openSettingsModal = document.getElementById("openSettingsModal");
const noteModalCont = document.getElementById("noteModalCont");
const openNoteModal = document.getElementById("openNoteModal");
const closeNoteModal = document.getElementById("closeNoteModal");


openSettingsModal.addEventListener("click", function () {
    settingsModal.classList.add("show");
});


document.addEventListener('click', (e) => {
    if ((!settingsModal.contains(e.target)) && (!openSettingsModal.contains(e.target))) {
        settingsModal.classList.remove('show');
    }
});



openNoteModal.addEventListener("click", function () {
    if (!noteModalCont.classList.contains("show")) {
        noteModalCont.classList.add("show");
        noteModal.classList.add("show");
    } else {
        noteModalCont.classList.remove("show");
        noteModal.classList.remove("show");
    }
})
closeNoteModal.addEventListener("click", (e) => {
    noteModalCont.classList.remove("show");
    noteModal.classList.remove("show");
    e.preventDefault();

})