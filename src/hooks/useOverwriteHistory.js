import { confirmationDialogStore, registryStore } from "../stores"

export const useOverwriteHistory = () => {
  const { history, activeRecordIndex, overwriteHistory } = registryStore((store) => store)
  const { setDialogData } = confirmationDialogStore((store) => store)
  function checkHistory(action = () => {}) {
    if (activeRecordIndex !== (history.length - 1)) {
      setDialogData({
        title: 'Aviso de confirmación',
        message: "No estás en la última entrada del historial, por lo tanto, la acción que estás a punto de realizar sobreescribirá el resto del historial ¿Deseas continuar?",
        onConfirm: () => {
          if (history[activeRecordIndex] === undefined) {
            showErrorMessage('No se pudo sobreescribir el historial')
            return
          }
          overwriteHistory()
          action()
        }
      })
      return
    }
    action()
  }
  return checkHistory
}
