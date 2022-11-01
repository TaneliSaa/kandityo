import { useEffect, useState } from "react"

const Kirjautuminen = () => {

    //Etusivu
    const [etunimi,setEtunimi] = useState("");
    const [sukunimi,setSukunimi] = useState("");
    const [osoite,setOsoite] = useState("");
    const [postinro,setPostinro] = useState("");
    const [postitmp,setPostitmp] = useState("");
    const [sahkoposti,setSahkoposti] = useState("");
    const [salasana,setSalasana] = useState("");
    const [haeQuery,setHaeQuery] = useState("");
    const [tableTiedot,setTableTiedot] = useState([]);

    //Formit
    const [kirjautumisForm,setKirjautumisForm] = useState(true);
    const [rekisteroitymisForm,setRekisteroitymisForm] = useState(false);
    const [etusivuForm,setEtusivuForm] = useState(false);
    const [muokkaaForm,setMuokkaaForm] = useState(false);

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

    //Delete jutut
    const [iidee,setIidee] = useState("");

    //Muokkaa jutut
    const [muokkaaIidee,setMuokkaaIidee] = useState("");
    const [muokkaaEtunimi,setMuokkaaEtunimi] = useState("");
    const [muokkaaSukunimi,setMuokkaaSukunimi] = useState("");
    const [muokkaaOsoite,setMuokkaaOsoite] = useState("");
    const [muokkaaPostinro,setMuokkaaPostinro] = useState("");
    const [muokkaaPostitmp,setMuokkaaPostitmp] = useState("");
    const [muokkaa,setMuokkaa] = useState(false);



    const handleSubmit = (event) => {
        event.preventDefault();
    }


    //Kirjautumis effecti
    useEffect( () => {

        const TarkistaKirjautuminen = async () => {

            let response = await fetch("http://localhost:3004/asiakas/" + kirjautumisQuery);

            let c = await response.json();

        }

    });

    

    const handleKirjautuminen = () => {

        let m = "";

        m = kirjautumisTunnus + kirjautumisSalasana;

        console.log(m);

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

    //Etusivu effecti
    useEffect( () => {

        const fetchTiedot = async () => {

            let response = await fetch("http://localhost:3004/asiakas" + haeQuery);

            let c = await response.json();

            console.log(c);

            setTableTiedot(c);

        }

        

        if (laskuri > 0) {

            fetchTiedot();
        }

    },[laskuri]);

    const handleFetch = () => {

        let m = "";

        if (etunimi != "") {
            m = "?Etunimi=" + etunimi;
        }


        setHaeQuery(m);

        setLaskuri(laskuri + 1);
    }


    const data = tableTiedot.map( (item,index) => {

        return (

            <tr key={index}>
                <td>{item.Etunimi}</td>
                <td>{item.Sukunimi}</td>
                <td>{item.Osoite}</td>
                <td>{item.Postinro}</td>
                <td>{item.Postitmp}</td>
                <td><button id={item.Henk_ID} onClick={(e) => {setMuokkaaIidee(e.target.id) ; setEtusivuForm(false) ; setMuokkaaForm(true)}}>Muokkaa</button></td>
                <td><button id={item.Henk_ID} onClick={(e) => {setIidee(e.target.id) ; handleFetch()}}>Poista</button></td>
            </tr>
        );

    });

    //Poistamis effect
    useEffect( () => {

        const deleteAsiakas = async () => {

            fetch("http://localhost:3004/asiakas/" + iidee, {
                method : 'DELETE'
            });
        }


        if (iidee != "") {

            deleteAsiakas();
        };


    },[iidee]);

    //Muokkaamis effecti
    useEffect( () => {

        const muokkaaAsiakasta = async () => {

            fetch("http://localhost:3004/asiakas/" + muokkaaIidee, {
                method : 'PUT',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    Etunimi : muokkaaEtunimi,
                    Sukunimi : muokkaaSukunimi,
                    Osoite : muokkaaOsoite,
                    Postinro : muokkaaPostinro,
                    Postitmp : muokkaaPostitmp
                })
            });

        }

        if (muokkaa == true) {

            muokkaaAsiakasta();
            
        }

        setMuokkaa(false);


        

    },[muokkaa]);

    







    return (

        <div>

            {
                kirjautumisForm ?

                <div>
                
                    <form onSubmit={(e) => handleSubmit(e)}>

                        <label>
                            Sähköposti
                            <input type="text" onChange={(e) => setKirjautumisTunnus(e.target.value)}></input>
                        </label>

                        <label>
                            Salasana
                            <input type="password" onChange={(e) => setKirjautumisSalasana(e.target.value)}></input>
                        </label>
                        
                        <button onClick={() => {handleKirjautuminen() ; setKirjautumisForm(false) ; setEtusivuForm(true)}}>Kirjaudu</button>

                        <button onClick={() => {setKirjautumisForm(false) ; setRekisteroitymisForm(true)}}>Rekisteröidy</button>
                    </form>

                </div>

                : null
            }


            {
                rekisteroitymisForm ?

                <div>

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

                </div>

                : null
            }    

            {
                etusivuForm ?



                <div>

                    <h1>TERVETULOA {kirjautumisTunnus}</h1>


                    <form onSubmit={(e) => handleSubmit(e)}>

                        <label>

                            Etsi tietoja
                            <input type="text" onChange={(e) => setEtunimi(e.target.value)}></input>
    
                        </label>

                        <button onClick={() => {handleFetch()}}>Etsi</button>

                        <br></br>

                        <button onClick={() => {}}>Omat tiedot</button>

                        <br></br>

                        <button onClick={() => {setEtusivuForm(false) ; setKirjautumisForm(true)}}>Kirjaudu ulos</button>

                    </form>

                    <br></br>

                    <table>

                            <thead>

                                <tr>
                                    <th>Nimi</th>
                                    <th>Sukunimi</th>
                                    <th>Osoite</th>
                                    <th>Postinumero</th>
                                    <th>Postitoimipaikka</th>
                                </tr>
                            </thead>

                            <tbody>

                                {data}

                            </tbody>

                        </table>

                
                </div>

                
                



                : null
            }

            {
                muokkaaForm ? 

                <form onSubmit={(e) => handleSubmit(e)}>

                    <input type="text" onChange={(e) => setMuokkaaEtunimi(e.target.value)}></input>

                    <input type="text" onChange={(e) => setMuokkaaSukunimi(e.target.value)}></input>

                    <input type="text" onChange={(e) => setMuokkaaOsoite(e.target.value)}></input>

                    <input type="text" onChange={(e) => setMuokkaaPostinro(e.target.value)}></input>

                    <input type="text" onChange={(e) => setMuokkaaPostitmp(e.target.value)}></input>

                    <button onClick={() => {setMuokkaaForm(false) ; setEtusivuForm(true)}}>Peruuta</button>

                    <button onClick={() => {setMuokkaaForm(false) ; setMuokkaa(true) ; handleFetch() ; setEtusivuForm(true)}}>Tallenna</button>


                </form>


                : null
            }
                

            
            

            
            

        </div>
    );
}

export {
    
    Kirjautuminen
}

