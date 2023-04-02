import { ChangeEvent, useState } from 'react';

const MINISTRIES = [
  "Atalaia ",
  "Assistência ",
  "Boas Vindas ",
  "Bolinha ",
  "Cantina ",
  "Diaconia ",
  "Intercessão ",
  "Lojinha ",
  "Louvor ",
  "Zeladoria ",
];

const Ministerios = () => {
  const [ministries, setMinistries] = useState(
    MINISTRIES.map((ministry) => ({ ministry, value: 1 }))
  );

  const handleSelectValue = (index: number, event: ChangeEvent<HTMLSelectElement>) => {
    const newMinistries = [...ministries];
    newMinistries[index].value = parseInt(event.target.value);
    setMinistries(newMinistries);
  };

  return (
    <>
      {ministries.map((ministry, index) => (
        <div key={index}>
          <label>{ministry.ministry}</label>
          <select value={ministry.value} onChange={(event) => handleSelectValue(index, event)}>
            {[...Array(10)].map((_, value) => (
              <option key={value} value={value + 1}>{value}</option>
            ))}
          </select>
        </div>
      ))}
    </>
  );
};

export default Ministerios;