import { useQueryState } from "nuqs";
import { Button } from "@/components/ui/button";
import { useRef, useCallback } from "react";
import { Download } from "lucide-react";
import { Highlight } from "prism-react-renderer";
import { domToImage } from "@/lib/domToImage";
import { codeThemes, gradients, languages } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Dots from "./Dots";
import { Label } from "./ui/label";

export default function SyntaxHighlightingSnippet() {
  const [title, setTitle] = useQueryState("title", {
    defaultValue: "Untitled-1",
  });
  const [language, setLanguage] = useQueryState("language", {
    defaultValue: "typescript",
  });
  const [codeTheme, setCodeTheme] = useQueryState("codeTheme", {
    defaultValue: "dracula",
  });
  const [gradient, setGradient] = useQueryState("gradient", {
    defaultValue: "lavender",
  });

  const [code, setCode] = useQueryState("code", {
    defaultValue: btoa(`function sum(a: number, b: number) {
  return a + b;
}

console.log(sum(5, 3));
`),
  });

  const cardRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const decodedCode = atob(code);

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newCode = e.target.value;
      setCode(btoa(newCode));
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
    },
    [setCode]
  );

  const exportAsImage = async () => {
    if (cardRef.current) {
      const dataUrl = await domToImage(cardRef.current);
      const link = document.createElement("a");
      link.download = `${title}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  const gradientChange = (value: string) => setGradient(value);
  const codeThemeChange = (value: string) => setCodeTheme(value);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        ref={cardRef}
        className={`flex flex-col ${
          gradients[gradient as keyof typeof gradients]
        } p-10 rounded-lg shadow-lg`}
      >
        <div className="bg-black/70 border-2 rounded-lg border-[#122a29]/40 overflow-hidden">
          <div className="flex justify-between items-center px-3 py-2">
            <Dots />
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              className="bg-transparent  text-gray-300 text-center text-sm focus:outline-none"
            />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-gray-300 text-sm focus:outline-none border-none"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <Highlight
              theme={codeThemes[codeTheme as keyof typeof codeThemes]}
              code={decodedCode}
              language={language as any}
            >
              {({ className, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={`${className} p-4 m-0 overflow-auto bg-transparent`}
                >
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
            <textarea
              ref={textareaRef}
              value={decodedCode}
              onChange={handleInput}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              className="absolute top-0 caret-white left-0 w-full h-full resize-none p-4 font-mono bg-transparent text-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-4 items-center">
        <div className="flex flex-col gap-2">
          <Label htmlFor="codeThemeSelect " className="text-gray-400 font-bold">
            Theme
          </Label>
          <Select value={codeTheme} onValueChange={codeThemeChange}>
            <SelectTrigger className="dark w-[150px]" id="codeThemeSelect">
              <SelectValue placeholder={"Select a theme"} />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectGroup className="dark">
                <SelectItem value="nightOwl">Night Owl</SelectItem>
                <SelectItem value="dracula">Dracula</SelectItem>
                <SelectItem value="vsDark">VS Dark</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="codeThemeSelect " className="text-gray-400 font-bold">
            Background
          </Label>
          <Select value={gradient} onValueChange={gradientChange}>
            <SelectTrigger className="dark w-[150px]">
              <SelectValue placeholder={"Select a gradient"} />
            </SelectTrigger>
            <SelectContent className="dark">
              <SelectGroup className="dark">
                {Object.entries(gradients).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex gap-2">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                      <div className={`${value} h-5 w-5 rounded-full`} />
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={exportAsImage} className="mt-5">
          <Download className="mr-2 h-4 w-4" />
          Export Snippet
        </Button>
      </div>
    </div>
  );
}
