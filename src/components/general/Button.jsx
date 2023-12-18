export const Button = ({ text = '', icon = '', className = '', onClick = () => {} }) => {
  return (
    <button className={`bg-yale-blue shadow-sm shadow-yale-blue hover:bg-yale-blue-dark hover:shadow-yale-blue-dark transition-[background,_box-shadow,_scale] px-4 py-1 rounded-lg w-max active:scale-90 flex items-center gap-2 [&>*]:pointer-events-none ${className}`} onClick={onClick}>
      {icon.trim().length !== 0 && <span className="material-symbols-outlined">{icon}</span>}
      <span className="font-[600]">{text}</span>
    </button>
  )
}
