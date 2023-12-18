import { useEffect, useState } from 'react'
import { groupArticles } from '../../helpers/articles'
import { clientStore } from '../../stores'
import { ButtonClose, DialogLayout } from '../general'
import { Group } from './registry-client-c/Group'

export const RegistryClient = () => {
  const { registryClient, setRegistryClient } = clientStore((store) => store)
  const [groupedArticles, setGroupedArticles] = useState()
  useEffect(() => {
    if (
      registryClient === null ||
      registryClient?.articles === undefined ||
      registryClient?.articles === null
    )
      return
    // se agrupan los articulos del cliente segun su precio
    // y se establecen como el estado de articulos agrupados
    setGroupedArticles(groupArticles(registryClient?.articles))
  }, [registryClient])
  return (
    <DialogLayout
      className="bg-raisin-black/40 backdrop-blur z-[100]"
      isOpen={!(registryClient === null || registryClient?.id?.trim()?.length === 0)}
      onClose={() => setRegistryClient(null)}
    >
      <section className="grid gap-4">
        <div className="flex items-center">
          <h3 className="font-bold">Registro de {registryClient?.name}</h3>
          <ButtonClose onClick={() => setRegistryClient(null)} />
        </div>
        <hr />
        <div className="max-h-80 overflow-y-scroll hide-scrollbar grid gap-4">
          {groupedArticles?.map((group) => (
            <Group key={`${group?.price}-${group?.amount}`} group={group} groupsAmount={groupedArticles?.length} />
          ))}
        </div>
      </section>
    </DialogLayout>
  )
}
