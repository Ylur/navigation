import CharacterCard from "@/components/CharacterCard";
import React from "react";

const characterData: Record<string, Character> = {

shrek:{
name:"shrek",
description: "A lovable ogre.", 
imageUrl: "shrek.png",


fiona:{
name: "Fiona",
description: "A princess with an ogre form.", 
imageUrl: "fiona.webp",

donkey: {
name: "Donkey",
description:"donkekeke", 
imageUrl: "donkey.png",

},
};

const Characters = () => {

return (
<div className="flex gap-5 p-10 justify-center">

{/* Shrek */}

<CharacterCard character={characterData ["shrek"]} />

{/* Fiona */}
<CharacterCard character={characterData ["fiona"]} />

{/* Donkey */}
<CharacterCard character={characterData ["Donkey"]} />

</div>

export default Characters;