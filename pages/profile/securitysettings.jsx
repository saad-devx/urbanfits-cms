import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import { Button2 } from "@/components/buttons/Button2";

const securitysettings = () => {
  return (
    <Profile>
      <CardAdmin classes="p-[40px]">
        <p className="text-[22px]  font-[400] ">General Security Settings</p>

        <div className="flex items-center gap-[15px] " >   
          <div>
            <label className="switch w-[40px] h-[22.25px]  ">
              <input
                type="checkbox"
                //   checked={enabled}
                //   onChange={(e) => togglenav(e)}
              />

              <span className="slider"></span>
            </label>
          </div>
          <p className=" text-[14px] font-[400]  " > Save my Activities Log. </p>
        </div>


        <div className="flex items-center gap-[15px]  " style={{marginTop:"23.5px"}}  >   
          <div>
            <label className="switch w-[40px] h-[22.25px]  ">
              <input
                type="checkbox"
                //   checked={enabled}
                //   onChange={(e) => togglenav(e)}
              />

              <span className="slider"></span>
            </label>
          </div>
          <p className=" text-[14px] font-[400]  " > Alert me by email for unusual activity </p>
        </div>


      <p className="text-[14px] font-[500] " > Manage Notification</p>

      <div className="flex items-center gap-[15px]  " style={{marginTop:"23.5px"}}  >   
          <div>
            <label className="switch w-[40px] h-[22.25px]  ">
              <input
                type="checkbox"
                //   checked={enabled}
                //   onChange={(e) => togglenav(e)}
              />

              <span className="slider"></span>
            </label>
          </div>
          <p className=" text-[14px] font-[400]  " > Get notification for all purchase </p>
        </div>

        <Button2  width="w-[160px]"  >
          Update

        </Button2>

      </CardAdmin>
    </Profile>
  );
};

export default securitysettings;
