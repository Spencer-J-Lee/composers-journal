export const PulsingEllipsis = () => {
  return (
    <span className="flex items-center gap-x-0.5">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <span
            className="animate-pulsing-ellipsis bg-text inline-block h-1.5 w-1.5 rounded-full"
            style={{ animationDelay: `${i * 0.2}s` }}
            key={i}
          />
        ))}
    </span>
  );
};
