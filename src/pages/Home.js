import React, { useState, useEffect } from "react";

import { getAddress, getWeather } from "../services/axios";
import types from "../constants/types";
import Button from "@material-ui/core/Button";
import RefreshIcon from "@material-ui/icons/Refresh";
import styled from "styled-components";
import { FormControlLabel, Switch } from "@material-ui/core";
import MyLocal from "../assets/images/myLocation.png";

//Mapa
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";
//Mapa

//Estilização com Styled Component
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: #fff;
    font-size: 45px;
  }
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 50%;
  padding: 2%;
  margin-top: 2%;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.363);
  font-family: "Ubuntu";
  font-size: 18px;

  p {
    font-weight: bold;

    @media (max-width: 768px) {
      padding: 5%;
    }
  }

  h2 {
    @media (max-width: 768px) {
      padding: 5%;
    }
  }

  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Imagem = styled.div`
  display: flex;
  justify-content: center;

  img {
    width: 80%;
  }
`;
const MapsPoints = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Maps = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-size: 16px;
    font-weight: normal;
  }
  .search {
    width: 100%;
    max-width: 50%;
    display: flex;
    justify-content: center;
    margin-right: 20px;
    margin-bottom: 10px;
  }

  .search input {
    padding: 0.5rem;
    font-size: 1.5rem;
    width: 100%;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }

  .locate {
    background: none;
    border: none;
  }
  .locate img {
    width: 45px;
    cursor: pointer;
    margin: 20%;
  }
`;

function Home() {
  const [location, setLocation] = useState(false);
  const [myLocation, setMyLocation] = useState("");
  const [weather, setWeather] = useState(false);
  const [address, setAddress] = useState(false);
  const [option, setOption] = useState(false);
  const [stateMap, setStateMap] = useState({
    checked: false,
  });

  const handleChange = (event) => {
    setStateMap({ ...stateMap, [event.target.name]: event.target.checked });
  };

  //Relógio
  setInterval(function () {
    try {
      let novaHora = new Date();
      let hora = novaHora.getHours();
      let minuto = novaHora.getMinutes();
      let segundo = novaHora.getSeconds();
      minuto = zero(minuto);
      segundo = zero(segundo);
      document.getElementById("hora").textContent =
        hora + ":" + minuto + ":" + segundo;
    } catch (error) {
      console.log(error);
    }
  }, 1000);
  function zero(x) {
    if (x < 10) {
      x = "0" + x;
    }
    return x;
  }

  //Mapa
  const libraries = useState(["places"]);
  const mapContainerStyle = {
    width: "50%",
    height: "50%",
  };
  const options = {
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat: myLocation.latitude,
    lng: myLocation.longitude,
  };
  useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    getNewLocation(lat, lng);
    window.scrollTo(0, 100);
  }, []);
  //Mapa

  function getNewLocation(lat, lng) {
    getWeather(lat, lng).then((doc) => {
      setWeather(doc.weather[0]);
      setOption(doc.main);
    });

    getAddress(lat, lng).then((data) =>
      setAddress(data.data.results[0].formatted_address)
    );
  }

  useEffect(() => {
    //Pegando a localização atual
    navigator.geolocation.getCurrentPosition((position) => {
      //Confirmando que sua localização foi pega
      setLocation(true);
      setMyLocation(position?.coords);

      //Pegando os dados meteorólogicos da sua coordenada
      getWeather(position?.coords.latitude, position?.coords.longitude).then(
        (doc) => {
          setWeather(doc.weather[0]);
          setOption(doc.main);
        }
      );

      //Pegando seu endereço com as coordenadas
      getAddress(
        position?.coords.latitude,
        position?.coords.longitude
      ).then((data) => setAddress(data.data.results[0].formatted_address));
    });
  }, []);

  return (
    <Container>
      <h1>Climão </h1>

      {/* Se tiver a localização e os dados meteorológicos mostra essa Section */}
      {location && weather ? (
        <Section>
          <h2>Como está o tempo? {weather.description}!</h2>
          <Imagem>
            <img src={types[weather.id]} alt="weather" />
          </Imagem>

          {/* Mostrar a hora do relógio na tela */}
          <h2 id="hora">.</h2>
          <h5 style={{ marginTop: "-2%" }}>Hora local</h5>

          <p>Seu endereço: {address}</p>

          {/* Botão para dar um refresh na página */}
          <Button
            variant="contained"
            color="default"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
          >
            Atualizar
          </Button>
          <ul>
            <li>Temperatura atual: {option.temp}°</li>
            <li>Temperatura máxima: {option.temp_max}°</li>
            <li>Temperatura minima: {option.temp_min}°</li>
            <li>Pressão: {option.pressure} hpa</li>
            <li>Humidade: {option.humidity}%</li>
          </ul>

          <FormControlLabel
            value="start"
            control={
              <Switch
                checked={stateMap.checked}
                onChange={handleChange}
                name="checked"
                color="primary"
              />
            }
            label="Quer ver a meteorologia de outro lugar?"
            labelPlacement="start"
          />

          {stateMap.checked && (
            <Maps>
              <MapsPoints>
                <Search panTo={panTo} />
                <Locate panTo={panTo} />
              </MapsPoints>

              <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={options}
                onLoad={onMapLoad}
              ></GoogleMap>
            </Maps>
          )}
        </Section>
      ) : (
        // Essa Section só mostra se não tiver a localização ou o endereço
        <Section>
          <h3>Aceite a permissão para verificar a meteorologia </h3>
          <Button
            variant="contained"
            color="default"
            startIcon={<RefreshIcon />}
            onClick={() => window.location.reload()}
          >
            Atualizar
          </Button>
        </Section>
      )}
    </Container>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src={MyLocal} alt="location" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Procure um local"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Home;
