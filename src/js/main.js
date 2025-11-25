  /* typewriter cuz fun */
function typeWriterLabels(containerId, speed = 10) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const labels = Array.from(container.querySelectorAll("label"));
    const inputs = Array.from(
        container.querySelectorAll("input[type='text'], textarea")
    );

    labels.forEach(label => {
        const html = label.innerHTML;

        const fullText = html.replace(/<br\s*\/?>/gi, "\n");

        label.dataset.fulltext = fullText;
        label.textContent = "";              
        label.style.visibility = "hidden";   
        label.classList.add("fade-in");
    });

    inputs.forEach(input => {
        input.style.visibility = "hidden";   // hide inputs until their label is done
        input.classList.add("fade-in");
    });

    let labelIndex = 0;

    function typeNextLabel() {
        if (labelIndex >= labels.length) return;

        const label = labels[labelIndex];
        const fullText = label.dataset.fulltext || "";
        let charIndex = 0;

        label.style.visibility = "visible";  // show current label container

        function typeChar() {
            if (charIndex <= fullText.length) {
                label.textContent = fullText.slice(0, charIndex);
                charIndex++;
                setTimeout(typeChar, speed);
            } else {
                // Label finished > reveal corresponding input
                if (inputs[labelIndex]) {
                    inputs[labelIndex].style.visibility = "visible";
                }
                labelIndex++;
                typeNextLabel();
            }
        }

        typeChar();
    }

    typeNextLabel();
}
 
 function showLG99() {
        document.getElementById("LG99Page").classList.add("active");
        document.getElementById("LG77Page").classList.remove("active");

        document.getElementById("btn-lg99").classList.add("active");
        document.getElementById("btn-lg77").classList.remove("active");

        typeWriterLabels("LG99Page", 3);
    }

    function showLG77() {
        document.getElementById("LG77Page").classList.add("active");
        document.getElementById("LG99Page").classList.remove("active");

        document.getElementById("btn-lg77").classList.add("active");
        document.getElementById("btn-lg99").classList.remove("active");

        typeWriterLabels("LG77Page", 3);
    }

    /* clicky clicky clicky clicky click */
    function flashButton(btnId) {
    const btn = document.getElementById(btnId);
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 125); 
}
    
    function getActiveFormId() {
        return document.getElementById("LG99Page").classList.contains("active")
            ? "myFormLG99"
            : "myFormLG77";
    }

    function generateTextContent(formId) {
        var form = document.getElementById(formId);
        var formData = new FormData(form);
        var textContent = "";
        formData.forEach(function(value, key) {
            var inputElement = form.querySelector('input[name="' + key + '"]');
            var labelElement = inputElement
                ? form.querySelector('label[for="' + inputElement.id + '"]')
                : null;
            var question = labelElement ? labelElement.textContent : key;
            textContent += question + "\n" + value + "\n\n";
        });
        return textContent;
    }

    function copyToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }

    function copyActiveForm() {
    flashButton("btn-copy");      // NEW
    var formId = getActiveFormId();
    var textContent = generateTextContent(formId);
    copyToClipboard(textContent);
}

    function resetForm(formId) {
        document.getElementById(formId).reset();
    }

    function resetActiveForm() {
    flashButton("btn-reset");     // NEW
    var formId = getActiveFormId();
    resetForm(formId);
}