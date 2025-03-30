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
const totalImages = images.length;
let currentIndex = 0;

function moveSlide(direction) {
    const imageWidth = images[0].clientWidth + 20; // Ancho de la imagen + gap
    const maxScroll = (totalImages - 1) * imageWidth;

    // Actualizar el índice según la dirección
    currentIndex += direction;

    // Asegurarse de que el índice se mantenga dentro del rango
    if (currentIndex < 0) {
        currentIndex = 0; // No permitir ir antes del primer elemento
    } else if (currentIndex >= totalImages) {
        currentIndex = totalImages - 1; // No permitir ir más allá del último elemento
    }

    // Realizar la transición del carrusel
    carousel.style.transition = "transform 0.5s ease"; // Añadir transición suave
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

// Opcional: Detectar el tamaño de las imágenes dinámicamente
window.addEventListener("resize", () => {
    const imageWidth = images[0].clientWidth + 20; // Asegurarse de que el cálculo se haga correctamente
    const maxScroll = (totalImages - 1) * imageWidth;
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`; // Ajustar posición al redimensionar
});



