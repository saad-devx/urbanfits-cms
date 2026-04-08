import Profile from ".";
import CardAdmin from "@/components/cards/cardadmin";
import { Button2 } from "@/components/buttons/Button2";

const notifications = () => {
  return (
    <Profile>
      <CardAdmin classes="p-[40px]">
        <div>
          <p className="text-[22px] font-[400] ">Notifications</p>

          <div className="flex gap-[15px] items-center mt-[23px] ">
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Someone assigns me to a tasks.
            </p>
          </div>
          <div
            className="flex gap-[15px] items-center "
            style={{ marginTop: "23.5px" }}
          >
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Someone mentions me in a conversation.
            </p>
          </div>
          <div
            className="flex gap-[15px] items-center "
            style={{ marginTop: "23.5px" }}
          >
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Someone add me to a project
            </p>
          </div>
        </div>

        <div>
          <p className="text-[22px] font-[400] ">Service Notification</p>

          <div className="flex gap-[15px] items-center mt-[23px] ">
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Monthly Newsletter
            </p>
          </div>
          <div
            className="flex gap-[15px] items-center "
            style={{ marginTop: "23.5px" }}
          >
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Daily Updates
            </p>
          </div>
          <div
            className="flex gap-[15px] items-center "
            style={{ marginTop: "23.5px" }}
          >
            <label className="switch w-[40px] h-[22.25px]  ">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
            <p className="text-[14px] font-[400]">
              Minor Update and Bug Fix.
            </p>
          </div>
        </div>
        <div style={{ marginTop: "50px" }} >
          <Button2 width="w-[160px]" my="my-[50px]">
            Update
          </Button2>
        </div>
      </CardAdmin>
    </Profile>
  );
};

export default notifications;
