import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import useCarousel from '@/hooks/useCarousel';
import { InputText } from '@/components/InputText';
import Button from '@/components/buttons/simple_btn';
import uploadImage from '@/utils/uploadImage';
import Loader from '@/components/loaders/loader';
// imports for Schema and validation
import { useFormik } from 'formik';
import { catalogueCarouselSchema } from '@/mock/yupSchemas';

const DefaultOrPic = ({ src, index, setFieldValue, mega }) => {
    const imgSrc = (() => {
        if (typeof src === "string" && src.includes("/carousel-images")) return `${process.env.NEXT_PUBLIC_BASE_IMG_URL}${src}`;
        else if (typeof src === "object") return URL.createObjectURL(src);
        else return null
    })()

    return <label key={mega ? ("mega-" + index) : index} htmlFor={`slides[${index}].${mega ? "image2" : "image1"}`} className={`${mega ? "w-[505px] h-[442px]" : "w-[314px] h-[442px]"} rounded-lg cursor-pointer select-none overflow-hidden`}>
        <input name={`slides[${index}].${mega ? "image2" : "image1"}`} onChange={(e) => { setFieldValue(`slides[${index}].${mega ? "image2" : "image1"}`, e.currentTarget.files[0]) }} type="file" id={`slides[${index}].${mega ? "image2" : "image1"}`} className='w-0 h-0 appearance-none hidden' />
        {imgSrc ? <Image src={imgSrc} className="w-full h-full object-cover object-top" width={500} height={217} alt='Carousel Image' />
            : <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center">
                <h1 className="font_futura text-xl mb-3">Slide Image #{mega ? 2 : 1}</h1>
                <h2 className="text-2xl mb-3 font_futura_bold text-center">{mega ? "828 x 724" : "314 x 442"}</h2>
                <p className="w-1/2 font_futura text-sm text-center">".webp" format image is hightly recommended for its compact size and high quality.</p>
            </div>}
    </label>
}

export default function ProductCategories() {
    const [loader, setLoader] = useState(null);
    const { getCatalogueCarousel, updateCatalogueCarousel } = useCarousel();

    const { values, errors, handleBlur, handleChange, handleSubmit, handleReset, touched, setFieldValue, setValues } = useFormik({
        validationSchema: catalogueCarouselSchema,
        initialValues: {
            slides: [
                {
                    title: '',
                    image1: '',
                    image2: '',
                    href: ''
                }
            ]
        },
        onSubmit: async (values, { resetForm }) => {
            setLoader(<Loader status="Preparing the uploading for the slide images..." progress={8} />)
            const slides = structuredClone(values.slides);
            console.log("So Here are the slides: :", slides)
            for (let [index, slide] of slides.entries()) {
                setLoader(<Loader status={`Uploading Slide Image #${index}...`} progress={index / slides.length * 100} />)
                slide.image1 = await uploadImage(slide.image1, `carousel-images/catalogue/${Date.now()}`, 100);
                slide.image2 = await uploadImage(slide.image2, `carousel-images/catalogue/${Date.now()}`, 100);
                console.log(slide)
            }

            setLoader(<Loader status="All slides images uploaded, updating carousel now.." progress={99} />)
            await updateCatalogueCarousel(slides, (carousel) => {
                console.log("Updated carousel: ", carousel)
                // resetForm();
            })
            setLoader(null)
        },
    })

    const addSlide = () => setFieldValue('slides', [...values.slides, {
        title: '',
        image1: '',
        image2: '',
        href: ''
    }]);

    const removeSlide = (slideIndex) => {
        const newSlideArray = [...values.slides];
        newSlideArray.splice(slideIndex, 1);
        setFieldValue("slides", newSlideArray);
    };

    return <>
        {loader}
        <div className="flex mt-[15px] justify-between items-center">
            <div>
                <h1 className="font_futura text-[22px] text-black">Catalogue Carousel</h1>
                <div className="flex items-center mt-4 font_futura text-sm gap-x-3">
                    <Link href="/">Home</Link> <i className="fa-solid fa-chevron-right" />
                    <span>Catalogue Carousel</span>
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
                    <DefaultOrPic src={slide.image1} index={index} setFieldValue={setFieldValue} />
                    <DefaultOrPic src={slide.image2} index={index} setFieldValue={setFieldValue} mega={true} />
                </div>
            })}
            <section className="w-full flex justify-between items-center">
                <Button type="button" onClick={addSlide} my="my-3">Add Slide</Button>
                <Button type="button" onClick={handleSubmit} my="my-3">Update Carousel</Button>
            </section>
        </section>
    </>
}