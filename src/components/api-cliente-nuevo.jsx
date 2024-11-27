import { revalidatePath } from "next/cache";


async function nuevoCliente(formData) {
    'use server'
    const [nombre,domicilio ,fecha_nacimiento] = formData.values()

    const response = await fetch('http://localhost:4000/clientes', {
        method: 'POST',
        body: JSON.stringify({ nombre, fecha_nacimiento, domicilio })
    })
    const data = await response.json()

    revalidatePath('/clients')
}



function ClientNew() {
    return (
        <form className='my-10 grid grid-cols-[150px_auto] gap-4'>

            <label htmlFor='nombre'>Name</label>
            <input required id='nombre' name='nombre' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='domicilio'>Domicilio:</label>
            <input required id='domicilio' name='domicilio' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />

            <label htmlFor='fecha_nacimiento'>Fecha Nacimiento:</label>
            <input required id='fecha_nacimiento' name='fecha_nacimiento' className='p-1 border border-slate-200 focus:outline-blue-300 text-lg' />


            <div className='col-span-2 grid gap-2'>
                <button formAction={nuevoCliente} className='bg-green-600 text-white px-4 py-2 rounded-xl'>
                    Guardar cliente
                </button>
                <button type='reset' className='bg-slate-600 text-white px-4 py-2 rounded-xl'>
                    Limpiar campos
                </button>
            </div>
        </form>
    );
}

export default ClientNew;