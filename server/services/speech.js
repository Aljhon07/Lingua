const { createClient } = require("@deepgram/sdk");
const fs = require("fs");

const deepgram = createClient("68be34e3ae7bfb10c767c92a1840817e87ec9e30");
const transcribeFile = async (req, res) => {
    try {
        const audioPath = req.file.path;
        const lang = req.body.language;

        console.log("Language:", lang);
        console.log("Audio path:", audioPath);

        const { result, error } = await deepgram.listen.prerecorded.transcribeFile(
            fs.readFileSync(audioPath),
            {
                language: lang,
                model: "nova-2",
                smart_format: true,
            }
        );

        if (error) throw error;

        const transcript =
            result?.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
        console.log("Transcript:", transcript);

        res.json({ transcript: [transcript] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Transcription failed" });
    } finally {
        if (req.file) fs.unlinkSync(req.file.path);
    }
};

const synthesizeAudio = async (req, res) => {

    const { text, lang } = req.body;

    console.log(lang, text)
    const response = await deepgram.speak.request(
        { text },
        {
            language: lang,
            model: "aura-2-thalia-en",
            encoding: "linear16",
            container: "wav",
        }
    );

    const stream = await response.getStream();
    const headers = await response.getHeaders();
    if (stream) {
        // STEP 4: Convert the stream to an audio buffer
        const buffer = await getAudioBuffer(stream);
        // STEP 5: Write the audio buffer to a file
        fs.writeFile("output.wav", buffer, (err) => {
            if (err) {
                console.error("Error writing audio to file:", err);
            } else {
                console.log("Audio file written to output.wav");
            }
        });
    } else {
        console.error("Error generating audio:", stream);
    }
    if (headers) {
        console.log("Headers:", headers);
    }
};

const getAudioBuffer = async (response) => {
    const reader = response.getReader();
    const chunks = [];
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
    }
    const dataArray = chunks.reduce(
        (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
        new Uint8Array(0)
    );
    return Buffer.from(dataArray.buffer);
};


module.exports = { transcribeFile, synthesizeAudio };
