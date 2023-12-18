import PropTypes from 'prop-types';

export const ButtonDark = ({ text, icon, onClick, hideTextOnMobile }) => {
  return (
    <button
      className="bg-raisin-black shadow-sm shadow-raisin-black hover:bg-raisin-black-dark hover:shadow-raisin-black-dark transition-[background,_box-shadow,_scale] px-4 py-1 rounded-lg active:scale-90 flex items-center gap-2 [&>*]:pointer-events-none"
      onClick={onClick}
    >
      {icon.trim().length !== 0 && <span className="material-symbols-outlined">{icon}</span>}
      <span className={`${hideTextOnMobile ? 'hidden md:block' : ''} text-sm font-medium`}>
        {text}
      </span>
    </button>
  )
}

ButtonDark.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  hideTextOnMobile: PropTypes.bool,
  onClick: PropTypes.func.isRequired
};
