"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import BrandMark from "@/components/BrandMark";
import { profile } from "@/data/profile";

type Line = {
  id: string;
  text: string;
  tone?: "muted" | "ok" | "warn" | "accent" | "input";
};

type DevModeProps = {
  open: boolean;
  onClose: () => void;
};

const agentCount = profile.workforce.agents;
const humanCount = profile.workforce.humans;

const BOOT_LINES: Omit<Line, "id">[] = [
  { text: "$ ./dev-mode --boot", tone: "accent" },
  { text: "initializing agent runtime…", tone: "muted" },
  { text: "[ok] syra.ai core          online", tone: "ok" },
  { text: "[ok] solana rpc            linked", tone: "ok" },
  { text: "[ok] x402 payment rails    ready", tone: "ok" },
  {
    text: `[ok] workforce             ${agentCount} agents · ${humanCount} human`,
    tone: "ok",
  },
  { text: "", tone: "muted" },
  { text: "scale with agents, not headcount.", tone: "accent" },
  { text: 'type "help" for commands · esc to exit', tone: "muted" },
];

const HELP = [
  "whoami     identity dump",
  "status     live systems",
  "agents     workforce snapshot",
  "syra       company brief",
  "matrix     visual noise",
  "clear      wipe the buffer",
  "exit       leave dev mode",
];

const whoami = [
  "name:     Ikhwanul Husna",
  "roles:    Founder @ Syra AI · Agentrail · CTO @ S3Labs",
  "mode:     one human, agent-native ops",
  "stack:    solana · agents · x402 · web3",
];

const agentLines = [
  `fleet size ...... ${agentCount}`,
  `active .......... ${Math.max(agentCount - 6, 1)}`,
  `idle ............ ${Math.min(6, agentCount - 1)}`,
  `humans .......... ${humanCount} (you found him)`,
  "throughput ...... absurd (on purpose)",
];

const syra = [
  "Syra AI: agent-native company OS.",
  "Agentrail: build studio for MCP / x402 / Solana.",
  "S3Labs: builder ecosystem + infra.",
  "Thesis: scale with agents, not headcount.",
];

let lineSeq = 0;
const makeLine = (text: string, tone?: Line["tone"]): Line => ({
  id: `l-${++lineSeq}`,
  text,
  tone,
});

const toneClass = (tone?: Line["tone"]) => {
  switch (tone) {
    case "ok":
      return "text-highlight";
    case "warn":
      return "text-amber-400";
    case "accent":
      return "text-text";
    case "input":
      return "text-text";
    case "muted":
    default:
      return "text-greyText";
  }
};

