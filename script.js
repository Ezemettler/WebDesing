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
            await fetch("https://script.google.com/macros/s/AKfycbw_TATNncyJxckitCxu5pwdwDlYAaY4Lpestl7OWUDFDNFNA3YJo_PyInngPLCRalzE/exec", {
                method: "POST",
                mode: "no-cors", // ✅ Evita error CORS
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            // ✅ Redirigir sin esperar respuesta
            if (formId === "form-crearproducto") {
                window.location.href = "gracias_crearproducto.html";
            } else if (formId === "form-produccionvolumen") {
                window.location.href = "gracias_produccionvolumen.html";
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Error al enviar el formulario");
        }
    });
});


const carousel = document.querySelector(".clientes .carousel");
const images = carousel.querySelectorAll("img");
let currentIndex = 0;

function moveSlide(direction) {
    const imageWidth = images[0].clientWidth + 20; // Ancho de imagen + margen (ajustado)
    const container = carousel.parentElement;
    const visibleWidth = container.clientWidth;
    const visibleImages = Math.floor(visibleWidth / imageWidth); // Cuántas imágenes se ven a la vez (2 imágenes)
    const maxIndex = Math.max(0, images.length - visibleImages); // Última posición permitida

    // Actualizamos el índice según la dirección
    currentIndex += direction;

    // No permitir que se mueva más allá del inicio
    if (currentIndex < 0) {
        currentIndex = 0; // No retroceder más allá del inicio
    } 

    // No permitir que se mueva más allá del final
    else if (currentIndex > maxIndex) {
        currentIndex = maxIndex; // Detenerse al llegar al final
    }

    // Actualizar la posición del carrusel
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}
