import { useState } from "react";

interface IAthleteeProps{
    getText: (text: string) => void;
}

const Search: React.FC<IAthleteeProps> = (props) => {

    const SearchHandler = (event: any) =>{
        props.getText(event.target.value)
    }
   
    return(
        <input type="text" onChange={SearchHandler} placeholder="Search..."/>
    )
}

export default Search;