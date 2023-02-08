const response = await fetch("https://danilovabg-detection-project.hf.space/run/predict", {
	method: "POST",
	headers: { "Content-Type": "application/json" },
	body: JSON.stringify({
		data: [
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==",
		]
	})
});

const data = await data.json();
