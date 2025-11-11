import { Button } from "@repo/ui/button";
import { Checkbox } from "@repo/ui/checkbox";

interface TermItemProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  onViewClick?: () => void;
}

const TermItem = ({
  id,
  name,
  label,
  checked = false,
  onChange,
  onViewClick,
}: TermItemProps) => {
  const handleBoxClick = () => {
    onChange?.(!checked);
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewClick?.();
  };

  return (
    <div
      onClick={handleBoxClick}
      className="group flex items-center justify-between gap-[12px] p-[13px_22px] border border-border-color rounded-[8px] cursor-pointer hover:border-primary transition-colors"
    >
      <label
        htmlFor={id}
        className="flex items-center gap-[12px] medium-body cursor-pointer flex-1"
        onClick={e => e.stopPropagation()}
      >
        <Checkbox
          id={id}
          name={name}
          checked={checked}
          onChange={e => onChange?.(e.target.checked)}
          className="peer-hover:border-primary group-hover:border-primary"
        />
        <span>
          <span>{label}</span>
          <span className="text-border-color">&nbsp;(필수)</span>
        </span>
      </label>

      {onViewClick && (
        <Button
          variant="ghost"
          onClick={handleViewClick}
          className="medium-body px-[8px] py-[4px]"
        >
          보기
        </Button>
      )}
    </div>
  );
};

export default TermItem;
