import { useState } from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadPpt } from "@/api/slidesApi";

interface Slide {
  title: string;
  subtitle?: string;
  content?: string;
  bullets?: string[];
  image?: string;
  color?: string; 
}

interface PresentationViewProps {
  topic: string;
  slides: Slide[];
  onBack: () => void;
}

const tailwindColors: Record<string, string> = {
  "blue-600": "#2563EB",
  "purple-700": "#6B21A8",
  "green-500": "#22C55E",
  "teal-600": "#0891B2",
  "yellow-400": "#FACC15",
  "orange-500": "#F97316",
  "pink-500": "#EC4899",
  "red-600": "#DC2626",
  "indigo-400": "#818CF8",
  "cyan-600": "#06B6D4",
};

function getGradientStyle(colorString: string) {
  const parts = colorString.split(" ");
  const fromColor = tailwindColors[parts[0].replace("from-", "")] || "#000";
  const toColor = tailwindColors[parts[1].replace("to-", "")] || "#fff";
  return { background: `linear-gradient(to right, ${fromColor}, ${toColor})` };
}

const PresentationView = ({ topic, slides, onBack }: PresentationViewProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-4 py-3 shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Back
          </Button>
          <span className="text-sm text-muted-foreground">
            {slides.length} slides generated
          </span>
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() =>
              downloadPpt(
                slides.map((slide) => ({
                  title: slide.title,
                  subtitle: slide.subtitle,
                  content: slide.content,
                  bullets: slide.bullets,
                  image: slide.image,
                  color: slide.color,
                }))
              )
            }
          >
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-8 lg:grid-cols-[1fr_400px]">
        {/* Main Content */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="text-2xl font-bold">{slides[currentSlide].title}</h2>
            {slides[currentSlide].subtitle && (
              <p className="text-sm opacity-90 mb-2">
                {slides[currentSlide].subtitle}
              </p>
            )}
            {slides[currentSlide].content && (
              <p className="text-sm mb-2">{slides[currentSlide].content}</p>
            )}
            {slides[currentSlide].bullets &&
              slides[currentSlide].bullets.length > 0 && (
                <ul className="list-disc ml-5 mt-2 text-sm">
                  {slides[currentSlide].bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              )}
          </div>
        </div>

        {/* Sidebar - Slides Preview */}
        <div className="space-y-4">
          {/* Current Slide Preview */}
          <div className="overflow-hidden rounded-xl border border-border shadow-[var(--shadow-medium)]">
            <div
              className="relative aspect-[16/9] flex flex-col items-center justify-center p-6 rounded-xl shadow text-black"
              style={getGradientStyle(slides[currentSlide].color)}
            >
              {slides[currentSlide].image && (
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="mb-3 max-h-32 object-contain"
                />
              )}
              <h2 className="text-2xl font-bold mb-1">
                {slides[currentSlide].title}
              </h2>
              {slides[currentSlide].subtitle && (
                <p className="text-sm opacity-90 mb-2">
                  {slides[currentSlide].subtitle}
                </p>
              )}
              {slides[currentSlide].content && (
                <p className="text-sm mb-2">{slides[currentSlide].content}</p>
              )}
              {slides[currentSlide].bullets &&
                slides[currentSlide].bullets.length > 0 && (
                  <ul className="list-disc ml-5 mt-2 text-sm">
                    {slides[currentSlide].bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              <span className="absolute bottom-4 left-4 text-4xl font-bold text-black/30">
                0{currentSlide + 1}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentSlide === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {currentSlide + 1} / {slides.length}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Slide Thumbnails */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground">
              All Slides
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {slides.map((slide, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`overflow-hidden rounded-lg border transition-all ${
                    currentSlide === index
                      ? "border-accent ring-2 ring-accent/20"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <div
                    className="aspect-[16/9] p-3 flex flex-col justify-center items-center rounded text-black"
                    style={getGradientStyle(slide.color)}
                  >
                    {slide.image && (
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="mb-1 max-h-16 object-contain"
                      />
                    )}
                    <span className="text-xs font-medium">{slide.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PresentationView;

