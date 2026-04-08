import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Option = (props) => {
  const router = useRouter();
  const route = router.pathname;
  return (
    <Link
      key={props.key}
      className={`h-full group flex flex-col justify-between items-center transition-all `}
      href={props.href || '#'}
    >
      {props.children}
      <span
        className={`bg-gold-land h-1 mt-1 rounded-lg group-hover:w-full ${route === props.href ? "w-full" : "w-0"
          } transition-all duration-300`}
      ></span>
    </Link>
  );
};

export default function CustomTab(props) {
  // determining if the scroll direction is upwards or downwards
  const [direction, setDirection] = useState("");
  const handleScroll = (e) => {
    e.target.scrollTop > 7
      ? setDirection("-translate-y-20")
      : setDirection("translate-y-0");
  };

  return (
    <>
      <main
        className={`    font_futura flex  transition-all duration-700`}
      >
        <section onScroll={handleScroll} className="w-full font_futura ">
          <div className=" ">
            <div className="account_menu text-sm md:text-base overflow-x-scroll hide_scroll">
              <div className=" h-full flex justify-between  border-b border-b-gray-300 ">
                {props.tabdata.map((tab, index) => (
                  <Option key={index} href={tab.navlink}>
                    {" "}
                    <span className="font-[14px]  text-[10px] xl:text-[14px] " > {tab.label} </span>{" "}
                  </Option>
                ))}
              </div>
            </div>
            <section className=" z-50 my-5  font_futura">
              {props.children}
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
