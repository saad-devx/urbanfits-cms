import { useState } from 'react'
import { InputText } from '@/components/InputText'
import useCategories from '@/hooks/useCategories'
import Spinner from '../loaders/spinner'

export default function DeleteAction(props) {
    const { categLoading } = useCategories()
    const [actionValue, setActionValue] = useState('')
    if (props.show) return (
        <>
            <div className="w-full h-full font_futura fixed inset-0 z-50 bg-gray-800/40 backdrop-blur flex justify-center items-center transition-all">
                <div className="relative w-3/5 min-h-[8rem] text-sm flex flex-col lg:flex-row bg-white rounded-2xl md:rounded-3xl overflow-hidden transition-all">
                    {categLoading ? <div className='w-full h-32 flex justify-center items-center' >
                        <Spinner forBtn={true} variant="border-black" />
                    </div> :
                        <><button onClick={() => { props.setDeleteModal(null); setActionValue('') }} name="deleteModal" className="material-symbols-rounded text-3xl absolute right-5 top-5 cursor-pointer hover:rotate-180 transition-all duration-1000">close</button>
                            <section className="w-full h-full p-6">
                                <div className="w-full space-y-3">
                                    <h2 className="text-black font_futura_medium text-base md:text-lg lg:text-xl">{props.heading}</h2>
                                    <p className='text-sm text-red-500'>{props.msg}</p>
                                    <p className='text-sm '>Please type <span className='text-red-600' >&quot;delete&quot;</span> here to proceed.</p>
                                </div>
                                <InputText
                                    autoComplete="off"
                                    placeholder="delete"
                                    name="delete"
                                    value={actionValue}
                                    onChange={(e) => setActionValue(e.target.value)}
                                />
                                <div className="w-full mt-7 flex flex-col gap-y-2">
                                    <button onClick={() => { props.setDeleteModal(null); setActionValue('') }} className="w-full flex justify-center items-center bg-gray-100 border border-gray-200 rounded-xl hover:shadow-md py-3">Cancel</button>
                                    <button disabled={actionValue !== "delete"} onClick={async () => {
                                        props.setDeleteModal(null)
                                        setActionValue('');
                                        await props.onTakeAction();
                                    }} className={`${actionValue !== "delete" ? "opacity-70 pointer-events-none" : null} w-full flex justify-center items-center bg-gold-land text-white border rounded-xl hover:shadow-md py-3`}>Delete</button>
                                </div>
                            </section></>
                    }
                </div>
            </div>
        </>
    )
}