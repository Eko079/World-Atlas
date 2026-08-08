interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AdminInput({ label, error, className = "", ...props }: InputProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className={`w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper placeholder-mist/40 focus:border-accent focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function AdminTextarea({ label, error, className = "", ...props }: TextareaProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
        {label}
      </label>
      <textarea
        {...props}
        className={`w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper placeholder-mist/40 focus:border-accent focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
}

export function AdminSelect({ label, error, className = "", children, ...props }: SelectProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
        {label}
      </label>
      <select
        {...props}
        className={`w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none ${className}`}
      >
        {children}
      </select>
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AdminNumberInput({ label, error, className = "", ...props }: NumberInputProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
        {label}
      </label>
      <input
        type="number"
        {...props}
        className={`w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper placeholder-mist/40 focus:border-accent focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function AdminDateInput({ label, error, className = "", ...props }: DateInputProps) {
  return (
    <div className="mb-4">
      <label className="block font-mono text-[10px] uppercase tracking-[0.15em] text-mist mb-1.5">
        {label}
      </label>
      <input
        type="date"
        {...props}
        className={`w-full rounded border border-white/15 bg-ink px-3 py-2 font-mono text-sm text-paper focus:border-accent focus:outline-none ${className}`}
      />
      {error && <p className="mt-1 font-mono text-xs text-red-400">{error}</p>}
    </div>
  );
}
