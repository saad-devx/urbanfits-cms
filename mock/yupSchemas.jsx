import * as Yup from "yup";

export const addProductSchema = Yup.object().shape({
    name: Yup.object().shape({
        en: Yup.string().required("Product name is required."),
        ar: Yup.string().required("Product name is required.")
    }),
    slug: Yup.string().required("Product slug is required."),
    categories: Yup.array().of(Yup.mixed().required("Category is required.")).max(3),
    description: Yup.object().shape({
        en: Yup.string().required("Description is required.").nullable(),
        ar: Yup.string().required("Description is required.").nullable()
    }),
    cover_image: Yup.mixed().required("Cover Image is essential."),
    newTag: Yup.string().trim(),
    tags: Yup.array().of(Yup.string().required('Tag is required')),
    price: Yup.number().required("Product Price is required.").nullable(),
    uf_points: Yup.number().nullable(),
    sale_price: Yup.number().nullable(),
    seo_details: Yup.object().shape({
        title: Yup.string().required('SEO title is required.'),
        description: Yup.string().required('SEO description is required.'),
        meta_keywords: Yup.string().required('SEO keywords are required.'),
    }),
    shipping_details: Yup.object().shape({
        width: Yup.string().required('Please define the width.'),
        height: Yup.string().required('Please define the height.'),
        weight: Yup.string().required('Please define the weight.'),
    }),
    variants: Yup.array().of(
        Yup.object().shape({
            color: Yup.string().required('Variant color is required.'),
            color_name: Yup.string().required('Color name is required.'),
            images: Yup.array().min(2, 'minimum 2 images are required (if not available, then repeat images).').max(6, 'You can only upload maximum 6 images.'),
            compression_quality: Yup.number(),
            sizes: Yup.array().of(
                Yup.object().shape({
                    size: Yup.string(),
                    quantity: Yup.number()
                })
            )
        })
    )
})

export const changePasswordSchema = Yup.object({
    oldpassword: Yup.string().min(2).required("Please Enter name"),
    newpassword: Yup.string().min(6).required("Please Enter username"),
    confirmnewpassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newpassword"), null], "password must match")

})
export const generalSettingSchema = Yup.object({
    addressline1: Yup.string().min(2).required("Please Enter addressline1"),
    addressline2: Yup.string().required("Please Enter addressline2"),
    city: Yup.string().required("Please Enter city"),
    state: Yup.string().required("Please Enter state"),
    country: Yup.string().required("Please Enter country"),
    postalcode: Yup.string().required("Please Enter postalcode"),

})

export const inventeryManagementSchema = Yup.object({
    holdstock: Yup.string().min(2).required("Fill this field"),
    notificationrecipients: Yup.string().required("Fill this field"),
    lowstockthreshold: Yup.string().required("Fill this field"),
    outofstockthreshold: Yup.string().required("Fill this field")
})

export const couponSchema = Yup.object({
    name: Yup.string().required("Coupon name is required."),
    coupon_code: Yup.string().min(8, "Coupon code must be at least 8 characters").required("Coupon code is required"),
    description: Yup.string(),
    coupon_value: Yup.number().required("Please specify the coupon worth."),
    coupon_config: Yup.object().shape({
        minimum_spend: Yup.number().nullable(),
        maximum_spend: Yup.number().nullable(),
        free_shipping: Yup.boolean(),
        individual_use: Yup.boolean(),
        exclude_sales: Yup.boolean(),
        allowed_products: Yup.array().test(
            'unique-allowed-products',
            'Allowed products should not have duplicate entries with exclude products',
            function (allowedProducts) {
                if (!allowedProducts || (allowedProducts.length === 1 && !allowedProducts[0])) return true;
                const { exclude_products: excludeProducts } = this.parent;
                return allowedProducts.every(entry => !excludeProducts.includes(entry));
            }
        ),
        exclude_products: Yup.array().test(
            'unique-exclude-products',
            'Exclude products should not have duplicate entries with allowed products',
            function (excludeProducts) {
                if (!excludeProducts || (excludeProducts.length === 1 && !excludeProducts[0])) return true;
                const { allowed_products: allowedProducts } = this.parent;
                return excludeProducts.every(entry => !allowedProducts.includes(entry));
            }
        ),

        allowed_categories: Yup.array().test(
            'unique-allowed-categories',
            'Categories in allowed_categories must be unique',
            function (allowedCategories) {
                if (!allowedCategories || (allowedCategories.length === 1 && !allowedCategories[0])) return true;
                const { exclude_categories: excludeCategories } = this.parent;
                return allowedCategories.every(entry => !excludeCategories.includes(entry));
            }
        ),
        exclude_categories: Yup.array().test(
            'unique-exclude-categories',
            'Categories in exclude_categories must be unique',
            function (excludeCategories) {
                if (!excludeCategories || (excludeCategories.length === 1 && !excludeCategories[0])) return true;
                const { allowed_categories: allowedCategories } = this.parent;
                return excludeCategories.every(entry => !allowedCategories.includes(entry));
            }
        ),
        allowed_emails: Yup.array(),
        coupon_usage_limit: Yup.number().nullable(),
        user_usage_limit: Yup.number()
    }),
    expiration_date: Yup.date(),
});

export const homeCarouselSchema = Yup.object({
    slides: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Title is required."),
            image: Yup.mixed().required("Image is required."),
            href: Yup.string().url()
        })
    )
})

export const catalogueCarouselSchema = Yup.object({
    slides: Yup.array().of(
        Yup.object().shape({
            title: Yup.string().required("Title is required."),
            image1: Yup.mixed().required("Image1 is required."),
            image2: Yup.mixed().required("Image2 is required."),
            href: Yup.string().url()
        })
    )
})