import { useState } from "react";

const componentDatabase = {
  "Ramy": {
    "Canyon Spectral AL 5": 3100,
    "Trek Fuel EX 5": 2800,
    "Specialized Stumpjumper": 2900,
    "Santa Cruz Hightower": 3200,
    "Giant Trance 29": 2950,
    "Yeti SB140": 3050,
    "Scott Spark RC": 2750,
    "Orbea Oiz": 2650,
    "Commencal Meta TR": 3150,
    "Pivot Switchblade": 3000,
    "Norco Sight": 3100,
    "Ibis Ripmo": 2950,
    "YT Izzo": 2850,
    "Kona Process 134": 2900,
    "Rocky Mountain Instinct": 3000,
    "Cannondale Habit": 2850,
    "Marin Rift Zone": 2750,
    "Polygon Siskiu T7": 2700,
    "Radon Slide": 2800,
    "Ghost Lector": 2650
  },
  "Amortyzatory": {
    "RockShox Pike Ultimate": 1850,
    "Fox 34 Float": 1560,
    "RockShox SID SL Ultimate": 1250,
    "Fox 38 Factory": 2100,
    "Öhlins RXF 36": 1980,
    "Marzocchi Bomber Z1": 1950,
    "DVO Diamond": 1850,
    "Manitou Mezzer Pro": 1900,
    "Cane Creek Helm": 1800,
    "EXT Era": 1750,
    "X-Fusion Metric": 1700,
    "MRP Ribbon": 1850,
    "BOS Forix": 1950,
    "Push ElevenSix": 2050,
    "Formula Mod": 1650,
    "DT Swiss F535": 1750,
    "SR Suntour Durolux": 1800,
    "Magura Vyron": 1550,
    "BikeYoke Divine": 1850,
    "Ohlins TTX22M": 1900
  },
  // ... (Podobnie dla innych kategorii: Koła, Napęd, Hamulce itd.)
};

export default function RowerWagaApp() {
  const [components, setComponents] = useState([]);
  const [newComponent, setNewComponent] = useState({ 
    name: "", 
    weight: "", 
    category: Object.keys(componentDatabase)[0] 
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleCategoryChange = (category) => {
    setNewComponent({ ...newComponent, category, name: "", weight: "" });
    setSuggestions([]);
  };

  const handleNameChange = (value) => {
    setNewComponent({ ...newComponent, name: value });
    
    if (value.length > 1) {
      const matched = Object.keys(componentDatabase[newComponent.category])
        .filter(name => name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);
      setSuggestions(matched);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion) => {
    setNewComponent({
      ...newComponent,
      name: suggestion,
      weight: componentDatabase[newComponent.category][suggestion] || ""
    });
    setSuggestions([]);
  };

  const addComponent = () => {
    if (newComponent.name && newComponent.weight) {
      setComponents([
        ...components,
        {
          name: `${newComponent.category}: ${newComponent.name}`,
          weight: parseFloat(newComponent.weight) || 0
        }
      ]);
      setNewComponent({ ...newComponent, name: "", weight: "" });
    }
  };

  const removeComponent = (index) => {
    const updated = components.filter((_, i) => i !== index);
    setComponents(updated);
  };

  const totalWeight = components.reduce((sum, comp) => sum + comp.weight, 0);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
        🚴 Kalkulator wagi roweru 🚴
      </h1>

      <div style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <select 
          value={newComponent.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px' }}
        >
          {Object.keys(componentDatabase).map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <div style={{ position: 'relative' }}>
          <input
            type="text"
            placeholder={`Wyszukaj ${newComponent.category.toLowerCase()}...`}
            value={newComponent.name}
            onChange={(e) => handleNameChange(e.target.value)}
            style={{ width: '100%', padding: '8px', borderRadius: '4px' }}
          />
          {suggestions.length > 0 && (
            <ul style={{
              position: 'absolute',
              zIndex: 100,
              background: 'white',
              border: '1px solid #ddd',
              width: '100%',
              marginTop: '2px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              {suggestions.map((item, i) => (
                <li 
                  key={i}
                  style={{ 
                    padding: '8px', 
                    cursor: 'pointer', 
                    borderBottom: '1px solid #eee',
                    ':hover': { background: '#f5f5f5' }
                  }}
                  onClick={() => selectSuggestion(item)}
                >
                  {item} <span style={{ float: 'right', color: '#666' }}>
                    {componentDatabase[newComponent.category][item]}g
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <input
          type="number"
          placeholder="Waga (g)"
          value={newComponent.weight}
          onChange={(e) => setNewComponent({...newComponent, weight: e.target.value})}
          style={{ padding: '8px', borderRadius: '4px' }}
        />

        <button 
          onClick={addComponent}
          style={{ 
            padding: '10px', 
            background: '#4CAF50', 
            color: 'white', 
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Dodaj część
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {components.map((comp, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px',
              borderBottom: '1px solid #eee'
            }}
          >
            <div>
              <div style={{ fontWeight: 'bold' }}>{comp.name.split(':')[1]}</div>
              <div style={{ fontSize: '0.8em', color: '#666' }}>
                {comp.name.split(':')[0]} • {comp.weight}g
              </div>
            </div>
            <button 
              onClick={() => removeComponent(index)}
              style={{ 
                background: '#f44336', 
                color: 'white', 
                border: 'none',
                borderRadius: '4px',
                padding: '5px 10px',
                cursor: 'pointer'
              }}
            >
              Usuń
            </button>
          </div>
        ))}
      </div>

      {components.length > 0 && (
        <div style={{ 
          marginTop: '20px',
          padding: '15px',
          background: '#f8f9fa',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          Łączna waga: {(totalWeight / 1000).toFixed(2)} kg
        </div>
      )}
    </div>
  );
}
