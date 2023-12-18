export const ButtonClose = ({ onClick = () => {} }) => {
  return (
    <button
      type="button"
      className="w-5 h-5 ml-auto flex aspect-square items-center justify-center rounded-full bg-[#BC3908] shadow-sm shadow-[#BC3908] active:scale-90 [&>*]:pointer-events-none [&>span]:text-sm"
      onClick={onClick}
    >
      <span className="material-symbols-outlined">close</span>
    </button>
  )
}
