import PropTypes from 'prop-types';

export const Record = ({ record, activeRecordIndex, index, rollback }) => {
  return (
    <button
      className="relative my-4 block group"
      key={record.id}
      onClick={() => rollback(record.id)}
    >
      <span
        className="material-symbols-outlined absolute -left-[1.38rem] top-2 group-hover:text-white transiton-colors"
      >
        {activeRecordIndex === index ? 'radio_button_checked' : 'radio_button_unchecked'}
      </span>
      <div>
        <p className="text-left text-sm text-neutral-300 group-hover:text-white transition-colors">
          {record.details.message}
        </p>
        <p className="text-left text-neutral-400 flex items-center [&>span]:group-hover:text-white [&>span]:transition-colors [&>span]:text-sm">
          <span className="material-symbols-outlined">bolt</span>
          <span>acción {record.action}</span>
        </p>
      </div>
    </button>
  )
}

Record.propTypes = {
  record: PropTypes.shape({
    id: PropTypes.string.isRequired,
    details: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }).isRequired,
    action: PropTypes.string.isRequired
  }).isRequired,
  activeRecordIndex: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  rollback: PropTypes.func.isRequired
};
