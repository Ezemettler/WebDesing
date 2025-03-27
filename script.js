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
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = { formulario: tipoFormulario };
        formData.forEach((value, key) => {
            data[key] = value;
        });

        console.log("Datos enviados al servidor: ", data);
        sendToGoogleSheets(data);
    }

    function sendToGoogleSheets(data) {
        const urlData = new URLSearchParams();
        for (const key in data) {
            urlData.append(key, data[key]);
        }

        fetch('https://script.google.com/macros/s/AKfycbwXW36nfecU1P6PeG0JKQlL8uquvXXF-SIdK068fMO6zp1FAhMcXcJuiXoL6c4T9bOV/exec', {
            method: 'POST',
            body: urlData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(responseData => {
            alert(responseData.message || "Éxito");
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
    }
});