import { useEffect, useRef, useState } from 'react'
import { registryStore, clientStore, confirmationDialogStore } from '../../stores'
import { Button, ButtonClose, DialogLayout, UncontrolledInput } from '../general'
import { getClientById, isNewClient } from '../../helpers/clients'
import { showErrorMessage, showSuccessMessage, toCapitalize } from '../../helpers/global'
import { useOverwriteHistory } from '../../hooks'

export const EditClient = () => {
  const formRef = useRef(null)
  const { clients, updateClient, mergeClients } = registryStore((state) => state)
  // estado que almacena el id del cliente a editar
  // si este estado tiene un id entonces se muestra el modal
  const { editClientId, setEditClientId } = clientStore((store) => store)
  const { setDialogData } = confirmationDialogStore((store) => store)
  // estado para almacenar el cliente a editar
  const [client, setClient] = useState(null)
  // estado para determinar si el dialogo esta abierto
  const [isOpen, setIsOpen] = useState(false)
  // efecto para obtener el cliente por su id
  useEffect(() => setClient(getClientById(clients, editClientId)), [editClientId])
  useEffect(() => setIsOpen(client !== null && editClientId !== null), [client, editClientId])
  useEffect(() => {
    if (formRef.current === null) return
    if (isOpen) {
      formRef.current?.name?.focus()
      formRef.current.name.value = client?.name
      formRef.current?.name?.select()
      return
    }
    formRef.current?.name?.blur()
  }, [isOpen])
  const afterClientUpdate = (newName = '') => {
    // mostrar mensaje de exito al actualizar
    showSuccessMessage(`${toCapitalize(client?.name)} actualizado a ${toCapitalize(newName)}`)
    // cerrar el modal
    setEditClientId(null)
  }
  const afterValidation = (newName = '') => {
    // si es un nuevo cliente
    if (isNewClient(clients, toCapitalize(newName))) {
      setDialogData({
        title: 'Aviso de confirmación',
        message: `¿Seguro que desea cambiar el nombre del cliente ${client?.name} a ${newName}?`,
        onConfirm: () => {
          updateClient(editClientId, { ...client, name: toCapitalize(newName) })
          afterClientUpdate(newName)
        }
      })
      return
    }
    // si el cliente ya existe
    setDialogData({
      title: 'Aviso de confirmación',
      message: `Ya existe el cliente ${newName} ¿Seguro que desea unir ambos clientes?`,
      onConfirm: () => {
        // unificar ambos clientes
        mergeClients(editClientId, toCapitalize(newName))
        afterClientUpdate(newName)
      }
    })
  }
  const checkHistory = useOverwriteHistory()
  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (formRef.current === null) return
    const newName = formRef.current?.name?.value
    // si no se escribio un nombre
    if (newName.trim().length === 0) {
      showErrorMessage('Porfavor escribe un nombre')
      return
    }
    checkHistory(() => afterValidation(newName))
  }
  return (
    <DialogLayout isOpen={isOpen} onClose={() => setEditClientId(null)}>
      <form className="grid gap-4" ref={formRef} onSubmit={handleFormSubmit}>
        <ButtonClose onClick={() => setEditClientId(null)} />
        <UncontrolledInput id="name" defaultValue={client?.name} label="Nombre" />
        <Button text="Actualizar" icon="add" className="ml-auto" />
      </form>
    </DialogLayout>
  )
}
