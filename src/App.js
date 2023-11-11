import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Axios from 'axios';
import './App.css';
import NavBar from './NavBar';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noticias, setNoticia] = useState([]);
  const [nombre_noticia, setNombreNoticia] = useState('');
  const [zona, setZona] = useState('');
  const [detalles, setDetalles] = useState('');
  const [imagen, setImagen] = useState('');
  const [autor, setAutor] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  const addNoticia = () => {
    Axios.post('http://localhost:3001/noticias', {
      nombre_noticia,
      zona,
      detalles,
      imagen,
      autor,
      fechaHora,
    })
      .then(() => {
        getNoticias();
        alert('Noticia registrada');

        setNombreNoticia('');
        setZona('');
        setDetalles('');
        setImagen('');
        setAutor('');
        setFechaHora('');
      })
      .catch((error) => {
        alert('Error al registrar la noticia');

        console.error('Error:', error);
      });
  };

  const getNoticias = () => {
    Axios.get('http://localhost:3001/noticias')
      .then((response) => {
        setNoticia(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const performSearch = () => {
    setLoading(true);
    setError(null);

    Axios.get(`http://localhost:3001/noticias?zona=${zona}`)
      .then((response) => {
        setSearchResults(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('Hubo un error al cargar los datos.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getNoticias();
  }, []);

  const renderNoticias = () => {
    const noticiasChunks = [];
    const chunkSize = 3;

    for (let i = 0; i < searchResults.length; i += chunkSize) {
      noticiasChunks.push(searchResults.slice(i, i + chunkSize));
    }

    return noticiasChunks.map((chunk, index) => (
      <div key={index} className="CardContainer">
        {chunk.map((result) => (
          <div key={result.id_noticia} className="Card">
            <h2>{result.nombre_noticia}</h2>
            <p>{result.zona}</p>
            <p>{result.detalles}</p>
            <img src={result.imagen} alt={result.nombre_noticia} />
            <p>{result.autor}</p>
            <p>{result.fechaHora}</p>
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div className="App">
      <Router>
        <header>
          <NavBar onSearch={performSearch} zona={setZona} />
          <h1>NewsHub</h1>
        </header>
        <h5>Mantente al tanto de las noticias más recientes.</h5>

        <main>
          {loading && <p>Cargando...</p>}
          {error && <p>{error}</p>}
          {renderNoticias()}
        </main>

       {/*  <section className="add-noticia-section">
          <h2>Agregar Noticia</h2>
          <p>¡Registra tu noticia para que todos la conozcan!</p>
          <form onSubmit={addNoticia}>
            <label>
              Nombre de la Noticia:
              <input
                type="text"
                value={nombre_noticia}
                onChange={(e) => setNombreNoticia(e.target.value)}
              />
            </label>
            <label>
              Zona:
              <input
                type="text"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
              />
            </label>
            <label>
              Detalles:
              <textarea
                value={detalles}
                onChange={(e) => setDetalles(e.target.value)}
              />
            </label>
            <label>
              Imagen URL:
              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
              />
            </label>
            <label>
              Autor:
              <input
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
              />
            </label>
            <label>
              Fecha y Hora:
              <input
                type="text"
                value={fechaHora}
                onChange={(e) => setFechaHora(e.target.value)}
              />
            </label>
            <button type="submit">Agregar Noticia</button>
            <p>Recuerda escribir con el debido respeto y hacer un sitio mejor de noticias.</p>
          </form>
        </section> */}
      </Router>
    </div>
  );
};

export default App;
