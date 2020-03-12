import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const encriptarURL = 'http://10.6.1.110:7011/secureDataWeb/rest/secureData/encrypt'
  const desEncriptarURL = 'http://10.6.1.110:7011/secureDataWeb/rest/secureData/decrypt'

  const [numTarjeta, setTarjeta] = useState('')
  const [datoEncrypt, setEncrypt] = useState('')
  const [datoDesEnc, setDesenc] = useState(null)

  const enviarServicioEncriptacion = async () => {
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
    setDesenc('')
    setEncrypt('')
    setDesenc('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="formulario">
          <p>
            Capture el número de tarjeta en la casilla y observe el resultado de encriptación y desencriptación...
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
        Made with love with <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
