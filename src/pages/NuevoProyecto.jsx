import FormProyecto from "../components/FormProyecto"

const NuevoProyecto = () => {
  return (
    <>
        <h1 className="text-4xl font-black">
            Crear Nuevo Proyecto
        </h1>
        <div className="mt-10 flex justify-center">
          <FormProyecto />
        </div>
    </>
  )
}

export default NuevoProyecto
