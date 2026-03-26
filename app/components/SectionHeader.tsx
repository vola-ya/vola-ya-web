interface SectionHeaderProps {
  label: string;
  title?: string;
  subtitle?: string;
  labelNode?: React.ReactNode;
}

export default function SectionHeader({ label, title, subtitle, labelNode }: SectionHeaderProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-extrabold tracking-[0.15em] uppercase text-[#b09080] mb-3">
        {labelNode ?? label}
      </p>
      {title && (
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3d2b1f] mb-3">{title}</h2>
      )}
      {subtitle && (
        <p className="text-[#8c6a58] text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
