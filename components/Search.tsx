import { useState } from "react";

interface IAthleteeProps{
    getText: (text: string) => void;
}

const Search: React.FC<IAthleteeProps> = (props) => {

    const [searchText, setSearchText] = useState<String>();

    const SearchHandler = (event: any) =>{
        //setSearchText(event.target.value);
        props.getText(event.target.value)
    }
   
    return(
        <input type="text" onChange={SearchHandler} placeholder="Search athletees ..."/>
    )
}

export default Search;