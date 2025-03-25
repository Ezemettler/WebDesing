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
        fetch('https://script.google.com/macros/s/AKfycbz0lrsUWaQDCfmwCHvhOLDUviT41sAPGP65xpSGKI1LunXRY4HGcXVWTMKbj2jKfOo/exec', {

            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.text())
        .then(responseText => {
            alert(responseText); // Muestra la respuesta del servidor
        })
        .catch(error => {
            alert('Error: ' + error); // Muestra el error si ocurre
        });
    }
});
