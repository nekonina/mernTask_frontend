import React from 'react'
import useProyect from '../hook/useProyect'

const Colaborador = ({data}) => {
    const {loadContextColaborador} = useProyect()
    const {email, nombre} = data

    return (
        <div className="border-b p-5 flex justify-between items-center">
            <div>
                <p>{nombre}</p>
                <p className="text-gray-700 text-sm">
                    {email}
                </p>
            </div>
            <div>
                <button 
                    type='button'
                    className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
                    onClick={() => loadContextColaborador(data)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default Colaborador
