import { registryStore } from '../../registryStore'
import { Client } from './Client'

export function Clients() {
  const { clients } = registryStore((state) => state)
  return (
    <section>
      {clients?.length !== 0 &&
        clients?.map(({ id, name, articles }) => (
          <Client key={id} id={id} name={name} articles={articles} />
        ))}
    </section>
  )
}
