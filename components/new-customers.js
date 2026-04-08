import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from "next/link";
import CardAdmin from '@/components/cards/cardadmin';
import axios from "axios";
import toaster from '@/utils/toast_function';

export default function NewCustomersAndTopProducts() {
    const [metrics, setMetrics] = useState({
        loading: false,
        new_customers: [],
        top_products: []
    })

    const getMetrics = async () => {
        setMetrics(prev => ({ ...prev, loading: true }))
        try {
            const { data: { new_customers, top_products } } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/metrics/new-customers&top-products`, { withCredentials: true });
            setMetrics({ new_customers, top_products })
        } catch (e) { console.log(e); toaster("error", "Something went wrong fetching the New Customers and Top Products metrics.") }
        finally { setMetrics(prev => ({ ...prev, loading: false })) }
    }

    useEffect(() => {
        getMetrics()
    }, [])

    return <section className='w-full flex gap-7 mt-7'>
        <CardAdmin classes="w-2/5">
            <div className='px-[30px] py-[33.5px]'>
                <div className='flex items-center justify-between mb-2'>
                    <p className='text-[22px]'>New Customers</p>
                    <button onClick={getMetrics} disabled={metrics.loading} className={`${metrics.loading && "animate-spin"} fa-solid fa-rotate-right flex items-center gap-[24px]`}></button>
                </div>
                {!metrics.new_customers.length ? <div className="w-full h-32 flex justify-center items-center">No Customers to display</div> : metrics.new_customers.map((customer, i) => <div className={`flex items-center justify-between text-sm ${i == 0 && "mt-5"} my-[15px]`} >
                    <div className='flex gap-[15px] items-center'>
                        <div className="w-10 aspect-square rounded-[60px] overflow-hidden">
                            <Image className='w-full h-full object-cover' width={150} height={150} src={customer.image && customer.image.includes("google") ? customer.image : process.env.NEXT_PUBLIC_BASE_IMG_URL + customer.image || process.env.NEXT_PUBLIC_DEFAULT_PFP} alt='user avatar' />
                        </div>
                        <div className='flex flex-col gap-y-2 text-sm'>
                            {customer?.firstname ? (customer.firstname + " " + customer?.lastname) : customer.username}
                            <span className="text-[10px]">{customer.email}</span>
                        </div>
                    </div>
                    <span className='text-xs'>{customer.purchases} Purchases</span>
                    <Link href={"/user/" + customer._id} className='px-2 py-0.5 bg-gold-land text-white rounded-2xl text-[10px]'>View Profile</Link>
                </div>)}
            </div>
        </CardAdmin>
        <CardAdmin classes="flex-1">
            <div className='px-[30px] py-[33.5px]'>
                <div className='flex items-center justify-between mb-[10px]' >
                    <p className='text-[22px]'>Top Products</p>
                    <button onClick={getMetrics} disabled={metrics.loading} className={`${metrics.loading && "animate-spin"} fa-solid fa-rotate-right flex items-center gap-[24px]`}></button>
                </div>
                {!metrics.top_products.length ? <div className="w-full flex justify-center items-center">No Top Products yet</div> : metrics.top_products.map((product, i) => <div className={`flex items-center justify-between text-sm ${i == 0 && "mt-[20px]"} my-[15px]`} >
                    <div className='flex gap-[15px] items-center'>
                        <div className="w-12 rounded-md aspect-square overflow-hidden">
                            <Image className='w-full h-full object-cover' width={150} height={150} src={process.env.NEXT_PUBLIC_BASE_IMG_URL + product.cover_image} alt='Product image' />
                        </div>
                        <div className='flex flex-col text-sm'>
                            <p className='truncate'>{product.name.en}</p>
                            <span className='text-xs'>{product.price} AED</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-x-2">
                        <span className='text-sm'>{product.sales || 1} Sales</span>
                        <button onClick={() => navigator.clipboard.writeText(product._id)} className='px-2 py-0.5 bg-gold-land text-white rounded-2xl text-[10px]'>Copy ID</button>
                    </div>
                </div>)}
            </div>
        </CardAdmin>
    </section>
}
