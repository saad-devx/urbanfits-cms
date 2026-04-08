import ProductInfoPage from '@/components/productinfopage'
import useProduct from '@/hooks/useProduct'

export default function AddProduct() {
    const { productInfo } = useProduct()
    if (!productInfo) return <main className="w-full h-[80vh] flex justify-center items-center">
        <h1 className="text-2xl text-center font_futura">No Product to Show here</h1>
    </main>
    return <ProductInfoPage
        product={productInfo}
    />
}