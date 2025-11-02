interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({ title, subtitle, align = 'center' }: SectionTitleProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-100 mb-4">{title}</h2>
      {subtitle && <p className="text-lg text-gray-400 max-w-3xl mx-auto">{subtitle}</p>}
    </div>
  );
}
