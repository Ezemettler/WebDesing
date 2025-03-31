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
const container = carousel.parentElement;

let currentIndex = 0;
const visibleImages = 2; // Número de imágenes visibles a la vez
const totalImages = images.length;
const imageWidth = container.clientWidth / visibleImages; // Ajustar el ancho de cada imagen

// Asegurar que cada imagen tenga el ancho correcto
images.forEach(img => {
    img.style.width = `${imageWidth}px`;
});

function moveSlide(direction) {
    const maxIndex = totalImages - visibleImages; // Última posición permitida

    currentIndex += direction * visibleImages; // Mover de a 2 imágenes

    // No permitir que se mueva más allá del inicio
    if (currentIndex < 0) {
        currentIndex = 0;
    } 

    // No permitir que se mueva más allá del final
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Mover el carrusel
    carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

