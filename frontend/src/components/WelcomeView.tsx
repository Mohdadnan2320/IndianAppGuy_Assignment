import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface WelcomeViewProps {
  onGenerate: (topic: string) => void;
}

const WelcomeView = ({ onGenerate }: WelcomeViewProps) => {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="mb-3 text-4xl font-bold text-foreground md:text-5xl">
          Hello, piyuindia4!
        </h1>
        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          What do you want me to generate today?
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative rounded-xl border border-border bg-card shadow-[var(--shadow-soft)] transition-shadow hover:shadow-[var(--shadow-medium)]">
            <Input
              type="text"
              placeholder="Start with a topic, we'll turn it into slides!"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="border-0 bg-transparent px-4 py-6 text-base focus-visible:ring-0 md:px-6 w-auto"
            />
            <div className="absolute right-2 top-1/2 flex -translate-y-1/2 gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-lg text-muted-foreground hover:text-foreground"
              >
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="h-10 w-10 rounded-lg bg-muted hover:bg-muted/80"
                disabled={!topic.trim()}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WelcomeView;
