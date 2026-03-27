type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function SearchInputComponent({
  value,
  placeholder,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      style={styles.input}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  input: {
    width: '280px',
    height: '40px',
    padding: '0 12px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '14px',
    color: '#111827',
    backgroundColor: '#ffffff',
    boxSizing: 'border-box',
  },
};