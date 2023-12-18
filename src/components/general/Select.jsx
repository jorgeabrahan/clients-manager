export const Select = ({ id, value, onInputChange, isRequired = true, label = '', children }) => {
  return (
    <div>
      <label className="ml-3 text-sm" htmlFor={id}>
        {label}
      </label>
      <select
        className="p-2 rounded-lg border border-solid border-slate-500"
        name={id}
        id={id}
        value={value}
        onChange={onInputChange}
        required={isRequired}
      >
        {children}
      </select>
    </div>
  )
}
