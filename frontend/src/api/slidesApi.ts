import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

export const generateSlides = async (prompt: string) => {
  try {
    const response = await axios.post(`${API_BASE}/chat/generate`, { prompt });
    return response.data; 
  } catch (error) {
    console.error("Slide generation API error:", error);
    throw error;
  }
};

interface Slide {
  title: string;
  content: string;
}

export const downloadPpt = async (slides: Slide[]) => {
  try {
    const response = await axios.post(`${API_BASE}/ppt/download`, { slideData: { slides } }, { responseType: "blob" });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement("a");
    a.href = url;
    a.download = `Presentation_${Date.now()}.pptx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("PPT download API error:", error);
    throw error;
  }
};
