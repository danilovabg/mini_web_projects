const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { detect } = require("./detection"); // функция обработки изображения

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));

app.post("/detect", upload.single("image"), async (req, res) => {
	if (!req.file) {
		res.status(400).json({ error: "No image file provided" });
		return;
	}

	const image = req.file.buffer;
	const result = await detect(image);

	if (!result) {
		res.status(500).json({ error: "Error running object detection" });
		return;
	}

	const resultImgPath = "public/result.png";

	fs.writeFile(resultImgPath, result, (err) => {
		if (err) {
			res.status(500).json({ error: "Error saving result image" });
			return;
		}

		res.json({ result: resultImgPath });
	});
});

app.listen(3000, () => {
	console.log("Server started on port 3000");
});
