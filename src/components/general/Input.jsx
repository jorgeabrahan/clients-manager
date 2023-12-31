export const Input = ({
  type = 'text',
  placeholder = '',
  id = '',
  value = '',
  onInputChange = () => {},
  isRequired = true,
  label = ''
}) => {
  return (
    <div>
      <label className="ml-3 text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-2 rounded-lg border border-solid border-slate-500"
        type={type}
        name={id}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onInputChange}
        required={isRequired}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  )
}
