import CardAdmin from "@/components/cards/cardadmin";
import QuestionIcon from "@/public/icons/QuestionIcon";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import { InputText } from "@/components/InputText";
import { InputSelect } from "@/components/InputSelect";
import { useFormik } from "formik";
import { inventeryManagementSchema } from "@/mock/yupSchemas";


export default function Inventorymanagement() {


  const initialValues = {

    holdstock: "",
    notificationrecipients: "",
    lowstockthreshold: "",
    outofstockthreshold: "",
  }

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: inventeryManagementSchema
  })


  return <>
    <section>
      <div className="font_futura">
        <p className="not-italic text-[22px] mt-[15px] font-medium text-black">
          Inventory Management
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
          Inventory Management
        </li>
      </div>
    </section>
    <section>

      <CardAdmin classes="p-[40px] mt-[30px] " >
        <section>
          <p className="text-[22px] font-[500] " >Inventory</p>

          <p className="text-[14px] font-[500] flex items-center mt-[30px] " > <span>Manage stock </span> <QuestionIcon />  </p>
          <p className="flex gap-[10px] items-center mt-[10px] " > <input type="checkbox" /> <span className="mt-[1px]" >Enable stock management</span> </p>

          <p className="text-[14px] font-[500] flex items-center mt-[30px] " > <span>Manage stock </span> <QuestionIcon />  </p>
          <p className="flex gap-[10px] items-center mt-[20px] " > <input type="checkbox" /> <span className="mt-[1px]">Enable low stock notification</span> </p>
          <p className="flex gap-[10px] items-center mt-[15px] " > <input type="checkbox" /> <span className="mt-[1px]">Enable out of stock notification</span> </p>

          <p className="text-[14px] font-[500] flex items-center mt-[30px] " > <span>Out of stock visibility</span> <QuestionIcon />  </p>
          <p className="flex gap-[10px] items-center mt-[10px] " > <input type="checkbox" /> <span className="mt-[1px]" >Hide out of stock item from the catalog</span> </p>

        </section>
        <section className="grid grid-cols-2 gap-[30px]" >

          <div className="flex flex-col gap-[30px]" >
            <InputText
              label="Hold Stock"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              type="number"
              name="holdstock"
              value={values.holdstock}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.holdstock && touched.holdstock ?
                (errors.holdstock) : null
              }
            />
            <InputText
              label="Low Stock threshold"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              name="lowstockthreshold"
              value={values.lowstockthreshold}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.lowstockthreshold && touched.lowstockthreshold ?
                (errors.lowstockthreshold) : null
              }
            />
            <InputSelect
              label="Stock display format"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              options={["Always show quantity remaining in stock e.g. “12 in stock”", "pkr"]}
            />

          </div>
          <div className="flex flex-col gap-[30px]" >
            <InputText
              label="Notification recipients"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              name="notificationrecipients"
              value={values.notificationrecipients}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.notificationrecipients && touched.notificationrecipients ?
                (errors.notificationrecipients) : null
              }
            />
            <InputText
              label="Out of stock threshold"
              width="  w-[100%]"
              placeholder=" "
              postlabel={<QuestionIcon />}
              name="outofstockthreshold"
              value={values.outofstockthreshold}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.outofstockthreshold && touched.outofstockthreshold ?
                (errors.outofstockthreshold) : null
              }
            />
          </div>
        </section>
      </CardAdmin>
    </section>
  </>
};