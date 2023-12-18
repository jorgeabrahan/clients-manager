import { showSuccessMessage, toLocalCurrency } from '../../../helpers/global'
import { calcArticlesTotal } from '../../../helpers/articles'
import { ButtonDark, MoneyAmount } from '../../general'
import { registryStore, clientStore, confirmationDialogStore } from '../../../stores'
import { useMemo } from 'react'
import { useOverwriteHistory } from '../../../hooks'
import PropTypes from 'prop-types';

export const Client = ({ id = '', name = '', articles = [] }) => {
  const { removeClient } = registryStore((state) => state)
  const { setEditClientId, setRegistryClient } = clientStore((store) => store)
  const { setDialogData } = confirmationDialogStore((store) => store)
  const articlesTotal = useMemo(() => toLocalCurrency(calcArticlesTotal(articles)), [articles])
  const handleRemoveClient = () => {
    setDialogData({
      title: 'Aviso de confirmación',
      message: `¿Seguro que desea eliminar al cliente ${name}?`,
      onConfirm: () => {
        removeClient(id)
        showSuccessMessage(`${name} fue eliminado`)
      }
    })
  }
  const checkHistory = useOverwriteHistory()
  return (
    <article id={id} className="flex justify-between items-center">
      <div>
        <h3 className='text-2xl font-semibold'>
          {name}
        </h3>
        <MoneyAmount amount={articlesTotal} />
        <p className='text-sm font-medium text-neutral-400'>
          {articles.length} articulo{articles.length > 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 h-max">
        <ButtonDark text="Editar" icon="edit" onClick={() => setEditClientId(id)} />
        <ButtonDark
          text="Registro"
          icon="reorder"
          onClick={() => setRegistryClient({ id, name, articles })}
        />
        <ButtonDark text="Eliminar" icon="delete" onClick={() => checkHistory(handleRemoveClient)} />
      </div>
    </article>
  )
}

Client.propTypes = {
  articles: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
