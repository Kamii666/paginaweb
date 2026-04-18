document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            // Prevenir recarga de página
            event.preventDefault();
            
            // Limpiar alertas previas
            clearAlerts();

            let isValid = true;

            // 1. Validar Nombre (Mínimo 3 caracteres)
            const inputNombre = document.getElementById('nombre');
            if (inputNombre.value.trim().length < 3) {
                showError(inputNombre, 'El nombre debe tener al menos 3 caracteres.');
                isValid = false;
            } else {
                showSuccess(inputNombre);
            }

            // 2. Validar Email (Formato válido)
            const inputEmail = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(inputEmail.value.trim())) {
                showError(inputEmail, 'Por favor, ingrese un correo electrónico válido.');
                isValid = false;
            } else {
                showSuccess(inputEmail);
            }

            // 3. Validar Select (Obligatorio)
            const selectAsunto = document.getElementById('asunto');
            if (selectAsunto.value === '') {
                showError(selectAsunto, 'Debe seleccionar un asunto para su mensaje.');
                isValid = false;
            } else {
                showSuccess(selectAsunto);
            }

            // 4. Validar Mensaje (Mínimo 20 caracteres)
            const inputMensaje = document.getElementById('mensaje');
            if (inputMensaje.value.trim().length < 20) {
                showError(inputMensaje, 'El mensaje debe contener al menos 20 caracteres.');
                isValid = false;
            } else {
                showSuccess(inputMensaje);
            }

            // 5. Validar Checkbox (Términos y condiciones)
            const inputTerminos = document.getElementById('terminos');
            if (!inputTerminos.checked) {
                showError(inputTerminos, 'Debe aceptar los términos y condiciones.');
                isValid = false;
            } else {
                showSuccess(inputTerminos);
            }

            // Si todo es válido
            if (isValid) {
                // Simulación de envío exitoso sin alert()
                const formContainer = document.getElementById('formContainer');
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-4 animate__animated animate__fadeIn';
                successMessage.innerHTML = '<strong>¡Éxito!</strong> Tu mensaje ha sido enviado correctamente. Nos pondremos en contacto contigo pronto.';
                
                // Limpiar formulario y mostrar mensaje general
                contactForm.reset();
                // Quitar clases is-valid
                document.querySelectorAll('.is-valid').forEach(el => el.classList.remove('is-valid'));
                
                formContainer.prepend(successMessage);

                // Remover el mensaje después de 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
    }

    // Funciones auxiliares para mostrar errores en UI
    function showError(inputElement, message) {
        inputElement.classList.add('is-invalid');
        inputElement.classList.remove('is-valid');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'invalid-feedback form-error';
        errorDiv.innerText = message;
        
        // Agregar el error después del input
        if (inputElement.type === 'checkbox') {
            inputElement.parentElement.appendChild(errorDiv);
        } else {
            inputElement.parentElement.appendChild(errorDiv);
        }
    }

    function showSuccess(inputElement) {
        inputElement.classList.remove('is-invalid');
        inputElement.classList.add('is-valid');
    }

    function clearAlerts() {
        const errors = document.querySelectorAll('.form-error');
        errors.forEach(error => error.remove());
        
        const generalSuccess = document.querySelector('.alert-success');
        if (generalSuccess) generalSuccess.remove();
    }
});
