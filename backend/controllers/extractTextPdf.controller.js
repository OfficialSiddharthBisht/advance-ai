const pdf = require("pdf-parse");
const { OpenAIApi } = require("openai");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); 
    }
});

const upload = multer({ storage: storage });

async function extractTextFromPDF(file) {
    try{
    const dataBuffer = await file.buffer;
    const data = new Uint8Array(dataBuffer);
    const pdfData = new Uint16Array(data);
    const dataPromise = pdf(pdfData);
    const content = (await dataPromise).text;
    return content;
    }catch(error){
        console.error('Error while extracting text from PDF:', error);
        throw error;
    }
}

// Define the route and use the upload middleware here
exports.summarization = [
    upload.single('file'),
    catchAsyncErrors(async (req, res) => {
        try {
            const uploadedFile = req.file;

            if (!uploadedFile) {
                return res.status(400).json({ error: "Please upload a file" });
            }

            let content = "";
            if (uploadedFile.mimetype === "text/plain") {
                content = uploadedFile.buffer.toString("utf-8");
            } else if (uploadedFile.mimetype === "application/pdf") {
                content = await extractTextFromPDF(uploadedFile);
            }

            const summaryRequest = req.body.summaryRequest || "";
            const messages = [
                { role: "system", content: "You are a summarization assistant." },
                {
                    role: "user",
                    content: `Please make a summary of the content for: ${summaryRequest}`,
                },
                { role: "user", content },
            ];

            // Create the OpenAI API client
            const openai = new OpenAIApi({ key: process.env.OPEN_API_KEY });
            const response = await openai.createCompletion({
                prompt: messages
                    .map((message) => message.role + ": " + message.content)
                    .join("\n"),
                max_tokens: 200,
            });

            res.json({ summary: response.choices[0].text });
        } catch (error) {
            console.error("Error in /summarization route:", error);
            res.status(500).json({ error: "An error occurred while processing the request." });
        }
    })
];
