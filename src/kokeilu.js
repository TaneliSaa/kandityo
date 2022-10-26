import { useEffect, useState } from "react"

const Kirjautuminen = () => {


    const [etunimi,setEtunimi] = useState("");
    const [sukunimi,setSukunimi] = useState("");
    const [osoite,setOsoite] = useState("");
    const [postinro,setPostinro] = useState("");
    const [postitmp,setPostitmp] = useState("");
    const [sahkoposti,setSahkoposti] = useState("");
    const [kirjautumisForm,setKirjautumisForm] = useState(true);
    const [rekisteroitymisForm,setRekisteroitymisForm] = useState(false);
    







    return (

        <div>

            {
                kirjautumisForm ?

                <form>

                    <label>
                        Sähköposti
                        <input type="text"></input>
                    </label>

                    <label>
                        Salasana
                        <input type="password"></input>
                    </label>
                    
                    <button>Kirjaudu</button>

                    <button onClick={() => {setKirjautumisForm(false) ; setRekisteroitymisForm(true)}}>Rekisteröidy</button>
                </form>

                : null
            }


            {
                rekisteroitymisForm ? 

                <form>
                    
                    <label>
                        Etunimi
                        <input type="text"></input>
                    </label>

                    <br></br>

                    <label>
                        Sukunimi
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Osoite
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Postinro
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Postitoimipaikka
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Sähköposti
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Salasana
                        <input type="text"></input>
                    </label>
                    
                    <br></br>

                    <button>Peruuta</button>
                    <button>Rekisteröidy</button>
            
                </form>

                : null
            }    
                

            
            

            
            

        </div>
    );
}

export {
    
    Kirjautuminen
}

