import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  CheckCircle,
  AlertTriangle,
  FileCode,
  Terminal,
  Loader2,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewCampaign() {
  const [inputMethod, setInputMethod] = useState<"cve" | "source">("cve");
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [showGuideline, setShowGuideline] = useState(false);
  const { toast } = useToast();

  const handleStartPreprocessing = () => {
    setIsPreprocessing(true);
    // Simulate backend delay
    setTimeout(() => {
      setIsPreprocessing(false);
      setShowGuideline(true);
      toast({
        title: "Preprocessing Complete",
        description: "Analysis finished. Please review environment guidelines.",
      });
    }, 2000);
  };

  const handleVerifyExploit = () => {
    toast({
      title: "Exploit Verification Started",
      description:
        "The system is now attempting to reproduce the exploit in the sandbox.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-semibold mb-2">New Campaign</h1>
            <p className="text-foreground-secondary">
              Configure and launch a new vulnerability analysis campaign.
            </p>
          </div>

          <Card className="bg-background-secondary/50 border-border">
            <CardHeader>
              <CardTitle>Input Configuration</CardTitle>
              <CardDescription>
                Select the type of input for analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Input Method</Label>
                <Select
                  value={inputMethod}
                  onValueChange={(val: "cve" | "source") => setInputMethod(val)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select input method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cve">
                      CVE Information (Text/File)
                    </SelectItem>
                    <SelectItem value="source">Source Code / Binary</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {inputMethod === "cve" ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <Label>CVE ID (Optional)</Label>
                    <Input placeholder="e.g. CVE-2024-1234" />
                  </div>
                  <div className="space-y-2">
                    <Label>Description / Details</Label>
                    <Textarea
                      placeholder="Paste vulnerability details, stack traces, or invalid inputs here..."
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Advisory File</Label>
                    <Input type="file" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 rounded-lg bg-info/10 text-info border border-info/20 flex gap-3 text-sm">
                    <Terminal className="h-5 w-5 shrink-0" />
                    <p>
                      For binaries and source code, preprocessing behaves
                      differently including static analysis and symbol
                      extraction. Ensure you provide the correct build flags if
                      uploading source.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Target Name</Label>
                    <Input placeholder="e.g. nginx-1.24.0" />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Source Archive / Binary</Label>
                    <Input type="file" />
                  </div>
                  <div className="space-y-2">
                    <Label>Build Instructions (if source)</Label>
                    <Textarea placeholder="./configure --with-debug && make" />
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                size="lg"
                className="glow-effect"
                onClick={handleStartPreprocessing}
                disabled={isPreprocessing}
              >
                {isPreprocessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Preprocessing...
                  </>
                ) : (
                  <>
                    <FileCode className="mr-2 h-4 w-4" />
                    Start Preprocessing
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>

          {showGuideline && (
            <div className="animate-fade-in space-y-6">
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <CheckCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle>Environment Guidelines</CardTitle>
                      <CardDescription>
                        Recommended environment configuration for accurate
                        reproduction.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-black/50 p-4 border border-white/10 font-mono text-sm overflow-x-auto">
                    <pre className="text-green-400">
                      {`# Generated Dockerfile for Sandbox
FROM ubuntu:22.04

# Dependencies
RUN apt-get update && apt-get install -y \\
    build-essential \\
    clang \\
    cmake \\
    libssl-dev

# Environment
ENV ASAN_OPTIONS=detect_leaks=0
ENV AFL_USE_ASAN=1

# Workdir
WORKDIR /campaign
COPY . /campaign

# Build
RUN ./configure && make`}
                    </pre>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-foreground-muted">
                    <AlertTriangle className="h-4 w-4 text-warning" />
                    <span>
                      Ensure ASLR is disabled in the host kernel for
                      deterministic reproduction.
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleVerifyExploit}
                    className="w-full"
                    variant="destructive"
                  >
                    Verify Exploit
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
