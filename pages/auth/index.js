import Head from 'next/head'
import Link from 'next/link';
import Loader from '@/components/loaders/loader';

export default function AuthPage(props) {
    return <>
        <Head><title>Urban Fits</title></Head>
        <main className={`bg-white w-full h-screen flex ${props.height || "lg_layout_height"} px-4 md:px-20 lg:overflow-x-hidden`}>
            <section className="hidden lg:flex w-1/4 flex-col justify-center items-center md:w-full ">
                <h2 className="mb-6 font_futura text-2xl text-center lg:text-[38px] lg:leading-[47px]">Join Our Urban Fits <br /> Program and get free <br /> Shipping and 200 <br /> Points Sign Up Bonus</h2>
                <p className="font_futura_light text-xl md:text-2xl text-center">Urban Members get Exclusive access to <br /> products, events, and offers. Just provide <br /> a few details. It’s free to join and <br /> open to all.</p>
            </section>
            {props.loading ? <Loader /> : null}
            <section className="w-full lg:w-3/4 xl:px-[5%] 2xl:px-[7%] flex flex-col lg:flex-row justify-center items-center h-full font_futura bg-white">
                <nav className="lg:hidden w-full py-4 md:py-8 mb-6 text-lg font_futura flex justify-between items-center">
                    <Link href="/"><i className='fa-solid fa-xmark text-2xl' /></Link>
                    <Link href={props.mblNav}>{props.mblNavName}</Link>
                </nav>
                {props.children}
            </section>
        </main>
    </>
}