const DevMode = ({ open, onClose }: DevModeProps) => {
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [booting, setBooting] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const reduceMotion = useRef(false);

  useEffect(() => {
    reduceMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
  }, []);

  useEffect(() => {
    if (!open) return;

    setLines([]);
    setInput("");
    setBooting(true);
    setMatrix(false);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let cancelled = false;
    const timers: number[] = [];

    const finishBoot = () => {
      if (cancelled) return;
      setBooting(false);
      requestAnimationFrame(() => inputRef.current?.focus());
    };

    if (reduceMotion.current) {
      setLines(BOOT_LINES.map((l) => makeLine(l.text, l.tone)));
      finishBoot();
    } else {
      BOOT_LINES.forEach((line, index) => {
        const timer = window.setTimeout(() => {
          if (cancelled) return;
          setLines((prev) => [...prev, makeLine(line.text, line.tone)]);
          if (index === BOOT_LINES.length - 1) finishBoot();
        }, 90 + index * 140);
        timers.push(timer);
      });
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const scroller = scrollerRef.current;
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }, [lines, open, matrix]);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const push = useCallback((entries: Omit<Line, "id">[]) => {
    setLines((prev) => [
      ...prev,
      ...entries.map((entry) => makeLine(entry.text, entry.tone)),
    ]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const command = raw.trim().toLowerCase();
      if (!command) return;

      push([{ text: `$ ${raw}`, tone: "input" }]);

      if (command === "help" || command === "?") {
        push([
          { text: "available commands:", tone: "muted" },
          ...HELP.map((text) => ({ text, tone: "muted" as const })),
        ]);
        return;
      }

      if (command === "whoami") {
        push(whoami.map((text) => ({ text, tone: "muted" as const })));
        return;
      }

      if (command === "status") {
        const stamp = new Date().toLocaleTimeString("en-US", {
          hour12: false,
          timeZone: "Asia/Jakarta",
        });
        push([
          { text: `uptime ...... forever-ish`, tone: "ok" },
          { text: `clock ....... ${stamp} WIB`, tone: "muted" },
          { text: `latency ..... vibes`, tone: "muted" },
          { text: `deploy ...... continuous`, tone: "ok" },
        ]);
        return;
      }

      if (command === "agents") {
        push(agentLines.map((text) => ({ text, tone: "muted" as const })));
        return;
      }

      if (command === "syra" || command === "s3labs") {
        push(syra.map((text) => ({ text, tone: "muted" as const })));
        return;
      }

      if (command === "matrix") {
        push([
          { text: "injecting visual noise…", tone: "warn" },
          { text: "(click anywhere or wait to stop)", tone: "muted" },
        ]);
        setMatrix(true);
        window.setTimeout(() => setMatrix(false), 2800);
        return;
      }

      if (command === "clear" || command === "cls") {
        setLines([]);
        return;
      }

      if (command === "exit" || command === "quit" || command === "q") {
        onClose();
        return;
      }

      if (command.startsWith("sudo")) {
        push([
          {
            text: "nice try. agents already have the keys.",
            tone: "warn",
          },
        ]);
        return;
      }

      push([
        {
          text: `command not found: ${raw}. try "help"`,
          tone: "warn",
        },
      ]);
    },
    [onClose, push],
  );

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (booting) return;
    const value = input;
    setInput("");
    runCommand(value);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close dev mode"
        className="absolute inset-0 bg-text/40 backdrop-blur-[2px] animate-dev-fade"
        onClick={onClose}
      />

      <div className="relative z-[81] w-full max-w-lg sm:rounded-xl overflow-hidden border border-outline bg-[rgb(12_12_14)] text-[#d7d7db] shadow-2xl animate-dev-rise max-h-[100dvh] sm:max-h-[min(72vh,640px)] flex flex-col">
        <header className="flex items-center gap-2 px-3 py-2.5 border-b border-white/10 bg-white/[0.03]">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
          <BrandMark className="ml-1 size-4" title="" variant="light" />
          <h2
            id={titleId}
            className="font-mono text-[11px] tracking-wide text-white/55"
          >
            ikhwanhsn · dev-mode
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="ml-auto font-mono text-[11px] text-white/45 hover:text-white/90 px-2 py-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
          >
            esc
          </button>
        </header>

        <div className="relative flex-1 min-h-0">
          <div
            ref={scrollerRef}
            className="h-[min(58vh,480px)] sm:h-[min(56vh,520px)] overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed selection:bg-highlight selection:text-text"
          >
            {lines.map((line) => (
              <p
                key={line.id}
                className={`${toneClass(line.tone)} whitespace-pre-wrap break-words`}
              >
                {line.text || "\u00a0"}
              </p>
            ))}

            {!booting && (
              <form
                onSubmit={onSubmit}
                className="mt-1 flex items-center gap-2 text-text"
              >
                <span className="text-highlight shrink-0" aria-hidden>
                  $
                </span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  spellCheck={false}
                  autoComplete="off"
                  autoCapitalize="off"
                  aria-label="Dev mode command"
                  className="flex-1 bg-transparent outline-none text-[#d7d7db] caret-highlight placeholder:text-white/25"
                  placeholder="type a command…"
                />
              </form>
            )}
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.08)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[length:100%_3px,3px_100%] opacity-40"
            aria-hidden
          />

          {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
        </div>
      </div>
    </div>
  );
};

const MatrixRain = ({ onDone }: { onDone: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let running = true;

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio;
      canvas.height = canvas.clientHeight * window.devicePixelRatio;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };
    resize();

    const cols = Math.max(12, Math.floor(canvas.clientWidth / 12));
    const drops = Array.from({ length: cols }, () =>
      Math.floor(Math.random() * -40),
    );
    const glyphs = "01アイウエオカキクケコ<>[]{};$#";

    const draw = () => {
      if (!running) return;
      ctx.fillStyle = "rgba(12,12,14,0.18)";
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.fillStyle = "rgb(192,242,127)";
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";

      for (let i = 0; i < drops.length; i += 1) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)];
        const x = i * 12;
        const y = drops[i] * 14;
        ctx.fillText(char, x, y);
        if (y > canvas.clientHeight && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }

      frame += 1;
      if (frame > 160) {
        running = false;
        onDone();
        return;
      }
      raf = window.requestAnimationFrame(draw);
    };

    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      running = false;
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [onDone]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-pointer"
      onClick={onDone}
      aria-hidden
    />
  );
};

export default DevMode;
