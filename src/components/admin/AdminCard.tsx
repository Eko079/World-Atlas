interface AdminCardProps {
  title: string;
  body: React.ReactNode;
  className?: string;
}

export default function AdminCard({ title, body, className = "" }: AdminCardProps) {
  return (
    <div className={`rounded border border-white/10 bg-panel ${className}`}>
      <div className="border-b border-white/10 px-5 py-3">
        <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist">{title}</h2>
      </div>
      <div className="px-5 py-4">{body}</div>
    </div>
  );
}
