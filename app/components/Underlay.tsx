
import { useAppContext } from "../contexts/AppContext";
import "../globals.css";
import Button from "./Button";

export function Underlay() {
  const { setOnTitleScreen, onTitleScreen } = useAppContext();

  const handlePlay = () => {
    setOnTitleScreen(false);
  }

  if (onTitleScreen) {
    return (
      <div className="relative grow flex flex-col mx-auto w-full h-screen overflow-hidden dark:bg-gray-900 bg-[#F4EDD8]">
        <>
          <div className="flex flex-col items-center justify-center h-full mt-[-5%]">
            <div className="text-center">
              <img src={'/logo.png'} alt="Logo" className="mx-auto mb-4" style={{ width: '125px', height: '125px' }} />
              <h1 className="text-4xl font-semibold font-start mb-4 leading-relaxed text-black">CONSIDER THIS</h1>
                <p className="font-start text-[#989486] text-sm">Challenge what you know... and what you don't!</p>
            </div>
            <div className="flex flex-col items-center mt-8 space-y-4"> 
              <Button className="w-full" onClick={handlePlay}>PLAY</Button>
              <Button className="w-full">HELP</Button>
              <Button className="w-full">SETTINGS</Button>
              <Button className="w-full">CONTACT</Button>
            </div>
          </div>
          {/* <Footer /> */}
        </>
      </div>
    )
  } else {
    return null;
  }
  }
