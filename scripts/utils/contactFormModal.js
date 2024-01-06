export class contactFormModal {
  constructor() {
    this.errorMessage =
      "Veuillez entrer 2 caractères ou plus pour le champ du prénom.";
    this.emailMessage = "Veuillez entrer une adresse mail valide.";
    this.modal = document.getElementById("contact_modal");
    this.hideModal = document.getElementById("close_modal");
    this.openModal = document.getElementById("open_modal");

    this.hideModal.addEventListener("click", () => this.closeModal());
    this.openModal.addEventListener("click", () => this.displayModal());

    window.addEventListener("keydown", (event) => this.handleKeyDown(event));

    this.form = document.getElementById("form");
    this.firstName = document.getElementById("firstName");
    this.lastName = document.getElementById("lastName");
    this.email = document.getElementById("email");
    this.message = document.getElementById("message_area");
    this.submitbtn = document.querySelector(".submit_button");

    this.submitbtn.addEventListener("focus", () =>
      this.submitbtn.classList.add("focused")
    );
    this.submitbtn.addEventListener("blur", () =>
      this.submitbtn.classList.remove("focused")
    );

    this.form.addEventListener("submit", (event) => this.handleSubmit(event));

    this.firstName.addEventListener("change", () =>
      this.validInputValue(this.firstName, this.errorMessage)
    );
    this.lastName.addEventListener("change", () =>
      this.validInputValue(this.lastName, this.errorMessage)
    );
    this.email.addEventListener("change", () =>
      this.validEmail(this.email, this.emailMessage)
    );
    this.message.addEventListener("change", () =>
      this.validInputValue(this.message, this.errorMessage)
    );

    this.namePhotographer = document.getElementById("name_photographer");
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

  // check the validity of value
  validInputValue(balise, message) {
    if (balise.value.length < 2) {
      balise.parentElement.setAttribute("data-error-visible", "true");
      balise.parentElement.setAttribute("data-error", message);
      balise.parentElement.setAttribute("class", "error");

      return false;
    } else {
      balise.parentElement.removeAttribute("data-error-visible");
      balise.parentElement.removeAttribute("data-error");
      balise.parentElement.removeAttribute("class");
      return true;
    }
  }

  // check email validity
  validEmail(balise, message) {
    let emailRegExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+/;
    if (emailRegExp.test(balise.value)) {
      balise.parentElement.removeAttribute("data-error-visible");
      balise.parentElement.removeAttribute("data-error");
      balise.parentElement.removeAttribute("class");
      return true;
    } else {
      balise.parentElement.setAttribute("data-error-visible", "true");
      balise.parentElement.setAttribute("data-error", message);
      balise.parentElement.setAttribute("class", "error");
      return false;
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if (
      !this.validInputValue(this.firstName, this.errorMessage) ||
      !this.validInputValue(this.lastName, this.errorMessage) ||
      !this.validEmail(this.email, this.emailMessage) ||
      !this.validInputValue(this.message, this.errorMessage)
    ) {
      return false;
    } else {
      console.log(
        `firstName: ${this.firstName.value} name: ${this.lastName.value}; 
          email: ${this.email.value} message: ${this.message.value}`
      );
    }
  }

  initContactForm(name) {
    this.namePhotographer.textContent = name;
  }
}
