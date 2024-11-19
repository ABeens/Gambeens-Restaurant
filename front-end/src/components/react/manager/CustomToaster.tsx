import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
export function CustomToaster() {
    const { toasts } = useToast()

    return (
        <ToastProvider>
            {toasts.map(function ({ id, title, description, action, ...props }) {
                return (
                    <Toast key={id} {...props} className="">
                        <div className="grid gap-1">
                            {title && <ToastTitle className="text-lg font-semibold">{title}</ToastTitle>}
                            {description && (
                                <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>
                            )}
                        </div>
                        <ToastAction altText="Cerrar" onClick={() => console.log("Cerrado")}>
                            Cerrar
                        </ToastAction>
                    </Toast>
                )
            })}
            <ToastViewport
                className="fixed flex flex-col p-6 gap-2 md:gap-4 w-full md:max-w-[420px] bottom-0 right-0 items-center"
            />
        </ToastProvider>
    )
}