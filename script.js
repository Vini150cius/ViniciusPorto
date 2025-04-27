document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("N2jsDKGOubHHKU1Uo");

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      if (!name || !email || !message) {
        showMessage("error");
        return;
      }

      if (!validateEmail(email)) {
        document.getElementById("error-message").textContent =
          "Por favor, insira um email válido.";
        showMessage("error");
        return;
      }

      const formData = {
        name: name,
        email: email,
        message: message,
      };

      emailjs
        .send("service_xwh1ukj", "template_mv4guby", formData)
        .then(function (response) {
          console.log("Email enviado!", response.status, response.text);
          alert("Email enviado com sucesso!");
          showMessage("success");
          resetForm();
        })
        .catch(function (error) {
          console.error("Erro ao enviar o email:", error);
          showMessage("error");
        });
    });
  }
});

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function showMessage(type, duration = 5000) {
  console.log(`Mensagem de tipo ${type} exibida por ${duration}ms.`);
}

function resetForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    console.log("Redefinindo o formulário...");
    form.reset();
    console.log("Formulário redefinido com sucesso.");
  } else {
    console.error("Formulário não encontrado.");
  }
}
