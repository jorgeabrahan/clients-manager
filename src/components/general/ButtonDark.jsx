export const ButtonDark = ({ text = '', icon = '' }) => {
  return (
    <button className="bg-raisin-black shadow-sm shadow-raisin-black hover:bg-raisin-black-dark hover:shadow-raisin-black-dark transition-[background,_box-shadow,_scale] px-4 py-1 rounded-lg active:scale-90 flex items-center gap-2">
      <span className="material-symbols-outlined">{icon}</span>
      <span className="font-[600]">{text}</span>
    </button>
  )
}
