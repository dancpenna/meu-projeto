document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const encryptBtn = document.getElementById('encrypt-btn');
    const decryptBtn = document.getElementById('decrypt-btn');
    const copyBtn = document.getElementById('copy-btn');
    const placeholderImage = document.getElementById('placeholder-image');
    const validationMessage = document.getElementById('validation-message');

    // Cifra de César com deslocamento de 3
    function caesarCipher(str, shift) {
        return str.split('').map(char => {
            const code = char.charCodeAt(0);
            if (code >= 97 && code <= 122) { // Minúsculas
                return String.fromCharCode(((code - 97 + shift) % 26 + 26) % 26 + 97);
            }
            return '';
        }).join('');
    }

    function handleInputChange() {
        const input = inputText.value;
        if (input.trim()) {
            placeholderImage.style.display = 'none';
        } else {
            placeholderImage.style.display = 'block';
        }
        
        // Validação de caracteres
        if (/[^a-z0-9\s]/.test(input)) {
            validationMessage.style.display = 'block';
            inputText.value = input.replace(/[^a-z0-9\s]/g, '');
        } else {
            validationMessage.style.display = 'none';
        }
    }

    inputText.addEventListener('input', handleInputChange);

    encryptBtn.addEventListener('click', () => {
        outputText.value = caesarCipher(inputText.value, 3);
    });

    decryptBtn.addEventListener('click', () => {
        outputText.value = caesarCipher(inputText.value, -3);
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.value)
            .then(() => alert('Texto copiado para a área de transferência!'))
            .catch(err => alert('Erro ao copiar texto: ' + err));
    });
});