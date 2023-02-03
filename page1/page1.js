
(() => {
    'use strict';
    const classificationEndpoint = "https://danilovabg-simpsons-classificator.hf.space/run/predict/";
    const resultsElement = document.querySelector('.result');

    /**
     * Clear previous results
     */
    function resetResultsText() {
        resultsElement.innerHTML = '';
    }

    /**
     * Output results on the page
     * @param {Object} result
     */
    function outputResults(result) {
        result = <img src="${document.querySelector('input[type="file"]').value}">;
        let resultHTML;

        result.forEach((element) => {
            resultHTML = `<hr> ${element.label} <br><br>`;

            if (element.confidences) {
                element.confidences.forEach((element) => {
                    resultHTML += `${element}<br>`;
                });
            }
        });

        resultsElement.innerHTML = resultHTML;
    }

    /**
     * Convert file to base64
     * @param {Node} fileInput
     * @returns {Promise<void>}
     */
    async function fileInputToBase64 (fileInput) {
        debugger;
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(fileInput.files[0]);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    }

    /**
     * Handle form submission
     * @param {Object} formData
     */
    async function formSubmit(formData) {
        fetch(classificationEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(res => outputResults(res.data))
    }

    document.querySelector('form').addEventListener('submit', async (e) => {
        e.stopPropagation();
        e.preventDefault();
        resetResultsText();

        const fileInput = e.target.querySelector('input[type="file"]');
        const encodedFile = await fileInputToBase64(fileInput);
        const formData = {
            data: [ encodedFile ]
        };

        await formSubmit(formData);
    });
})();
