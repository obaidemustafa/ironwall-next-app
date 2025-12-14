import { useState, useRef } from "react";
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
  Loader2,
  Upload,
  FileText,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewCampaign() {
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [showGuideline, setShowGuideline] = useState(false);
  const [cveFileName, setCveFileName] = useState<string | null>(null);
  const [advisoryFileType, setAdvisoryFileType] = useState<string>("any");
  const [advisoryFileName, setAdvisoryFileName] = useState<string | null>(null);
  const cveFileRef = useRef<HTMLInputElement>(null);
  const advisoryFileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleCveFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCveFileName(file ? file.name : null);
  };

  const handleAdvisoryFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setAdvisoryFileName(file ? file.name : null);
  };

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
              {/* Input Method - Always CVE Information with file upload */}
              <div className="space-y-2">
                <Label>Input Method</Label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-md bg-muted border border-border flex-1">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      CVE Information (Text/File)
                    </span>
                    {cveFileName && (
                      <span className="ml-auto text-xs text-muted-foreground truncate max-w-[200px]">
                        {cveFileName}
                      </span>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="flex-shrink-0 gap-2 border-primary bg-primary/10 text-primary hover:bg-primary/20"
                    onClick={() => cveFileRef.current?.click()}
                  >
                    <Upload className="h-4 w-4" />
                    Upload File
                  </Button>
                  <input
                    ref={cveFileRef}
                    type="file"
                    className="hidden"
                    onChange={handleCveFileChange}
                  />
                </div>
              </div>

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

                {/* Upload Advisory File with dropdown and file upload */}
                <div className="space-y-2">
                  <Label>Upload Advisory File</Label>
                  <div className="flex items-center gap-4">
                    <Select
                      value={advisoryFileType}
                      onValueChange={setAdvisoryFileType}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select file type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="source">Source File</SelectItem>
                        <SelectItem value="binary">Binary File</SelectItem>
                        <SelectItem value="any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      className="flex-shrink-0 gap-2 border-primary bg-primary/10 text-primary hover:bg-primary/20"
                      onClick={() => advisoryFileRef.current?.click()}
                    >
                      <Upload className="h-4 w-4" />
                      Upload File
                    </Button>
                    <input
                      ref={advisoryFileRef}
                      type="file"
                      className="hidden"
                      onChange={handleAdvisoryFileChange}
                    />
                    {advisoryFileName && (
                      <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {advisoryFileName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
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
