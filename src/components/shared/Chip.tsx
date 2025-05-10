interface ChipProps {
  text: string;
}

export const Chip = ({ text }: ChipProps) => {
  return (
    <div className="text-text-muted bg-surface-light flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold">
      {text}
    </div>
  );
};
