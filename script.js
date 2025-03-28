document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const formId = form.id;
      let formData = {
        formulario: formId,
        nombre: form.querySelector("#nombre").value,
        email: form.querySelector("#email").value,
        telefono: form.querySelector("#telefono").value
      };
  
      if (formId === "form-crearproducto") {
        formData.cantidad = form.querySelector("#cantidad").value;
        formData.consulta = form.querySelector("#consulta").value;
      } else if (formId === "form-produccionvolumen") {
        formData.marca = form.querySelector("#marca").value;
        formData.servicio = form.querySelector("#servicio").value;
        formData.cantidad = form.querySelector("#cantidad").value;
        formData.consulta = form.querySelector("#consulta").value;
      }
  
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbw_TATNncyJxckitCxu5pwdwDlYAaY4Lpestl7OWUDFDNFNA3YJo_PyInngPLCRalzE/exec", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
  
        const result = await response.json();
        console.log(result);
        alert(result.message || "Error en el envío");
      } catch (error) {
        console.error("Error:", error);
        alert("Error al enviar el formulario");
      }
    });
  });
  