function onFileSelected(event) {
  const selectedFile = event.target.files[0];
  const reader = new FileReader();

  const imgtag = document.getElementById("myImage");
  imgtag.title = selectedFile.name;

  reader.onload = function(event) {
    // set the div element with "id=myImage" to show the uploaded image file
    imgtag.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);

  const predictionEl = document.getElementById('prediction')
  //const confidencesEl = document.getElementById('confidences')
  const errorEl = document.getElementById('error')

  reader.addEventListener("loadend", function() {             
      // Make a API call by passing our image
      
      fetch('https://danilovabg-detection-project.hf.space/run/predict/', {
          method: "POST",
          // reader.result is the base64 string of the uploaded image
          body: JSON.stringify({"data": [reader.result]}),
          headers: { "Content-Type": "application/json" } })
          .then(function(response) {
            if (response.status != 200) {
                // early return if the api errors out and show error message
                errorEl.innerHTML = '<u>Sorry the API is not working currently. Please try again later</u>'
                predictionEl.innerHTML = '';
                confidencesEl.innerHTML = '';
                return;
            }
            return response.json(); })
            .then(function(json_response) {

              const imgtag = json_response?.data[0]?.string;

              // Get the confidences for cat and dog
              // firstLabel and secondLabel are cat and dog
              // the order changes depending on the category predicted,
              // that's why the variable names are not fixed to catLabel/dogLabel
              //const firstLabel = json_response?.data[0]?.string;


              // show the prediction
              predictionEl.innerHTML = `🎉 <u>Prediction: ${label}</u> 🎉`
              confidencesEl.innerHTML = `Confidence:<br>
                                          ${firstLabel}: ${firstLabelConfidence}<br>
                                          ${secondLabel}: ${secondLabelConfidence}`
              errorEl.innerHTML = '';
              return;
            })
  });
}
