import { registryStore } from '../../stores/registryStore'
import { ButtonClose, DialogLayout } from '../general'
import { Record } from './history-c/Record'

export const History = () => {
  const { history, rollback, activeRecordIndex, showHistory, setShowHistory } = registryStore(
    (state) => state
  )
  return (
    <DialogLayout
      isOpen={showHistory}
      onClose={() => setShowHistory(false)}
      className="bg-raisin-black/40 backdrop-blur z-[100]"
    >
      <div className="flex items-center">
        <h3 className="font-bold">Historial</h3>
        <ButtonClose onClick={() => setShowHistory(false)} />
      </div>
      <div className='max-h-80 overflow-y-scroll hide-scrollbar pl-2'>
        <section className="relative pl-4 before:content-['_'] before:absolute before:left-0 before:top-0 before:h-full before:bg-neutral-500 before:w-[2px] before:rounded-sm [&_span]:text-sm [&_span]:text-neutral-400">
          {history?.map((record, index) => (
            <Record
              key={record.id}
              record={record}
              activeRecordIndex={activeRecordIndex}
              index={index}
              rollback={rollback}
            />
          ))}
        </section>
      </div>
    </DialogLayout>
  )
}
