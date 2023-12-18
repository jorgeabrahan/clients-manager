import { Button } from './sidebar-c/Button'

export const SideBar = ({ buttons = [] }) => {
  return (
    <aside className={`fixed left-0 bottom-0 h-max px-4 py-3 z-10 ${ buttons.length === 0 && 'hidden'}`}>
      <section className="grid gap-2">
        {buttons.map((button) => (
          <Button
            key={`${button?.text}-${button?.icon}`}
            text={button?.text}
            icon={button?.icon}
            show={button?.show}
            handleButtonClick={button?.handleButtonClick}
          />
        ))}
      </section>
    </aside>
  )
}
