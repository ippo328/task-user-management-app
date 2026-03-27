type Option = {
  label: string;
  value: string;
};

type Props = {
  value: string;
  options: Option[];
  onChange: (value: string) => void;
};

export function SelectFilterComponent({
  value,
  options,
  onChange,
}: Props) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      style={styles.select}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

const styles: Record<string, React.CSSProperties> = {
  select: {
    height: '40px',
    minWidth: '140px',
    padding: '0 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#ffffff',
  },
};