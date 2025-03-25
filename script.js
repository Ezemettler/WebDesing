document.addEventListener("DOMContentLoaded", function () {
    const formCrearProducto = document.getElementById("form-crearproducto");
    const formProduccionVolumen = document.getElementById("form-produccionvolumen");

    if (formCrearProducto) {
        formCrearProducto.addEventListener("submit", function (event) {
            handleSubmit(event, "form-crearproducto");
        });
    }

    if (formProduccionVolumen) {
        formProduccionVolumen.addEventListener("submit", function (event) {
            handleSubmit(event, "form-produccionvolumen");
        });
    }

    function handleSubmit(event, tipoFormulario) {
        event.preventDefault(); // Evita que la página se recargue

        const formData = new FormData(event.target);
        const data = { formulario: tipoFormulario }; // Agregamos el id del formulario como valor

        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Verifica que los datos sean correctos antes de enviarlos
        console.log("Datos enviados al servidor: ", data);

        // Llamada a la función que envía los datos al servidor de Google Apps Script
        sendToGoogleSheets(data);
    }

    function sendToGoogleSheets(data) {
        fetch('https://script.google.com/macros/s/AKfycbwR5AS5XO7U5V5Gmc1iOcjMgs8_SQ_mLD2PKUlYMR8TIe0A8FnHoTvVSuphJ3o3DHRJ/exec', {
          method: 'POST',
          body: JSON.stringify(data), // Sigue usando JSON
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors', // Asegura que se use CORS
          redirect: 'follow' // Maneja redirecciones si las hay
        })
        .then(response => response.json()) // Cambié a .json() para parsear la respuesta correctamente
        .then(responseData => {
          alert(responseData.message || "Éxito"); // Muestra el mensaje del servidor
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Error: ' + error.message);
        });
      }
});
