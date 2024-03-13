import React, { useState } from 'react'
import useProyect from '../hook/useProyect'
import Alerta from './Alerta'

const FormularioColaborador = () => {
    const [email, setEmail] = useState('')

    const {mostrarAlerta, alerta, submitColaborador} = useProyect()

    const handleSubmit = async e => {
        e.preventDefault()
        if(email === ''){
            mostrarAlerta({
                msg:"Debe introducir un correo electrónico válido",
                error: true
            })
            return
        }
        await submitColaborador(email)
    }
  return (
    <form
        className='bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow'
        onSubmit={handleSubmit}
    >
        {
            alerta.msg != ''
            ? <Alerta alerta={alerta} />
            : null
        }
        <div className="mb-5">
            <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">
                Email colaborador
            </label>
            <input 
                type="email" 
                id='email'
                placeholder='Email del usuario a agregar'
                className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
        </div>
        <input 
            type="submit"
            className='bg-pink-600 hover:bg-pink-800 w-full text-white p-3 text-sm uppercase font-bold cursor-pointer transition-colors rounded-md'
            value={'Buscar Colaborador'}
        />
    </form>
  )
}

export default FormularioColaborador
