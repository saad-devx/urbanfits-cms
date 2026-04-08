import { useState } from "react";
import CardAdmin from "@/components/cards/cardadmin";
import { QuestionIcon } from "@/public/icons/QuestionIcon";
import { WebIcon } from "@/public/icons/WebIcon";
import { MenueIcon } from "@/public/icons/MenueIcon";
// import QuestionIcon from '@/public/icons/QuestionIcon'
import Button from "@/components/buttons/simple_btn";
import { RightArrowIcon } from "@/public/sidebaricons/RightArrowIcon";
import CustomModal from "@/components/modals/CustomModal";
import { InputSelect } from "@/components/InputSelect";
// import { MenueIcon } from '@/public/icons/MenueIcon'
// import { WebIcon } from '@/public/icons/WebIcon'

export default function Shipping() {
  const [checked, setChecked] = useState(1);

  const handlemenueclick = (id) => {
    setChecked(id);
  };

  const [shippingmodal, setShippingmodal] = useState(false);
  const toggleaddshippingmodal = () => {
    setShippingmodal(!shippingmodal);
  };

  const [hover, setHover] = useState(false);
  const togglehover = () => {
    setHover(!hover);
  };

  return <div className="font_futura">
    <div className="flex mt-[15px] justify-between items-center ">
      <div>
        <div className="font_futura">
          <p className="not-italic text-[22px]  font-medium text-black">
            Shipping
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
            Shipping
          </li>
        </div>
      </div>
      {/*  */}
      <div>
        <span onClick={toggleaddshippingmodal}>
          <Button my="my-[0px]"> Add Shipping Zone</Button>
        </span>
        <CustomModal
          px="px-[50px]"
          py="py-[40px]"
          width="w-[686.4px]"
          show={shippingmodal}
          toggleModal={toggleaddshippingmodal}
        >
          <div>
            <p className="text-[18px] font-[500] ">Add Shipping Methods</p>
            <p className="text-[14px] font-[400] mt-[32px]  ">
              Choose the shipping method you wish to add. Only shipping
              methods which supports zones are listed.{" "}
            </p>

            <div className="flex gap-[15px] items-center mt-[32px] ">
              <InputSelect width="w-[390.4px]" options={["s", "s", "b"]} />
              <Button
                font="font_futura"
                rounded="rounded-[10px] "
                fontSize="text-[15px]"
                my="my-[0px]"
              >
                Add Payment Method
              </Button>
            </div>
            <p className="text-[10px] font-[400] mt-[10px] ">
              Let you charge a fixed rate for shipping.
            </p>
          </div>
        </CustomModal>
      </div>
      {/*  */}
    </div>

    <CardAdmin classes="mt-[20px]">
      <div className="p-[40px] ">
        <div className="flex gap-[30px] text-[14px] font-medium text-center">
          <p
            className={`${checked == 1 && "gradient_txt_2"
              } cursor-pointer `}
            onClick={() => handlemenueclick(1)}
          >
            Shipping Zones
          </p>
          <p
            className={`${checked == 2 && "gradient_txt_2"
              } cursor-pointer `}
            onClick={() => handlemenueclick(2)}
          >
            Shipping Options
          </p>
        </div>
        <section>
          {checked == 1 && (
            <section>
              <div className="my-[19px]">
                <p className="text-[14px] font-light ">
                  A Shipping zone is a geographic region where a certain set
                  of shipping methods are offered. It will match a customer
                  to a single zone using their shipping address and present
                  the shipping methods within that zone to them.
                </p>
              </div>
              <div className="">
                <div className="grid grid-cols-3 mx-[10px] ">
                  <div className="flex items-center">
                    <QuestionIcon />
                    <p className="text-[15px] ml-[15.33px] font-normal max-w-[250px] my-[23.5px] col-2 ">
                      Zone name
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] font-normal max-w-[540px] my-[23.5px] col-2">
                      Region (s)
                    </p>
                  </div>
                  <div>
                    <p className="text-[15px] font-normal max-w-[250px] my-[23.5px] col-2">
                      Shipping method(s)
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#F9F9F9] border-[1px] items-center">
                <div className="grid grid-cols-3  mx-[10px]">
                  <div className="flex items-center">
                    <MenueIcon />
                    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} >
                      {hover ? (
                        <div className="flex flex-col gap-[5px]  " >
                          <p className="text-[14px] ml-[15.33px] font-normal not-itapc max-w-[250px] ">
                            United States (US)
                            <div className="flex justify-between " >
                              <p className="gradient_txt_2 cursor-pointer text-[12px] font-[500] " >Edit</p> <p className="text-[#0000004d]" >|</p> <p className="cursor-pointer text-[12px] font-[500] ">Delete</p>
                            </div>
                          </p>
                        </div>
                      ) : (
                        <p className="text-[14px] ml-[15.33px] font-normal not-itapc max-w-[250px] ">
                          United States (US)
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[14px] font-normal not-itapc max-w-[540px] my-[23.5px]">
                      United States (US)
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-normal not-itapc max-w-[250px] my-[23.5px] ">
                      Free shipping
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="grid grid-cols-3 mx-[10px]">
                  <div className="flex items-center">
                    <WebIcon />
                    <p className="text-[13px] ml-[15.33px] font-normal not-itapc max-w-[250px] my-[23.5px]  ">
                      Location not covered by your other zones
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] font-normal not-itapc max-w-[540px] my-[23.5px] ">
                      This zone is optionally used for region that are not
                      included in any other shipping zone.{" "}
                    </p>
                  </div>
                  <div>
                    <p className="text-[13px] font-normal not-itapc max-w-[250px] my-[23.5px] ">
                      No shipping method offered to this zone.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {checked == 2 && (
            <section className=" text-[14px] ">
              <p className=" font-[500] mt-[40px] ">Calculations</p>
              <p className="font-[400] flex gap-[15px] items-center mt-[15px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]">
                  {" "}
                  Enable the shipping calculator on the cart page.{" "}
                </p>{" "}
              </p>
              <p className="font-[400] flex gap-[15px] items-center mt-[20px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]">
                  {" "}
                  Hide shipping costs until an address is entered{" "}
                </p>{" "}
              </p>

              <p className=" font-[500] mt-[40px] flex items-center ">
                {" "}
                <p> Shipping methods</p> <QuestionIcon />{" "}
              </p>
              <p className="font-[400] flex gap-[15px] items-center mt-[15px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]">
                  {" "}
                  Default to customer shipping address{" "}
                </p>{" "}
              </p>
              <p className="font-[400] flex gap-[15px] items-center mt-[20px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]">
                  {" "}
                  Default to customer billing address
                </p>{" "}
              </p>
              <p className="font-[400] flex gap-[15px] items-center mt-[20px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]">
                  Force shipping to the customer billing address
                </p>{" "}
              </p>

              <p className=" font-[500] mt-[40px] flex items-center ">
                {" "}
                <p> Debug Mode</p> <QuestionIcon />{" "}
              </p>
              <p className="font-[400] flex gap-[15px] items-center mt-[15px] ">
                {" "}
                <input type="checkbox" />{" "}
                <p className="mt-[2px]"> Enable debug mode</p>{" "}
              </p>

              <p className=" font-[500] mt-[20px]  ">
                {" "}
                Enable shipping debug mode to show matching shipping zones
                and to by pass shipping rate cache.{" "}
              </p>
            </section>
          )}
        </section>
      </div>
    </CardAdmin>
  </div>
};