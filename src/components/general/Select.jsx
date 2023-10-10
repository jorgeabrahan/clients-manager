
export const Select = ({ id, value, onInputChange, isRequired = true, label = '', children }) => {
  return (
    <div>
      <label className="mb-1" htmlFor={id}>{label}</label>
      <select className="p-2 h-[40px] rounded-lg" name={id} id={id} value={value} onChange={onInputChange} required={isRequired}>
        {children}
      </select>
    </div>
  )
}
