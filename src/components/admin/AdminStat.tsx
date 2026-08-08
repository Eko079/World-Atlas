import AdminCard from "./AdminCard";

interface AdminStatProps {
  label: string;
  value: number;
}

export default function AdminStat({ label, value }: AdminStatProps) {
  return (
    <AdminCard
      title={label}
      body={
        <p className="font-display text-4xl font-semibold text-paper">{value}</p>
      }
    />
  );
}
