import { useState } from 'react';
import { useAppContext } from "../contexts/AppContext";
import "../globals.css";
import Button from "./Button";

export function TitleScreen() {
  const { setOnTitleScreen, onTitleScreen } = useAppContext();
  const [isDissolving, setIsDissolving] = useState(false);

  const handlePlay = () => {
    setIsDissolving(true);
    setTimeout(() => {
      setOnTitleScreen(false);
    }, 1000); // Adjust this time to match your transition duration
  }

  if (onTitleScreen) {
    return (
      <div className={`relative grow flex flex-col mx-auto w-full h-screen overflow-hidden dark:bg-gray-900 bg-background transition-opacity duration-1000 ${isDissolving ? 'opacity-0' : 'opacity-100'}`}>
        <>
          <div className="flex flex-col items-center justify-center h-full mt-[-5%]">
            <div className="text-center">
              <img src={'/logo.png'} alt="Logo" className="mx-auto mb-4" style={{ width: '125px', height: '125px' }} />
              <h1 className="text-4xl font-semibold font-start mb-4 leading-relaxed text-black">CONSIDER THIS</h1>
              <p className="font-start text-secondary text-sm">Challenge what you know... and what you don&apos;t!</p>
            </div>
            <div className="flex flex-col items-center mt-8 space-y-4"> 
              <Button className="w-full" onClick={handlePlay} disabled={isDissolving}>PLAY</Button>
              <Button className="w-full" disabled={isDissolving}>HELP</Button>
              <Button className="w-full" disabled={isDissolving}>SETTINGS</Button>
              <Button className="w-full" disabled={isDissolving}>CONTACT</Button>
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
