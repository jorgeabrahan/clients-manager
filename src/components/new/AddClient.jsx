import { useRef } from 'react'
import { useForm } from '../../hooks'
import { registryStore } from '../../registryStore'
import { Button, Input, Select } from '../general'

const initialClient = {
  name: '',
  price: '',
  amount: '1'
}

export function AddClient() {
  const state = registryStore((state) => state)
  const formRef = useRef(null)
  const { name, price, amount, formState, onInputChange, onResetForm } = useForm(initialClient)

  const onSubmit = (e) => {
    e.preventDefault()
    if (name.length === '') return
    if (isNaN(Number(price)) || isNaN(Number(amount))) return
    state.addClient(formState)
    state.sortClients()
    onResetForm()
    formRef.current.name.focus() // focus name input after adding an element
  }

  return (
    <form className="py-4" onSubmit={onSubmit} ref={formRef}>
      <div className="grid md:grid-cols-3 gap-4 mb-4">
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
      <Button text="Agregar" icon="add" />
    </form>
  )
}
