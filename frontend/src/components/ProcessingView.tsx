import { useEffect, useState } from "react";
import { Loader2, Search, Globe } from "lucide-react";
import { generateSlides } from "@/api/slidesApi";

interface ProcessingViewProps {
  topic: string;
  onComplete: (slides: []) => void;
}

const ProcessingView = ({ topic, onComplete }: ProcessingViewProps) => {
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState("Starting generation...");

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    const generate = async () => {
      try {
        interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + Math.floor(Math.random() * 10) : prev));
        }, 500);

        setStatusMessage("Generating slides for your topic...");
        const data = await generateSlides(topic);

        clearInterval(interval);
        setProgress(100);
        setStatusMessage("Slides generation complete!");
        // wait a moment so user sees 100% completion
        setTimeout(() => {
          onComplete(data.slides || []);
        }, 500);
      } catch (err) {
        clearInterval(interval);
        console.error("Slide generation failed:", err);
        setStatusMessage("Error generating slides. Please try again.");
      }
    };

    generate();

    return () => clearInterval(interval);
  }, [topic, onComplete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center max-w-2xl">
        <Loader2 className="h-12 w-12 animate-spin mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-bold text-foreground mb-2">Generating Presentation</h2>
        <p className="text-sm text-muted-foreground mb-6">{statusMessage}</p>

        <div className="w-full bg-border rounded-full h-3 overflow-hidden">
          <div
            className="h-3 bg-accent transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-muted-foreground">
          Topic: <span className="font-medium">{topic}</span>
        </div>

        {/* Optional: Show some example searches */}
        <div className="mt-6 space-y-2">
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
            <Search className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-card-foreground">Searching relevant content</span>
            <Globe className="ml-1 h-3 w-3 text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground">
            We are analyzing multiple sources to create a concise and informative presentation for you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessingView;





// import { Loader2, Search, Globe } from "lucide-react";
// import { Button } from "@/components/ui/button";

// interface ProcessingViewProps {
//   topic: string;
//   onComplete: () => void;
// }

// const ProcessingView = ({ topic, onComplete }: ProcessingViewProps) => {
//   // Auto-advance after animation
//   setTimeout(() => {
//     onComplete();
//   }, 4000);

//   return (
//     <div className="min-h-screen bg-background px-4 py-8">
//       <div className="mx-auto max-w-3xl">
//         {/* Header */}
//         <div className="mb-8 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground">
//               <Loader2 className="h-5 w-5 animate-spin text-background" />
//             </div>
//           </div>
//           <span className="text-sm text-muted-foreground">4 slides generated</span>
//         </div>

//         {/* Decision Section */}
//         <div className="mb-6 space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-semibold text-accent">Decision</span>
//           </div>
//           <h2 className="text-xl font-bold text-foreground">Defining the Scope</h2>
//           <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
//             <p className="text-sm leading-relaxed text-card-foreground">
//               Before diving into the technicalities of artificial intelligence (AI), I've formulated specific
//               search queries to guide my exploration of AI. I'm crafting this presentation to articulate AI's
//               definition, applications, societal impacts, and future trends. I'm now gathering data from several
//               reputable sources to build a thorough understanding of the topic. The current priority is to
//               gather this information so that I can create a strong presentation outline.
//             </p>
//             <p className="text-sm leading-relaxed text-muted-foreground">
//               I'll start by getting more information about AI to create a comprehensive presentation for you.
//             </p>
//           </div>
//         </div>

//         {/* Searching Section */}
//         <div className="mb-6 space-y-3">
//           <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3">
//             <Search className="h-4 w-4 text-muted-foreground" />
//             <span className="text-sm font-medium text-card-foreground">Searching the web</span>
//             <Globe className="ml-1 h-3 w-3 text-muted-foreground" />
//             <span className="text-xs text-muted-foreground">What is Artificial Intelligence?</span>
//           </div>

//           <p className="text-sm text-card-foreground">
//             I've found several good resources defining AI. Now I'll need a couple of lines to get a deeper
//             understanding.
//           </p>

//           <div className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
//             <Globe className="mt-1 h-4 w-4 text-muted-foreground" />
//             <div className="flex-1">
//               <p className="text-sm font-medium text-card-foreground">Reading website</p>
//               <p className="text-xs text-muted-foreground">
//                 https://en.wikipedia.com/wiki/Artificial_intelligence
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Thinking Section */}
//         <div className="mb-6 space-y-3">
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-semibold text-accent">Thinking</span>
//           </div>
//           <h2 className="text-xl font-bold text-foreground">Analyzing NASA's Perspective</h2>
//           <div className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
//             <p className="text-sm leading-relaxed text-card-foreground">
//               I've just finished reading the NASA article. It offered a captivating view on AI use cases,
//               particularly in space exploration, and provided different insights. The information from both
//               sources will be instrumental in shaping the presentation outline. The slides will cover AI's
//               definition, types, generative AI, applications, benefits, challenges, and future outlook. I'm
//               aiming for a concise yet informative presentation.
//             </p>
//           </div>

//           <p className="text-sm text-muted-foreground">
//             I've gathered a sound initial understanding of AI from the NASA article, covering its definition,
//             types, applications, benefits, and challenges. I'm aiming for a concise yet informative
//             presentation.
//           </p>

//           <div className="rounded-lg border border-border bg-card px-4 py-3">
//             <p className="text-sm text-muted-foreground">
//               <span className="font-medium text-card-foreground">Start with a topic, we'll turn it into slides!</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProcessingView;
