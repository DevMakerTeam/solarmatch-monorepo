interface SectionHeaderProps {
  title: string;
}

const SectionHeader = ({ title }: SectionHeaderProps) => {
  return (
    <div className="flex items-center gap-[15px]">
      <div className="w-[px] border-[2px] border-primary h-[24px] lg:h-[32px]" />
      <h2 className="bold-body lg:bold-heading6 text-primary">{title}</h2>
    </div>
  );
};

export default SectionHeader;
