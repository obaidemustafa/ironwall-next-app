import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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
import { FileCode, Loader2, Upload, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function NewCampaign() {
  const navigate = useNavigate();
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [cveId, setCveId] = useState("");
  const [description, setDescription] = useState("");
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

  const validateForm = (): boolean => {
    if (!cveId.trim()) {
      toast({
        title: "CVE ID Required",
        description: "Please enter a CVE ID to proceed.",
        variant: "destructive",
      });
      return false;
    }
    if (!description.trim()) {
      toast({
        title: "Description Required",
        description: "Please provide vulnerability details or description.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleStartPreprocessing = () => {
    if (!validateForm()) return;

    setIsPreprocessing(true);
    // Simulate backend delay
    setTimeout(() => {
      setIsPreprocessing(false);
      toast({
        title: "Preprocessing Complete",
        description: "Redirecting to Exploitation Engine...",
      });
      // Navigate to exploitation engine with advisory file state
      setTimeout(() => {
        navigate("/exploitation-engine", {
          state: { hasAdvisoryFile: !!advisoryFileName },
        });
      }, 500);
    }, 2000);
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
                  <Label>
                    CVE ID <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="e.g. CVE-2024-1234"
                    value={cveId}
                    onChange={(e) => setCveId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>
                    Description / Details{" "}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    placeholder="Paste vulnerability details, stack traces, or invalid inputs here..."
                    className="min-h-[150px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                {/* Upload Advisory File with dropdown and file upload */}
                <div className="space-y-2">
                  <Label>
                    Upload Advisory File{" "}
                    <span className="text-muted-foreground text-xs">
                      (Optional)
                    </span>
                  </Label>
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
        </div>
      </main>
    </div>
  );
}
