export class modalManager {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);

    if (!this.modal) {
      console.error("Modal element not found.");
      return;
    }

    this.displayModal = this.displayModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);

    // Ajoute les écouteurs d'événements nécessaires
    document.addEventListener("keydown", this.handleKeyDown);
  }

  displayModal() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  handleKeyDown(event) {
    if (event.key === "Escape" && this.modal.style.display === "block") {
      this.closeModal();
    }
  }
}
