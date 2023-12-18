import { confirmationDialogStore } from "../../stores"
import { Button } from "./Button"
import { ButtonCancel } from "./ButtonCancel"
import { ButtonClose } from "./ButtonClose"
import { DialogLayout } from "./DialogLayout"

export const ConfirmationDialog = () => {
  const { dialogData, setDialogData } = confirmationDialogStore(store => store)
  const handleDialogClose = () => {
    setDialogData({
      title: '',
      message: '',
      onCancel: () => {},
      onConfirm: () => {}
    })
  }
  const handleDialogCancel = () => {
    handleDialogClose()
    if (dialogData?.onCancel === undefined) return
    dialogData?.onCancel()
  }
  if (dialogData?.title?.trim()?.length === 0 || dialogData?.message?.trim()?.length === 0) return <></>
  return (
    <DialogLayout className="bg-raisin-black/40 backdrop-blur z-[100]" isOpen={true} onClose={() => handleDialogCancel()}>
      <section className="grid gap-4">
        <div className="flex items-center">
          <h3 className="font-bold">{dialogData?.title}</h3>
          <ButtonClose onClick={() => handleDialogCancel()} />
        </div>
        <hr />
        <p className="text-sm text-white/90 my-2">{dialogData?.message}</p>
        <hr />
        <div className="flex justify-end gap-4">
          <ButtonCancel text="Cancelar" onClick={() => handleDialogCancel()} />
          <Button text="Aceptar" onClick={() => {
            handleDialogClose()
            if (dialogData?.onConfirm === undefined) return
            dialogData?.onConfirm()
          }} />
        </div>
      </section>
    </DialogLayout>
  )
}
