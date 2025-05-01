document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const navbarLinks = document.querySelector(".navbar-links");

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      navbarLinks.classList.toggle("active");
    });
  }

  document.querySelectorAll(".navbar-links a").forEach((anchor) => {
    anchor.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        navbarLinks.classList.remove("active");
      }

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const targetPosition = targetRect.top + window.scrollY;
        const offsetPosition =
          targetPosition -
          window.innerHeight / 2 +
          targetElement.clientHeight / 2;

        window.scrollTo({
          top: offsetPosition - 100,
          behavior: "smooth",
        });
      }
    });
  });

  document.addEventListener("click", function (event) {
    if (
      navbarLinks.classList.contains("active") &&
      !navbarLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      navbarLinks.classList.remove("active");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      navbarLinks.classList.remove("active");
    }
  });

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
        from_name: name,
        from_email: email,
        message: message,
      };

      emailjs
        .send("service_xwh1ukj", "template_mv4guby", formData)
        .then(function (response) {
          console.log("Email enviado!", response.status, response.text);
          console.alert("Email enviado com sucesso!");
          showMessage("success");
          contactForm.reset();
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
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("error-message");

  if (type === "success") {
    successMessage.style.display = "block";
    errorMessage.style.display = "none";

    setTimeout(function () {
      successMessage.style.display = "none";
    }, duration);
  } else {
    errorMessage.style.display = "block";
    successMessage.style.display = "none";

    setTimeout(function () {
      errorMessage.style.display = "none";
    }, duration);
  }
}

function resetForm() {
  document.getElementById("contact-form").reset();
}


