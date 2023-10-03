import { useState } from 'react';

function useActiveLink(defaultActive: string | null) {
  const [activeLinks, setActiveLinks] = useState([defaultActive]);

  console.log('activeLInks', activeLinks);
  const isActive = (buttonId: string) => {
    return activeLinks.includes(buttonId);
  };

  const toggleActive = (buttonId: string) => {
    console.log(buttonId);
    setActiveLinks((prevActiveLinks) => {
      if (prevActiveLinks.includes(buttonId)) {
        // Link is already active, deactivate it
        console.log(prevActiveLinks);
        return [buttonId];
        // return prevActiveLinks.filter((id) => id !== buttonId);
      } else {
        // Link is not active, activate it and deactivate others
        return [buttonId];
      }
    });
  };

  return { isActive, toggleActive };
}

export default useActiveLink;

