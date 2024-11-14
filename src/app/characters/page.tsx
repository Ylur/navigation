import React from "react";

type Props = {

params: Promise<{ characterName: string }>;
};


const CharacterInfo = async (props: Props) => {
    const { characterName } = await props.params;
    const character = character[characterName];
    

    return (
      <div>
        <h1>{character.name}</h1>
        <p>{character.description}</p>
      </div>
    );
  };
const foo = await props. params;


return <div>(foo.characterName)</div>

export default CharacterInfo;

