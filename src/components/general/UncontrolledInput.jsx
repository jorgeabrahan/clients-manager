export const UncontrolledInput = ({
  type = 'text',
  placeholder = '',
  id = '',
  defaultValue = '',
  isRequired = true,
  label = '',
}) => {
  return (
    <div>
      <label className="mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="p-2 rounded-lg"
        type={type}
        name={id}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={isRequired}
        autoComplete="off"
        spellCheck="false"
      />
    </div>
  )
}
