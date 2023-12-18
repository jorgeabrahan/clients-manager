import PropTypes from 'prop-types'

export const Button = ({ icon, text, handleButtonClick = () => {}, show = false }) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 p-2 w-max aspect-square [&_.icon]:text-lg [&_.icon]:leading-[0] bg-[#121212] rounded-full border border-solid border-white/30 active:scale-95 group hover:aspect-auto ${!show && 'hidden'}`}
      title={text}
      onClick={handleButtonClick}
    >
      <span className="material-symbols-outlined icon">{icon}</span>
      <span className="hidden group-hover:block text-xs">{text}</span>
    </button>
  )
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func,
  show: PropTypes.bool
}
