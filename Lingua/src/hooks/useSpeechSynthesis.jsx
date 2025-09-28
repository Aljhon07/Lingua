import { synthesizeText } from "@services/speech";
import { useState } from "react";


export const useSpeechSynthesis = (text, lang) => {
    const [audioUrl, setAudioUrl] = useState(null);

    const handleSynthesize = async (text, lang) => {
        try {
            const response = await synthesizeText(text, lang);
            const audioUrl = response.data.audioUrl;
            setAudioUrl(audioUrl);
            setIsSpeaking(true);
        } catch (error) {
            console.error("Error in synthesizeText:", error);
        }
    };


    return {
        audioUrl, handleSynthesize
    };
};
