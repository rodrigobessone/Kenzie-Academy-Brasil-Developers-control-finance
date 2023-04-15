// Modal



function openModal() {
    const dialog = document.querySelector(".modal")
    const openModalButtons = document.querySelectorAll(".open-modal")

    openModalButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            dialog.showModal()
        })
    })
}

function closeModal() {
    const dialog = document.querySelector(".modal")
    dialog.close()
}