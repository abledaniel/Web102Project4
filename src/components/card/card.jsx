import React, { useState, useEffect } from 'react';
import './card.css'; 
import BanList from '../ban/ban.jsx'; 

const DogApp = () => {
  const [dogData, setDogData] = useState([]);
  const [banList, setBanList] = useState([]);
  const apiKey = "REMOVED";

  const fetchRandomDog = async () => {
    let data;
    do {
      const response = await fetch(`https://api.thedogapi.com/v1/images/search?limit=1&api_key=${apiKey}`);
      data = await response.json();
    } while (
      banList.includes(data[0]?.breeds[0]?.name) || 
      !isValidDogData(data[0]) || 
      isBreedGroupBanned(data[0]) 
    );
    setDogData(data[0]);
  };

  const isValidDogData = (data) => {
    return (
      data &&
      data.breeds &&
      data.breeds.length > 0 &&
      data.breeds[0]?.breed_group &&
      data.breeds[0]?.weight?.imperial &&
      data.breeds[0]?.bred_for &&
      data.breeds[0]?.life_span
    );
  };

  const isBreedGroupBanned = (data) => {
    const breedGroup = data?.breeds[0]?.breed_group;
    return banList.some(bannedWord => breedGroup.includes(bannedWord));
  };

  useEffect(() => {
    fetchRandomDog(); 
  }, []);

  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList([...banList, attribute]);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">Veni Vici!</h1>
      <p className="subtitle">Discover dogs from your wildest dreams! 🐶🐕🐾</p>

      {dogData?.breeds && (
        <div className="dog-card">
          <h2>{dogData.breeds[0]?.name || 'Doggo'}</h2>
          <div className="attributes">
            <button onClick={() => addToBanList(dogData?.breeds[0]?.breed_group)}>
              {dogData.breeds[0]?.breed_group}
            </button>
            <button>
              {dogData.breeds[0]?.weight?.imperial} lbs
            </button>
            <button>
              {dogData.breeds[0]?.bred_for}
            </button>
            <button>{dogData.breeds[0]?.life_span} years</button>
          </div>
          <img src={dogData.url} alt="A cute dog" className="dog-image" />
        </div>
      )}

      <button className="discover-button" onClick={fetchRandomDog}>
        Discover!
      </button>

      <BanList banList={banList} />
    </div>
  );
};

export default DogApp;
