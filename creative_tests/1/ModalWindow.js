window.onload = () => {

    const modalOverlay = document.querySelector(".modal-overlay");
    const closeModalButton = document.querySelector(".modal__close-modal-button");
    const openModalButton = document.querySelector(".open-modal-button");

    let CloseOpenModalFun = () => {
        modalOverlay.classList.toggle("modal-overlay--open");
    };

    closeModalButton.addEventListener("click", CloseOpenModalFun);
    openModalButton.addEventListener("click", CloseOpenModalFun);
}