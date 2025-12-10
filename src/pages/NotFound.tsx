import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShieldAlert, Terminal, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const [terminalText, setTerminalText] = useState<string[]>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Simulate terminal boot sequence
    const lines = [
      "> INITIATING TRACE PROTOCOL...",
      "> TARGET SECTOR: " + location.pathname,
      "> ERROR: SECTOR NOT FOUND",
      "> SCANNING NEIGHBORING NODES...",
      "> 0 NODES RESPONDING.",
      "> SYSTEM COMPROMISE DETECTED?",
      "> SUGGESTION: RETURN TO BASE.",
    ];

    let delay = 0;
    lines.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setTerminalText((prev) => [...prev, line]);
      }, delay);
    });
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 font-mono text-green-500 selection:bg-green-500/30 selection:text-green-200">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0_1px,transparent_1px),linear-gradient(to_bottom,#0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Scanline Effect */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] opacity-20" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-4">
        {/* Main Content Container */}
        <div className="w-full max-w-2xl animate-in fade-in zoom-in duration-500">
          {/* Glitch Header */}
          <div className="mb-8 text-center relative group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full flex items-center justify-center -z-10 opacity-50 blur-xl">
              <ShieldAlert className="w-64 h-64 text-red-500/20 animate-pulse" />
            </div>

            <h1 className="relative inline-block text-9xl font-black text-white mix-blend-difference">
              <span className="absolute -left-1 top-0 translate-x-[2px] text-red-500 opacity-70 animate-pulse">
                404
              </span>
              <span className="relative">404</span>
              <span className="absolute -left-1 top-0 -translate-x-[2px] text-blue-500 opacity-70 animate-pulse delay-75">
                404
              </span>
            </h1>

            <div className="mt-4 flex items-center justify-center gap-2 text-xl text-red-500 font-bold uppercase tracking-[0.2em] animate-pulse">
              <ShieldAlert className="h-6 w-6" />
              <span>Access Denied</span>
              <ShieldAlert className="h-6 w-6" />
            </div>
          </div>

          {/* Terminal Window */}
          <div className="mb-8 overflow-hidden rounded-lg border border-green-500/30 bg-black/80 backdrop-blur shadow-[0_0_20px_rgba(34,197,94,0.1)]">
            <div className="flex items-center gap-2 border-b border-green-500/30 bg-green-950/20 px-4 py-2">
              <Terminal className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500/70">
                SECURE_SHELL_V.9.0.1
              </span>
              <div className="ml-auto flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/50" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500/50" />
              </div>
            </div>

            <div className="min-h-[200px] p-4 font-mono text-sm leading-relaxed text-green-400">
              {terminalText.map((line, i) => (
                <div
                  key={i}
                  className="mb-1 animate-in slide-in-from-left-2 fade-in duration-300"
                >
                  {line}
                </div>
              ))}
              <div className="h-5 w-3 animate-pulse bg-green-500 mt-2" />
            </div>
          </div>

          {/* Action Area */}
          <div className="flex flex-col items-center gap-6">
            <p className="max-w-md text-center text-slate-400">
              The neural pathway you are trying to access has been severed or
              never existed. Immediate extraction is recommended.
            </p>

            <div className="flex gap-4">
              <Link to="/">
                <Button
                  size="lg"
                  className="group relative overflow-hidden border-green-500/50 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-black hover:border-green-500 transition-all duration-300"
                >
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  RETURN TO BASE
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                onClick={() => window.location.reload()}
                className="border-slate-700 bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                RETRY HANDSHAKE
              </Button>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="absolute bottom-4 text-xs text-slate-600">
          SECURE CONNECTION ID:{" "}
          {Math.random().toString(36).substr(2, 9).toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
