export const ButtonCancel = ({ text = '', icon = '', onClick = () => {} }) => {
  return (
    <button className="bg-rust shadow-sm shadow-rust hover:bg-rust-dark hover:shadow-rust-dark transition-[background,_box-shadow,_scale] px-4 py-1 rounded-lg active:scale-90 flex items-center gap-2 [&>*]:pointer-events-none" onClick={onClick}>
      {icon.trim().length !== 0 && <span className="material-symbols-outlined">{icon}</span>}
      {text.trim().length !== 0 && <span className="font-[600]">{text}</span>}
    </button>
  )
}
