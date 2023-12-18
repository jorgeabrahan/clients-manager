import { useEffect } from 'react'
import PropTypes from 'prop-types';

export const DialogLayout = ({ isOpen = false, className = '', onClose = () => {}, children }) => {
  useEffect(() => {
    // llamar metodo de cerrar cuando se presione escape
    const handleKeyDown = (e) => e?.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])
  return (
    <dialog
      className={`absolute inset-0 w-full h-full ${
        isOpen && 'grid'
      } place-items-center bg-transparent px-2 ${className}`}
      open={isOpen}
    >
      <section className="max-w-sm w-full bg-[#121212] p-4 border-2 border-solid border-white rounded-lg">
        {children}
      </section>
    </dialog>
  )
}

DialogLayout.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};
