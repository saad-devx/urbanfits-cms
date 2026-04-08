import CardAdmin from "@/components/cards/cardadmin";
import countryCodes from "@/mock/countryCodes";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import { useFormik } from "formik";
import { generalSettingSchema } from "@/mock/yupSchemas";

export default function Generalsetting() {

  const initialValues = {
    addressline1: "",
    addressline2: "",
    city: "",
    state: "",
    country: "",
    postalcode: "",

  }
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: generalSettingSchema
  })

  return <>
    <div className="font_futura">
      <p className="not-italic text-[22px] mt-[15px] font-medium text-black">
        General Setting
      </p>
    </div>
    <div className=" flex items-center mt-[15px] ">
      <li className="  not-italic text-[14px] text-center font-medium text-black list-none">
        Home
      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        <RightArrowIcon />
      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        Account
      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        <RightArrowIcon />

      </li>
      <li className=" ml-[12px] not-italic text-[14px] text-center font-medium text-black list-none">
        General Settings
      </li>
    </div>

    <CardAdmin classes="p-10 mt-5 " round="rounded-[25px]">
      <div className="font_futura">
        {/* <p className="text-[22px] font-semibold "> Store Address</p>

        <p className="text-[14px] mt-[15px] mb-[30px] ">
          This is where your business is located. Tax rates and shipping rates
          will use this address.
        </p>

        <div className="grid grid-cols-2 gap-[40px] ">
          <div className="flex flex-col gap-[20px]  ">
            <InputText
              label="Address Line 1"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              name="addressline1"
              value={values.addressline1}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.addressline1 && touched.addressline1 ?
                (errors.addressline1) : null
              }
            />
            <InputText
              label="City"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.city && touched.city ?
                (errors.city) : null
              }
            />
            <InputText
              label="Postal Code / ZIP"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              type="number"
              name="postalcode"
              value={values.postalcode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.postalcode && touched.postalcode ?
                (errors.postalcode) : null
              }
            />
          </div>
          <div>
            <div className="flex flex-col gap-[20px]  ">
              <InputText
                label="Address Line 2"
                width="  w-[100%]"
                placeholder=" "
                postlabel={<QuestionIcon />}
                name="addressline2"
                value={values.addressline2}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.addressline2 && touched.addressline2 ?
                  (errors.addressline2) : null
                }
              />

              <InputSelect defaultValue="Select country code" value={values.phone_prefix} onChange={handleChange} name="phone_prefix" label="Phone Prefix" error={errors.phone_prefix && touched.phone_prefix ? errors.phone_prefix : null}>
                <option disabled>Select phone prefix</option>
                {countryCodes.map((item) => {
                  if (!item.code) return <option disabled>{item.name}</option>
                  return <option value={item.code}>{item.name} {item.code}</option>
                })}
              </InputSelect>
            </div>
          </div>
        </div> */}

        <p className="text-[22px] mb-5 ">
          Selling Options
        </p>

        <div className="grid grid-cols-2 gap-[40px] ">
          <div className="flex flex-col gap-[20px]">
            {/* <InputSelect
              label="Selling Location"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["Select Countries", "United States", "Palestine"]}
            />
            <InputSelect
              label="Default Customer Location"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["Country / Region", "United States", "Palestine"]}
            /> */}
          </div>
          <div className="flex flex-col gap-[20px]">
            {/* <InputSelect
              label="Shipping Location"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={[
                "Ship to selected countries",
                "United States",
                "Palestine",
              ]}
            /> */}
          </div>
        </div>

        <div className="flex gap-[91px]  mt-[40px] ">
          <div className="flex flex-col gap-[67px] ">
            <p className="text-[14px] font-[500] ">Enable Taxes</p>
            <p className="text-[14px] font-[500] ">Enable Coupons</p>
          </div>

          <div className="flex flex-col gap-[42.5px] ">
            <div className="flex gap-[5px]  ">
              <span className="mt-0">
                <input type="checkbox" />
              </span>
              <div className="flex flex-col gap-[10.5px] ">
                <p className="text-sm">
                  Enable Tax rates and calculations
                </p>
                <p className="text-xs">
                  Rates will be configurable and taxes will be calculated
                  during checkout.
                </p>
              </div>
            </div>

            <div className="flex gap-[5px]  ">
              <span className="mt-0">
                <input type="checkbox" />
              </span>
              <div className="flex flex-col gap-[10.5px] ">
                <p className="text-sm">
                  Enable the use of Coupon codes
                </p>
                <p className="text-xs">
                  Coupons can be applied from the cart and checkout pages.
                </p>
              </div>
            </div>

            <div className="flex gap-[5px]  ">
              <span className="mt-0">
                <input type="checkbox" />
              </span>
              <div className="flex flex-col gap-[10.5px] ">
                <p className="text-sm">
                  Coupons can be applied from the cart and checkout pages.
                </p>
                <p className="text-xs">
                  When applying multiple coupons, apply the first coupon to
                  the full price and second coupon to the discounted price and
                  so on.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[22px] font-[500] mt-[60px] ">Currency Options</p>

        <p className="text-[14px] font-[400] mt-[15px]  ">
          The following option affects how prices are displayed on the
          front-end.
        </p>

        <div className="grid grid-cols-2 gap-[40px] mt-[30px] ">
          <div className="flex flex-col gap-[20px]">
            {/* <InputSelect
              label="Currency"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["ADE", "United States Dollars ($)", "pkr"]}
            /> */}
            <div className="flex gap-[22.5px] ">
              {/* <InputText
                label="Thousand Separator"
                width="  w-[100%]"
                placeholder=" "
                postlabel={<QuestionIcon />}
              />
              <InputText
                label="Decimal Separator &nbsp;"
                width="  w-[100%]"
                placeholder=" "
                postlabel={<QuestionIcon />}
              />
              <InputText
                label="Number of Decimals"
                width="  w-[100%]"
                placeholder=" "
                postlabel={<QuestionIcon />}
              /> */}
            </div>
          </div>
          <div>
            {/* <InputSelect
              label="Currency Position"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["left", "pkr"]}
            /> */}
          </div>
        </div>

        <section>
          <p className="text-[22px] font-[500] mt-[60px] ">Meaurments</p>
          <div className="grid grid-cols-2 gap-[40px] ">
            {/* <InputSelect
              label="Weight unit"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["kg", "grm"]}
            />
            <InputSelect
              label="Dimension unit"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["cm", "m"]}
            /> */}
          </div>
        </section>

        <section>
          <p className="text-[22px] font-[500] mt-[60px] ">Review</p>
          <div className="flex gap-[91px]  mt-[40px] ">
            <div className="flex flex-col gap-[85px] ">
              <p className="text-[14px] font-[500] ">Enable Taxes</p>
              <p className="text-[14px] font-[500] ">Enable Coupons</p>
            </div>

            <div className="flex flex-col gap-[40px] ">
              <div>
                <div className="flex gap-[5px]  ">
                  <span className="mt-0">
                    <input type="checkbox" />
                  </span>
                  <p className="text-[14px] font-[400] ">
                    Enable product reviews
                  </p>
                </div>
                <div className="flex gap-[5px] mt-[20px] ">
                  <span className="mt-0">
                    <input type="checkbox" />
                  </span>
                  <p className="text-[14px] font-[400] ">
                    Show “verified owner” label on customer reviews
                  </p>
                </div>
              </div>

              <div>
                <div className="flex gap-[5px]  ">
                  <span className="mt-0">
                    <input type="checkbox" />
                  </span>
                  <p className="text-sm">
                    Enable star rating on reviews
                  </p>
                </div>
                <div className="flex gap-[5px] mt-[20px] ">
                  <span className="mt-0">
                    <input type="checkbox" />
                  </span>
                  <p className="text-sm">
                    Star rating should be required
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </CardAdmin>
  </>
};