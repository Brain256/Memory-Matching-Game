import { useState, useEffect } from "react"; 
import "./Cards.css"; 

function Cards ({ score, setScore, highestScore, setHighestScore}) {

    const [ cardNames, setCardNames ] = useState([
        "Charizard",
        "Charmander",
        "Ivysaur",
        "Caterpie",
        "Bulbasaur",
        "Rayquaza",
        "Kyogre",
        "Groudon",
        "Arceus",
        "Dialga",
        "Pikachu",
        "Geodude"
    ])

    const [ cardImages, setCardImages ] = useState({}); 

    const [chosen, setChosen] = useState([]); 

    const handleShuffle = (item) => {
        let temp = [...cardNames]; 
        for(let i = cardNames.length-1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [temp[i], temp[j]] = [temp[j], temp[i]]; 
        }

        setCardNames(temp); 

        if(chosen.find(i => i === item)) {
            setScore(0); 
            setChosen([]); 
        } else {
            setScore(score + 1);
            score >= highestScore ? setHighestScore(score+1) : null; 
            chosen.push(item);  
        }  
    }

    useEffect(() => {
        const fetchImages = async () => {
            const results = await Promise.all(
                cardNames.map(async (pokemon) => {
                    const object = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`); 
                    const data = await object.json(); 

                    return [pokemon, data.sprites.front_default]; 
                })
            )

            setCardImages(Object.fromEntries(results)); 
        }
        
        fetchImages(); 
    }, [])
    
    return (
        <>
            {
            cardNames.map((item) => {
                return (
                    <button key={item} onClick={() => handleShuffle(item)}><img src={cardImages[item]}></img><p>{item}</p></button>
                )
            })
            }
        </>
    );
}


export default Cards; 