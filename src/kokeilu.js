import { useEffect, useState } from "react"

const Asiakas = () => {

    const [nimi,setNimi] = useState("");

    const [osoite,setOsoite] = useState("");

    const [query,setQuery] = useState("");

    const [asiakkaat,setAsiakkaat] = useState([]);

    const [tyyppi,setTyyppi] = useState("0");

    const [laskuri,setLaskuri] = useState(0);

    useEffect( () => {

        //console.log("useEffectiin menty, jossa haetaan asiakkaat");

        const fetchAsiakkaat = async () => {

            //console.log("Fetch asiakkaat alkaa...");

            let response = await fetch("http://localhost:3004/asiakas/" + query);

            //console.log("Fetch called...", response);

            let c = await response.json();

            console.log(c);

            setAsiakkaat(c);
            
        }

        if (laskuri > 0) {

            fetchAsiakkaat();
            
        }

    },[laskuri]);


    const handleFetch = () => {

        let m = "";

        if (nimi == "" && osoite == "" && tyyppi == "0") {
            m = "";
            
        }

        else if (nimi != "" && osoite != "" && tyyppi =="") {
            m = m = "?nimi=" + nimi + "&osoite=" + osoite + "&tyyppi_id=" + tyyppi;
            
        }

        else if (nimi != "" && osoite != "") {
            m = "?nimi=" + nimi + "&osoite=" + osoite;
            
        }
        
        else if (nimi != "") {
            m = "?nimi=" + nimi;
            
        }

        else if (osoite != "") {
            m = "?osoite=" + osoite;
            
        }

        else if (tyyppi != "") {
            m = "?tyyppi_id=" + tyyppi;
            
        }

        setQuery(m);

    }
    
    const data = asiakkaat.map((item,index) => {

        return (
            <tr key={index}>
                <td>{item.AVAIN}</td>
                <td>{item.NIMI}</td>
                <td>{item.OSOITE}</td>
                <td>{item.POSTINRO}</td>
                <td>{item.POSTITMP}</td>
            </tr>
        );
    });


    const handleSubmit = (event) => {
        event.preventDefault();
    }


    return (

        <div>

            <form onSubmit={(e) => handleSubmit(e)}>

                <label>
                    Nimi:
                    <input type="text" data-testid="nameInput" onChange={(e) => setNimi(e.target.value)}></input>
                </label>

                <label>
                    Osoite:
                    <input type="text" data-testid="addressInput" onChange={(e) => setOsoite(e.target.value)}></input>
                </label>

                <button data-testid="searchButton" onClick={() => {setLaskuri(laskuri + 1) ; handleFetch()}}>Hae</button>

                <label>
                    Asiakastyypit:
                    <select data-testid="customertypeSelect" onChange={(e) => setTyyppi(e.target.value)}>
                        <option data-testid="customertypeOption" value="0">Valitse</option>
                        <option data-testid="customertypeOption" value="1">1</option>
                        <option data-testid="customertypeOption" value="2">2</option>
                        <option data-testid="customertypeOption" value="3">3</option>
                    </select>
                </label>

                

            </form>

            
            <table>

                <thead>

                    {
                        asiakkaat.length != 0 ?

                        <tr>
                            <th>Id</th>
                            <th>Nimi</th>
                            <th>Osoite</th>
                            <th>Postinumero</th>
                            <th>Postitoimipaikka</th>
                        </tr>

                        : null
                    }
                        
                </thead>

                <tbody>

                    {data}

                </tbody>

            </table>

                
            

        </div>
    )
}

export {
    Asiakas
}