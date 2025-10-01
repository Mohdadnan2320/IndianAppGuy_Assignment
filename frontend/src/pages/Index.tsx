import { useState } from "react";
import WelcomeView from "@/components/WelcomeView";
import ProcessingView from "@/components/ProcessingView";
import PresentationView from "@/components/PresentationView";
import { generateSlides } from "@/api/slidesApi";

type ViewState = "welcome" | "processing" | "presentation";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("welcome");
  const [topic, setTopic] = useState("");
  const [slides, setSlides] = useState<[]>([]);

  const handleGenerate = async (newTopic: string) => {
    setTopic(newTopic);
    setCurrentView("processing");

    try {
      const data = await generateSlides(newTopic);
      setSlides(data.slides);
      setCurrentView("presentation");
    } catch (err) {
      alert("Slide generation failed");
      setCurrentView("welcome");
    }
  };

  const handleBack = () => {
    setCurrentView("welcome");
    setTopic("");
    setSlides([]);
  };

  return (
    <>
      {currentView === "welcome" && <WelcomeView onGenerate={handleGenerate} />}
      {currentView === "processing" && <ProcessingView topic={topic} onComplete={() => {}} />}
      {currentView === "presentation" && (
        <PresentationView topic={topic} slides={slides} onBack={handleBack} />
      )}
    </>
  );
};

export default Index;


// import { useState } from "react";
// import WelcomeView from "@/components/WelcomeView";
// import ProcessingView from "@/components/ProcessingView";
// import PresentationView from "@/components/PresentationView";

// type ViewState = "welcome" | "processing" | "presentation";

// const Index = () => {
//   const [currentView, setCurrentView] = useState<ViewState>("welcome");
//   const [topic, setTopic] = useState("");

//   const handleGenerate = (newTopic: string) => {
//     setTopic(newTopic);
//     setCurrentView("processing");
//   };

//   const handleProcessingComplete = () => {
//     setCurrentView("presentation");
//   };

//   const handleBack = () => {
//     setCurrentView("welcome");
//     setTopic("");
//   };

//   return (
//     <>
//       {currentView === "welcome" && <WelcomeView onGenerate={handleGenerate} />}
//       {currentView === "processing" && (
//         <ProcessingView topic={topic} onComplete={handleProcessingComplete} />
//       )}
//       {currentView === "presentation" && (
//         <PresentationView topic={topic} onBack={handleBack} />
//       )}
//     </>
//   );
// };

// export default Index;
