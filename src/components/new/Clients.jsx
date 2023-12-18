import { useEffect, useState } from 'react'
import { calcClientsTotal } from '../../helpers/clients'
import { confirmationDialogStore, registryStore } from '../../stores'
import { Client } from './clients-c/Client'
import { MoneyAmount, SideBar } from '../general'
import { toLocalCurrency } from '../../helpers/global'
import { useOverwriteHistory } from '../../hooks'
export function Clients() {
  const { clients, history, setShowHistory, clearClients } = registryStore((store) => store)
  const { setDialogData } = confirmationDialogStore((store) => store)
  const [clientsTotal, setClientsTotal] = useState(0)
  const [isHistoryNotEmpty, setIsHistoryNotEmpty] = useState(history.length !== 0)
  const [isClientsNotEmpty, setIsClientsNotEmpty] = useState(clients.length !== 0)
  useEffect(() => setIsHistoryNotEmpty(history.length !== 0), [history])
  useEffect(() => setIsClientsNotEmpty(clients.length !== 0), [clients])
  const checkHistory = useOverwriteHistory()
  useEffect(() => {
    setClientsTotal(calcClientsTotal(clients))
  }, [clients])
  return (
    <>
      <SideBar buttons={[
        {
          text: 'historial',
          icon: 'history',
          show: isHistoryNotEmpty,
          handleButtonClick: () => setShowHistory(true)
        },
        {
          text: 'guardar',
          icon: 'save',
          show: isClientsNotEmpty,
          handleButtonClick: () => {}
        },
        {
          text: 'limpiar',
          icon: 'delete',
          show: isClientsNotEmpty,
          handleButtonClick: () => {
            const confirmClientsClear = () => {
              setDialogData({
                title: 'Aviso de confirmación',
                message: `¿Seguro que desea eliminar todos los clientes?`,
                onConfirm: () => {
                  clearClients()
                }
              })
            }
            checkHistory(confirmClientsClear)
          }
        }
      ]} />
      <section>
        <div>
          {clients?.map(({ id, name, articles }) => (
            <Client key={id} id={id} name={name} articles={articles} />
          ))}
        </div>
        {clientsTotal !== 0 && <MoneyAmount amount={toLocalCurrency(clientsTotal)} />}
      </section>
    </>
  )
}
