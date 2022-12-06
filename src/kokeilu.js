import { useEffect, useInsertionEffect, useState } from "react"

const Kirjautuminen = () => {

    //Haku State muuttujat
    const [haeQuery,setHaeQuery] = useState("");
    const [tableTiedot,setTableTiedot] = useState([]);
    const [haeEtunimi,setHaeEtunimi] = useState("");
    const [haeSukunimi,setHaeSukunimi] = useState("");
    const [haeOsoite,setHaeOsoite] = useState("");
    const [haePostinro,setHaePostinro] = useState("");
    const [haePostitmp,setHaePostitmp] = useState("");
    
    //Formit
    const [muokkaaForm,setMuokkaaForm] = useState(false);
    const [lisaaForm,setLisaaForm] = useState(false);

    //Laskuri
    const [laskuri,setLaskuri] = useState(0);
    
    //Lisäämis State muuttujat
    const [lisaaNimi,setLisaaNimi] = useState("");
    const [lisaaSukunimi,setLisaaSukunimi] = useState("");
    const [lisaaOsoite,setLisaaOsoite] = useState("");
    const [lisaaPostinro,setLisaaPostinro] = useState("");
    const [lisaaPostitmp,setLisaaPostitmp] = useState("");
    const [lisaaQuery,setLisaaQuery] = useState("");

    //Delete State muuttujat
    const [poistaIidee,setPoistaIidee] = useState("");
    const [poistaLaskuri,setPoistaLaskuri] = useState(0);

    //Muokkaa State muuttujat
    const [muokkaaIidee,setMuokkaaIidee] = useState("");
    const [muokkaaEtunimi,setMuokkaaEtunimi] = useState("");
    const [muokkaaSukunimi,setMuokkaaSukunimi] = useState("");
    const [muokkaaOsoite,setMuokkaaOsoite] = useState("");
    const [muokkaaPostinro,setMuokkaaPostinro] = useState("");
    const [muokkaaPostitmp,setMuokkaaPostitmp] = useState("");
    const [muokkaaLaskuri,setMuokkaaLaskuri] = useState(0);
    const [etunimi,setEtunimi] = useState("");
    const [sukunimi,setSukunimi] = useState("");
    const [osoite,setOsoite] = useState("");
    const [postinro,setPostinro] = useState("");
    const [postitmp,setPostitmp] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    //Get metodi
    useEffect( () => {

        const haeTiedot = async () => {

            let response = await fetch("http://localhost:3004/asiakas" + haeQuery);

            let c = await response.json();

            console.log("Response.json() =" + c);

            setTableTiedot(c);

            c.map((item,index) => {

                   console.log(index,item);
            })

        }

        if (laskuri > 0) {

            haeTiedot();
        }

    },[laskuri]);

    //GET metodin handle
    const handleFetch = () => {

        let m = "";

        if (haeEtunimi == "" && haeSukunimi =="" && haeOsoite == "" && haePostinro == "" && haePostitmp == "") {
            m = ""
        }

        else if (haeEtunimi != "" && haeSukunimi != "" && haeOsoite !="" && haePostinro != "" && haePostitmp != "") {
            m = "?Etunimi=" + haeEtunimi + "&Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite + "&Postinro=" + haePostinro + "&Postitmp=" + haePostitmp;
        }

        else if (haeEtunimi != "" && haeSukunimi !="" && haeOsoite !="" && haePostinro !="" && haePostitmp == "") {
            m = "?Etunimi=" + haeEtunimi + "&Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite + "&Postinro=" + haePostinro;
        }

        else if (haeEtunimi != "" && haeSukunimi !="" && haeOsoite !="" && haePostinro =="" && haePostitmp == "") {
            m = "?Etunimi=" + haeEtunimi + "&Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite;
        }

        else if (haeEtunimi != "" && haeSukunimi !="" && haeOsoite =="" && haePostinro =="" && haePostitmp == "") {
            m = "?Etunimi=" + haeEtunimi + "&Sukunimi=" + haeSukunimi;
        }

        else if (haeEtunimi != "" && haeSukunimi =="" && haeOsoite =="" && haePostinro =="" && haePostitmp == "") {
            m = "?Etunimi=" + haeEtunimi;
        }

        else if (haeEtunimi == "" && haeSukunimi != "" && haeOsoite !="" && haePostinro != "" && haePostitmp != "") {
            m = "?Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite + "&Postinro=" + haePostinro + "&Postitmp=" + haePostitmp;
        }

        else if (haeEtunimi == "" && haeSukunimi != "" && haeOsoite !="" && haePostinro != "" && haePostitmp == "") {
            m = "?Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite + "&Postinro=" + haePostinro;
        }

        else if (haeEtunimi == "" && haeSukunimi != "" && haeOsoite !="" && haePostinro == "" && haePostitmp == "") {
            m = "?Sukunimi=" + haeSukunimi + "&Osoite=" + haeOsoite;
        }

        else if (haeEtunimi == "" && haeSukunimi != "" && haeOsoite =="" && haePostinro == "" && haePostitmp == "") {
            m = "?Sukunimi=" + haeSukunimi;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite !="" && haePostinro != "" && haePostitmp != "") {
            m = "?Osoite=" + haeOsoite + "&Postinro=" + haePostinro + "&Postitmp=" + haePostitmp;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite !="" && haePostinro != "" && haePostitmp == "") {
            m = "?Osoite=" + haeOsoite + "&Postinro=" + haePostinro;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite !="" && haePostinro == "" && haePostitmp == "") {
            m = "?Osoite=" + haeOsoite;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite =="" && haePostinro != "" && haePostitmp != "") {
            m = "?Postinro=" + haePostinro + "&Postitmp=" + haePostitmp;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite =="" && haePostinro != "" && haePostitmp == "") {
            m = "?Postinro=" + haePostinro;
        }

        else if (haeEtunimi == "" && haeSukunimi == "" && haeOsoite =="" && haePostinro == "" && haePostitmp != "") {
            m = "?Postitmp=" + haePostitmp;
        }

        setHaeQuery(m);

        console.log("HAE QUERY: " + haeQuery);

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
                <td><button id={item.Henk_ID} onClick={(e) => {setMuokkaaIidee(e.target.id) ; setMuokkaaForm(true) ; setEtunimi(item.Etunimi) ; setSukunimi(item.Sukunimi) ; setOsoite(item.Osoite) ; setPostinro(item.Postinro) ; setPostitmp(item.Postitmp) ; setMuokkaaEtunimi(item.Etunimi) ; setMuokkaaSukunimi(item.Sukunimi) ; setMuokkaaOsoite(item.Osoite) ; setMuokkaaPostinro(item.Postinro) ; setMuokkaaPostitmp(item.Postitmp)}}>Muokkaa</button></td>
                <td><button id={item.Henk_ID} onClick={(e) => {setPoistaIidee(e.target.id) ; setPoistaLaskuri(poistaLaskuri + 1)}}>Poista</button></td>
            </tr>
        );
    });

    //POST metodi
    useEffect( () => {

        const lisaaAsiakas = async () => {

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
                    Postitmp : lisaaPostitmp
                })
            });
        }

        console.log(lisaaQuery);

        if (lisaaQuery != "") {

            lisaaAsiakas();     
            
        }

        setLisaaQuery("");
        setLisaaNimi("");
        setLisaaSukunimi("");
        setLisaaOsoite("");
        setLisaaPostinro("");
        setLisaaPostitmp("");
        
    },[lisaaQuery]);

    const handlePost = () => {

        let m  = [];

        if (lisaaNimi != "") 
            m.push(lisaaNimi);

        if (lisaaSukunimi != "")
            m.push(lisaaSukunimi);

        if (lisaaOsoite != "")
            m.push(lisaaOsoite);

        if (lisaaPostinro != "") 
            m.push(lisaaPostinro);

        if (lisaaPostitmp != "") 
            m.push(lisaaPostitmp);

        setLisaaQuery(m);
        

        console.log("Handle post m listan tiedot:" + m);

    }

    //DELETE metodi
    useEffect( () => {

        const poistaAsiakas = async () => {

            fetch("http://localhost:3004/asiakas/" + poistaIidee, {
                method : 'DELETE'
            });
        }

        if (poistaLaskuri > 0) {
            poistaAsiakas();
        }

        
        
    },[poistaLaskuri]);

    //PUT metodi
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

        if (muokkaaLaskuri > 0) {

            muokkaaAsiakasta();
            
        }

       

    },[muokkaaLaskuri]);

    
    return (

        <div>

            <h1>TERVETULOA ASIAKASJUTTUUN!</h1>

            <form onSubmit={(e) => handleSubmit(e)}>

                <label>
                    Etunimi
                    <input type="text" onChange={(e) => setHaeEtunimi(e.target.value)}></input>
                </label>

                <label>
                    Sukunimi
                    <input type="text" onChange={(e) => setHaeSukunimi(e.target.value)}></input>
                </label>

                <label>
                    Osoite
                    <input type="text" onChange={(e) => setHaeOsoite(e.target.value)}></input>
                </label>

                <label>
                     Postinro
                    <input type="text" onChange={(e) => setHaePostinro(e.target.value)}></input>
                </label>

                <label>
                    Postitmp
                    <input type="text" onChange={(e) => setHaePostitmp(e.target.value)}></input>
                </label>

                <button onClick={() => {handleFetch()}}>Etsi Tiedot</button>
                <button onClick={() => {setLisaaForm(true)}}>Lisää tietoja</button>

            </form>

            {
                lisaaForm ?
                
                    <div>

                        <h2>Asiakkaiden lisäys</h2>

                        <form onSubmit={(e) => handleSubmit(e)}>

                            <label>
                                Etunimi
                                <input type="text" onChange={(e) => setLisaaNimi(e.target.value)}></input>
                            </label>

                            <label>
                                Sukunimi
                                <input type="text" onChange={(e) => setLisaaSukunimi(e.target.value)}></input>
                            </label>

                            <label>
                                Osoite
                                <input type="text" onChange={(e) => setLisaaOsoite(e.target.value)}></input>
                            </label>

                            <label>
                                Postinumero
                                <input type="text" onChange={(e) => setLisaaPostinro(e.target.value)}></input>
                            </label>

                            <label>
                                Postitmp
                                <input type="text" onChange={(e) => setLisaaPostitmp(e.target.value)}></input>
                            </label>

                            <button onClick={() => {handlePost() ; setLisaaForm(false)}}>Lisää asiakas</button>
                            <button onClick={() => {setLisaaForm(false)}}>Takaisin</button>
                        
                        </form>

                
                    </div>

                : null
            }

            {
                muokkaaForm ?

                    <div>

                        <h2>Asiakkaiden muokkaus</h2>

                        <form onSubmit={(e) => handleSubmit(e)}>

                            <label>
                                Etunimi
                                <input type="text" onChange={(e) => setMuokkaaEtunimi(e.target.value)} defaultValue={etunimi}></input>
                            </label>
                            
                            <label>
                                Sukunimi
                                <input type="text" onChange={(e) => setMuokkaaSukunimi(e.target.value)} defaultValue={sukunimi}></input>
                            </label>

                            <label>
                                Osoite
                                <input type="text" onChange={(e) => setMuokkaaOsoite(e.target.value)} defaultValue={osoite}></input>
                            </label>

                            <label>
                                Postinro
                                <input type="text" onChange={(e) => setMuokkaaPostinro(e.target.value)} defaultValue={postinro}></input>
                            </label>

                            <label>
                                Postitmp
                                <input type="text" onChange={(e) => setMuokkaaPostitmp(e.target.value)} defaultValue={postitmp}></input>
                            </label>

                            <button onClick={() => {setMuokkaaForm(false)}}>Peruuta</button>

                            <button onClick={() => {setMuokkaaForm(false) ; setMuokkaaLaskuri(muokkaaLaskuri + 1)}}>Tallenna</button>

                        </form>

                    </div>

                : null
            }

            <table>

                <thead>

                    <tr>
                        <th>Etunimi</th>
                        <th>Sukunimi</th>
                        <th>Osoite</th>
                        <th>Postinro</th>
                        <th>Postitmp</th>
                    </tr>

                </thead>

                <tbody>

                    {data}

                </tbody>

            </table>

        </div>
    );
}

export {
    
    Kirjautuminen
}

