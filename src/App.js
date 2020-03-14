import React, {useState, useEffect} from 'react';
import logoColor from './thundercats-logo-red.png'
import './App.css';

function App() {
  const encriptarURL = 'http://10.6.1.110:7011/secureDataWeb/rest/secureData/encrypt'
  const desEncriptarURL = 'http://10.6.1.110:7011/secureDataWeb/rest/secureData/decrypt'

  const [numTarjeta, setTarjeta] = useState('')
  const [datoEncrypt, setEncrypt] = useState('')
  const [datoDesEnc, setDesenc] = useState(null)
  const [opacidad, setOpacidad] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setOpacidad(false)
    }, 19000);
  })

  const enviarServicioEncriptacion = async () => {
    if (numTarjeta === '') return
    const dataParaEncriptar = {
      data: numTarjeta,
      key: 'mx.com.findep.secureData.key'
    }
    const datosEncriptados = await fetch(`${encriptarURL}`, {
      method: "POST",
      body: JSON.stringify(dataParaEncriptar),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(response => {
      console.log('response', response)
      return response;
    })
    .catch(error => console.error('Error:', error))

    console.log('datosEncriptados', datosEncriptados)
    setEncrypt(datosEncriptados.payload.data)

    // //Lamar al servicio de desencriptación
    // const dataParaDesEncrypt = {
    //   data: datosEncriptados.payload.data,
    //   key: 'mx.com.findep.secureData.key'
    // }

    // const datosDesEncrypt = await fetch(`${desEncriptarURL}`, {
    //   method: "POST",
    //   body: JSON.stringify(dataParaDesEncrypt),
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    // }).then(res => res.json())
    // .then(response => {
    //   return response;
    // })
    // .catch(error => console.error('Error:', error))
    // setDesenc(datosDesEncrypt.payload.data)

  };

  const desencriptarValor = async () => {
    if (datoEncrypt === '') return
    setDesenc('')
    const dataParaDesEncrypt = {
      data: datoEncrypt,
      key: 'mx.com.findep.secureData.key'
    }

    const datosDesEncrypt = await fetch(`${desEncriptarURL}`, {
      method: "POST",
      body: JSON.stringify(dataParaDesEncrypt),
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => res.json())
    .then(response => {
      return response;
    })
    .catch(error => console.error('Error:', error))
    setDesenc(datosDesEncrypt.payload.data)
  }

  const limpiarCampos = () => {
    setTarjeta('')
    setDesenc('')
    setEncrypt('')
    setDesenc('')
  }

  const modal = opacidad ? '0' : '1'
  const video = opacidad ? '1' : '0'

  return (
    <div style={{backgroundColor: 'black'}}>
      <div className="video-background" style={{opacity: video}}>
        <div style={{ position: 'absolute', zIndex: '40'}} onClick={() => {setOpacidad(false)}}> Saltar Intro</div>
        <div className="video-foreground">
          <iframe width="560" height="315" title="Thundercats" src="https://www.youtube.com/embed/HcGNqrAtsgg?autoplay=1&start=0&end=19&loop=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
      <div className="App" style={{opacity: modal}}>
        <header className="App-header">
          <div className="container_form">
            <div className="formulario">
              <p>
                Encriptación
              </p>
              <br/>
              <label>Número Tarjeta   </label>
              <input value={numTarjeta} className="input_field" onChange={event => setTarjeta(event.target.value)} />
              <button onClick={() => {enviarServicioEncriptacion()}}>Encriptar</button>
              <br/>
              <p>
                Valor Encriptado: {datoEncrypt}
              </p>
              <label>Desencriptar   </label>
              <input value={datoEncrypt} className="input_field" onChange={event => setEncrypt(event.target.value)} />
              <button onClick={() => {desencriptarValor()}}>Desencriptar</button>
              <p>
                Valor desencriptado: {datoDesEnc}
              </p>
              <button onClick={() => {limpiarCampos()}}>Limpiar campos</button>
            </div>
          </div>
          Made with love by <img src={logoColor} className="App-logo" alt="logo" />
        </header>
      </div>
    </div>
  );
}

export default App;
