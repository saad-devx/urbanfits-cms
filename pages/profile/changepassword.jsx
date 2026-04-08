import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import { InputText } from "@/components/InputText";
import { InfoBlackIcon } from "@/public/icons/InfoBlackIcon";
import { Button2 } from "@/components/buttons/Button2";
import { useFormik } from "formik";
import { changePasswordSchema } from "@/mock/yupSchemas";

export default function ChangePassword() {

  const initialValues = {
    oldpassword: "",
    newpassword: "",
    confirmnewpassword: "",
  }

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordSchema
  })
  return (
    <Profile>
      <CardAdmin classes="p-[40px]   ">
        <div className="grid grid-cols-2 gap-x-[40px] ">
          <div className=" flex flex-col gap-[19px]">
            <InputText
              autoComplete="off"
              aria-autocomplete="none"
              label="Old Password"
              width="w-[100%]"
              placeholder="Old Password"
              type="password"
              name="oldpassword"
              value={values.oldpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.oldpassword && touched.oldpassword ?
                (errors.oldpassword) : null
              }
            />
            <InputText
              autoComplete="off"
              label="New Password"
              width="  w-[100%]"
              placeholder="New Password"
              type="password"
              name="newpassword"
              value={values.newpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.newpassword && touched.newpassword ?
                (errors.newpassword) : null
              }
            />

            <div>
              <span className="flex gap-x-[7px] gap-y-[5px]  items-center text-[12px] ">
                <InfoBlackIcon />
                <p>Password should be minimum 6 Character long.</p>
              </span>
              <span className="flex gap-[7px] items-center text-[12px] ">
                <InfoBlackIcon />
                <p>Your password will update after confirm from your email.</p>
              </span>
            </div>

            <Button2 width="w-[160px]" my="my-[0px]">
              Update
            </Button2>
          </div>

          <div className=" flex flex-col mt-[97px]">

            <InputText
              label="Confirm New Password"
              width="  w-[100%]"
              placeholder="Confirm New Password"
              type="password"
              autoComplete="off"
              name="confirmnewpassword"
              value={values.confirmnewpassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmnewpassword && touched.confirmnewpassword ?
                (errors.confirmnewpassword) : null
              }
            />

          </div>
        </div>
      </CardAdmin>
    </Profile>
  );
};