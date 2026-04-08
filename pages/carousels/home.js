import { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import useCarousel from '@/hooks/useCarousel';
import { InputText } from '@/components/InputText';
import Button from '@/components/buttons/simple_btn';
import uploadImage from '@/utils/uploadImage';
import Loader from '@/components/loaders/loader';
// imports for Schema and validation
import { useFormik } from 'formik';
import { homeCarouselSchema } from '@/mock/yupSchemas';

const DefaultOrPic = ({ src, index, setFieldValue }) => {
    const imgSrc = (() => {
        if (typeof src === "string" && src.includes("/carousel-images")) return `${process.env.NEXT_PUBLIC_BASE_IMG_URL}${src}`;
        else if (typeof src === "object") return URL.createObjectURL(src);
        else return null
    })()

    return <label htmlFor={`slides[${index}].image`} className="w-[750px] h-[325px] rounded-lg cursor-pointer select-none overflow-hidden">
        <input name={`slides[${index}].image`} onChange={(e) => { console.log(e.currentTarget.files[0]); setFieldValue(`slides[${index}].image`, e.currentTarget.files[0]) }} type="file" id={`slides[${index}].image`} className='w-0 h-0 appearance-none hidden' />
        {imgSrc ? <Image src={imgSrc} className="w-full h-full object-cover object-top" width={500} height={217} alt='Carousel Image' />
            : <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="font_futura text-2xl mb-3">Carousel Slide Image</h1>
                <h2 className="text-2xl mb-3 lg:text-[30px] font_futura_bold text-center">1500 x 650</h2>
                <p className="w-1/2 font_futura text-lg text-center">".webp" format image is hightly recommended for its compact size and high quality.</p>
            </div>}
    </label>
}

export default function ProductCategories() {
    const [loader, setLoader] = useState(null);
    const [carousel, setCarousel] = useState('');
    const { getHomeCarousel, updateHomeCarousel } = useCarousel();

    const { values, errors, handleBlur, handleChange, handleSubmit, handleReset, touched, setFieldValue, setValues } = useFormik({
        validationSchema: homeCarouselSchema,
        initialValues: {
            slides: [
                {
                    title: '',
                    image: '',
                    href: ''
                }
            ]
        },
        onSubmit: async (values, { resetForm }) => {
            setLoader(<Loader status="Preparing the uploading for the slide images..." progress={8} />)
            const slides = structuredClone(values.slides);
            for (let [index, slide] of slides.entries()) {
                setLoader(<Loader status={`Uploading Slide Image #${index}...`} progress={index / slides.length * 100} />)
                slide.image = await uploadImage(slide.image, `carousel-images/home/${Date.now()}`, 100);
                console.log(slide)
            }

            setLoader(<Loader status="All slides images uploaded, updating carousel now.." progress={99} />)
            await updateHomeCarousel(slides, (carousel) => {
                console.log("Updated carousel: ", carousel)
                resetForm();
            })
            setLoader(null)
        },
    })

    const addSlide = () => setFieldValue('slides', [...values.slides, {
        title: '',
        image: '',
        href: ''
    }]);

    const removeSlide = (slideIndex) => {
        const newSlideArray = [...values.slides];
        newSlideArray.splice(slideIndex, 1);
        setFieldValue("slides", newSlideArray);
    };

    useEffect(() => {
        getHomeCarousel((carouselData) => setCarousel(carouselData));
    }, [])
    // console.log("the carousel data here: ", carousel);

    return <>
        {loader}
        <div className="flex mt-[15px] justify-between items-center">
            <div>
                <h1 className="font_futura text-[22px] text-black">Home Carousel</h1>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Home Carousel</span>
                </div>
            </div>
        </div>

        <section className='w-full mt-5 min-h-[60vh] p-4 bg-white rounded-2xl card_boxshadow'>
            {values.slides.map((slide, index) => {
                return <div key={index} className='w-full mb-4 p-5 flex justify-between border rounded-lg gap-[10px]'>
                    <nav className="flex-1 h-full pr-4 py-2 flex flex-col gap-y-6">
                        <h3 className="text-2xl ">Slide #{index + 1}</h3>
                        <InputText
                            label="Title"
                            name={`slides[${index}].title`}
                            value={values.slides[index].title}
                            onChange={handleChange}
                            error={(errors?.slides?.[index]?.title && touched?.slides?.[index]?.title) || null}
                        />
                        <InputText
                            label="Hyper Link"
                            name={`slides[${index}].href`}
                            value={values.slides[index].href}
                            onChange={handleChange}
                            error={(errors?.slides?.[index]?.href && touched?.slides?.[index]?.href) || null}
                        />
                        {values.slides.length > 1 && <Button onClick={() => removeSlide(index)} my="0">Remove Slide #{index + 1}</Button>}
                    </nav>
                    <DefaultOrPic src={slide.image} index={index} setFieldValue={setFieldValue} />
                </div>
            })}
            <section className="w-full flex justify-between items-center">
                <Button type="button" onClick={addSlide} my="my-3">Add Slide</Button>
                <Button type="button" onClick={handleSubmit} my="my-3">Update Carousel</Button>
            </section>
        </section>
    </>
}