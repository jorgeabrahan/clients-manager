export const Input = ({ type = 'text', id, value, onInputChange, isRequired = true, label }) => {
  return (
    <div>
      <label className="mb-1" htmlFor={id}>{label}</label>
      <input
        className="p-2 rounded-lg"
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onInputChange}
        required={isRequired}
        autoComplete="off"
      />
    </div>
  )
}
