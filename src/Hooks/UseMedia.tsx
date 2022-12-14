import { useEffect, useState } from "react";



const useMedia = (media: string) => {
    const [match, setMatch] = useState<any>(null);
    
    useEffect(() => {
        function changeMacth(){
            const {matches} = window.matchMedia(media)
            setMatch(matches);
        }
        changeMacth();
        window.addEventListener('resize', changeMacth);

        return() =>{
            window.removeEventListener('risize', changeMacth);
        };
    }, [media])
    return match;
}

export default useMedia;