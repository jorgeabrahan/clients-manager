import { showErrorMessage, showSuccessMessage, toLocalCurrency } from '../../../helpers/global'
import { useOverwriteHistory } from '../../../hooks'
import { clientStore, confirmationDialogStore, registryStore } from '../../../stores'
import PropTypes from 'prop-types'

export const Group = ({ group, groupsAmount }) => {
  const { registryClient, setRegistryClient } = clientStore((store) => store)
  const { setDialogData } = confirmationDialogStore((store) => store)
  const { removeClient, removeArticles } = registryStore((store) => store)
  const afterValidation = (amount) => {
    // si se eliminan todos los articulos del cliente
    if (groupsAmount === 1 && amount === group?.amount) {
      setDialogData({
        title: 'Aviso de confirmación',
        message: 'Al eliminar todos los articulos, el cliente sera eliminado ¿Desea continuar?',
        onConfirm: () => {
          removeClient(registryClient?.id)
          showSuccessMessage(`${registryClient?.name} fue eliminado con exito`)
          setRegistryClient(null)
        }
      })
      return
    }
    // si solo se eliminan algunos articulos del cliente
    const s = amount > 1 ? 's' : ''
    setDialogData({
      title: 'Aviso de confirmación',
      message: `¿Seguro que desea eliminar ${amount} articulo${s}  con un precio de ${toLocalCurrency(
        group?.price
      )} del cliente ${registryClient?.name}?`,
      onConfirm: () => {
        // eliminar los articulos
        removeArticles(registryClient?.id, group?.price, amount)
        showSuccessMessage(`${amount} articulo${s} eliminado${s} de ${registryClient?.name}`)
        setRegistryClient(null)
      }
    })
  }
  const checkHistory = useOverwriteHistory()
  
  const handleFormSubmit = (e) => {
    e?.preventDefault()
    const form = e?.target
    if (form === null || form === undefined) return
    const amount = Number(form?.amountToDelete?.value)
    // validaciones necesarias
    if (amount === null || amount === undefined || isNaN(amount)) return
    if (amount === 0) {
      showErrorMessage('Seleccione la cantidad a eliminar')
      return
    }
    checkHistory(() => afterValidation(amount))
  }

  const handleSingleDelete = () => {
    // si se eliminan todos los articulos del cliente
    if (groupsAmount === 1) {
      setDialogData({
        title: 'Aviso de confirmación',
        message: `El cliente ${registryClient?.name} sera eliminado`,
        onConfirm: () => {
          removeClient(registryClient?.id)
          showSuccessMessage(`${registryClient?.name} fue eliminado con exito`)
          setRegistryClient(null)
        }
      })
      return
    }
    // si el articulo a eliminar no es el unico de los grupos
    setDialogData({
      title: 'Aviso de confirmación',
      message: `¿Seguro que desea eliminar el unico articulo de ${toLocalCurrency(
        group?.price
      )} del cliente ${registryClient?.name}?`,
      onConfirm: () => {
        // eliminar los articulos
        removeArticles(registryClient?.id, group?.price, 1)
        showSuccessMessage(
          `1 articulo de ${toLocalCurrency(group?.price)} eliminado de ${registryClient?.name}`
        )
        setRegistryClient(null)
      }
    })
  }
  return (
    <div className="flex justify-between items-center px-4 py-3 border border-white border-solid rounded-lg">
      <p>
        <span className="font-bold text-lg">{toLocalCurrency(group?.price)}</span>
        <span className="text-sm">&nbsp;x&nbsp;{group?.amount}</span>
      </p>
      {group?.articles?.length > 1 ? (
        <form
          className="flex items-center h-full"
          title="Ingresa la cantidad que deseas eliminar"
          onSubmit={handleFormSubmit}
        >
          <select
            name="amountToDelete"
            id="amountToDelete"
            className="h-full w-14 py-2 px-3 rounded-l-md text-sm focus:outline-none"
            defaultValue="0"
          >
            <option value="0">0</option>
            {group.articles.map((article, index) => (
              <option key={article?.id} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            className="h-full p-1 bg-rust hover:bg-rust-dark transition-colors rounded-r-md grid place-items-center [&>*]:pointer-events-none [&>*]:text-sm"
            type="submit"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </form>
      ) : (
        <button
          className="p-1 bg-rust hover:bg-rust-dark transition-colors rounded-md grid place-items-center [&>*]:pointer-events-none [&>*]:text-sm"
          onClick={() => checkHistory(handleSingleDelete)}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      )}
    </div>
  )
}

Group.propTypes = {
  group: PropTypes.shape({
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    articles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string
      })
    ).isRequired
  }).isRequired,
  groupsAmount: PropTypes.number.isRequired
}
