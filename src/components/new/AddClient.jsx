import { useRef } from 'react'
import { useForm, useOverwriteHistory } from '../../hooks'
import { registryStore } from '../../stores'
import { Button, Input, Select } from '../general'
import { showErrorMessage, showSuccessMessage, toCapitalize } from '../../helpers/global'

const initialClient = {
  name: '',
  price: '',
  amount: '1'
}

export function AddClient() {
  const { addClient } = registryStore((store) => store)
  const formRef = useRef(null)
  const { name, price, amount, formState, onInputChange, onResetForm } = useForm(initialClient)
  // acciones a realizar una vez se valide el formulario
  const afterValidation = () => {
    addClient(formState)
    showSuccessMessage(`${toCapitalize(name)} agregado`)
    onResetForm()
    formRef.current.name.focus() // focus name input after adding an element
  }
  const checkHistory = useOverwriteHistory()

  const onSubmit = (e) => {
    e.preventDefault()
    if (name.trim().length === 0) {
      showErrorMessage('Porfavor escribe un nombre')
      return
    }
    if (isNaN(Number(price))) {
      showErrorMessage('El precio debe ser un numero')
      return
    }
    if (isNaN(Number(amount))) {
      showErrorMessage('La cantidad debe ser un numero')
      return
    }
    if (Number(price) < 1) {
      showErrorMessage('El precio debe ser mayor a 0')
      return
    }
    checkHistory(afterValidation)
  }

  return (
    <form className="py-4" onSubmit={onSubmit} ref={formRef}>
      <div className="grid md:grid-cols-3 gap-2 mb-2">
        <Input id="name" value={name} onInputChange={onInputChange} label="Nombre" />
        <Input id="price" value={price} onInputChange={onInputChange} label="Precio" />
        <Select id="amount" value={amount} onInputChange={onInputChange} label="Cantidad">
          {Array.from({ length: 10 }, (_, index) => index + 1).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </Select>
      </div>
      <Button text="Agregar" icon="add" className='ml-auto' />
    </form>
  )
}
