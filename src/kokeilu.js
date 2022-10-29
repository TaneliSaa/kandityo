import { useEffect, useState } from "react"

const Kirjautuminen = () => {


    const [etunimi,setEtunimi] = useState("");
    const [sukunimi,setSukunimi] = useState("");
    const [osoite,setOsoite] = useState("");
    const [postinro,setPostinro] = useState("");
    const [postitmp,setPostitmp] = useState("");
    const [sahkoposti,setSahkoposti] = useState("");
    const [salasana,setSalasana] = useState("");

    //Formit
    const [kirjautumisForm,setKirjautumisForm] = useState(true);
    const [rekisteroitymisForm,setRekisteroitymisForm] = useState(false);

    //Kirjautumis jutut
    const [kirjautumisTunnus,setKirjautumisTunnus] = useState("");
    const [kirjautumisSalasana,setKirjautumisSalasana] = useState("");
    const [kirjautumisQuery,setKirjautumisQuery] = useState("");
    const [laskuri,setLaskuri] = useState(0);
    const [kirjautumisTiedot,setKirjautumisTiedot] = useState([]);

    //Rekisteröitymis jutut
    const [lisaaNimi,setLisaaNimi] = useState("");
    const [lisaaSukunimi,setLisaaSukunimi] = useState("");
    const [lisaaOsoite,setLisaaOsoite] = useState("");
    const [lisaaPostinro,setLisaaPostinro] = useState("");
    const [lisaaPostitmp,setLisaaPostitmp] = useState("");
    const [lisaaSahkoposti,setLisaaSahkoposti] = useState("");
    const [lisaaSalasana,setLisaaSalasana] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }


    //Kirjautumis effecti
    useEffect( () => {

        const TarkistaKirjautuminen = async () => {

            let response = await fetch("http://localhost:3004/asiakas/" + kirjautumisQuery);

            let c = await response.json();


            

            setKirjautumisTiedot(c);
        }

        if (laskuri > 0) {

            TarkistaKirjautuminen();
        }

    },[laskuri]);

    

    const handleFetch = () => {

        let m = "";







        setKirjautumisQuery(m);
    }

    

    //Rekisteröitymis effecti
    useEffect( () => {

        const rekisteroidy = async () => {


            fetch("http://localhost:3004/asiakas/", {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    Etunimi : lisaaNimi,
                    Sukunimi : lisaaSukunimi,
                    Osoite : lisaaOsoite,
                    Postinro : lisaaPostinro,
                    Postitmp : lisaaPostitmp,
                    Sahkoposti : lisaaSahkoposti,
                    Salasana : lisaaSalasana
                    
                })
            });

        }

        if (lisaaQuery != "") {

            rekisteroidy();
        }

    },[lisaaQuery]);



    const handlePost = () => {

        let m  = "";

        m = lisaaNimi + lisaaSukunimi + lisaaOsoite + lisaaPostinro + lisaaPostitmp + lisaaSahkoposti + lisaaSalasana;

        setLisaaQuery(m);

    }
    







    return (

        <div>

            {
                kirjautumisForm ?

                <form onSubmit={(e) => handleSubmit(e)}>

                    <label>
                        Sähköposti
                        <input type="text" onChange={(e) => setKirjautumisTunnus()}></input>
                    </label>

                    <label>
                        Salasana
                        <input type="password" onChange={(e) => setKirjautumisSalasana()}></input>
                    </label>
                    
                    <button>Kirjaudu</button>

                    <button onClick={() => {setKirjautumisForm(false) ; setRekisteroitymisForm(true)}}>Rekisteröidy</button>
                </form>

                : null
            }


            {
                rekisteroitymisForm ? 

                <form onSubmit={(e) => handleSubmit(e)}>
                    
                    <label>
                        Etunimi
                        <input type="text" onChange={(e) => setLisaaNimi(e.target.value)}></input>
                    </label>

                    <br></br>

                    <label>
                        Sukunimi
                        <input type="text" onChange={(e) => setLisaaSukunimi(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Osoite
                        <input type="text" onChange={(e) => setLisaaOsoite(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Postinro
                        <input type="text" onChange={(e) => setLisaaPostinro(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Postitoimipaikka
                        <input type="text" onChange={(e) => setLisaaPostitmp(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Sähköposti
                        <input type="text" onChange={(e) => setLisaaSahkoposti(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <label>
                        Salasana
                        <input type="text" onChange={(e) => setLisaaSalasana(e.target.value)}></input>
                    </label>
                    
                    <br></br>

                    <button onClick={() => {setRekisteroitymisForm(false) ; setKirjautumisForm(true)}}>Peruuta</button>
                    <button onClick={() => {handlePost() ; setRekisteroitymisForm(false) ; setKirjautumisForm(true)}}>Rekisteröidy</button>
            
                </form>

                : null
            }    
                

            
            

            
            

        </div>
    );
}

export {
    
    Kirjautuminen
}

