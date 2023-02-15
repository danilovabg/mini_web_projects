const inputImage = document.getElementById("inputImage");
const submitBtn = document.getElementById("submitBtn");
const outputImage = document.getElementById("outputImage");

submitBtn.addEventListener("click", async () => {
  const imageFile = inputImage.files[0];
  if (!imageFile) return alert("Please select an image.");
  
  const reader = new FileReader();
  reader.readAsDataURL(imageFile);
  reader.onload = async () => {
    const imageData = reader.result.split(",")[1];
    const response = await fetch("https://danilovabg-detection-project.hf.space/run/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: [imageData] })
    });
    const jsonResponse = await response.json();
    const outputImageData = jsonResponse.data[0];
    outputImage.src = `data:image/png;base64,${outputImageData}`;
  };
});
