import Link from "next/link";
import Button from "@/components/ui/Button";
import MonoLabel from "@/components/ui/MonoLabel";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 text-center">
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 40%, rgba(230,57,70,0.12), transparent 60%)"
        }}
      />
      <p className="relative font-mono text-[11px] uppercase tracking-[0.4em] text-accent">
        404 — Error
      </p>
      <h1 className="relative mt-6 font-display text-[24vw] font-semibold uppercase leading-none tracking-tight text-paper sm:text-[16rem]">
        404
      </h1>
      <p className="relative mt-2 font-display text-3xl font-semibold uppercase tracking-tight text-paper sm:text-5xl">
        Nation Not Found
      </p>
      <p className="relative mt-4 max-w-md font-mono text-[11px] uppercase leading-relaxed tracking-[0.3em] text-mist">
        The coordinates you entered do not exist in the archive — yet.
      </p>
      <div className="relative mt-10">
        <Button href="/" variant="solid">
          Return to World Atlas
        </Button>
      </div>
      <MonoLabel className="relative mt-16 text-mist/40">
        001 / 195 — Indonesia archived
      </MonoLabel>
    </div>
  );
}
