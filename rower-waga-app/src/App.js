import { useState } from "react";
import { 
  Card, 
  CardContent, 
  TextField, 
  InputLabel, 
  Button, 
  Select, 
  MenuItem,
  Box,
  Typography
} from "@mui/material";

const componentDatabase = {
  // ... (zachowaj swoją istniejącą bazę danych komponentów)
};

export default function RowerWagaApp() {
  // ... (zachowaj wszystkie swoje istniejące funkcje stanu i pomocnicze)

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        🚴 Kalkulator wagi roweru 🚴
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Select
          value={newComponent.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {Object.keys(componentDatabase).map(category => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>

        <Box sx={{ position: 'relative' }}>
          <TextField
            fullWidth
            placeholder={`Wyszukaj ${newComponent.category.toLowerCase()}...`}
            value={newComponent.name}
            onChange={(e) => handleNameChange(e.target.value)}
          />
          {/* ... (zachowaj logikę sugestii) */}
        </Box>

        <TextField
          type="number"
          placeholder="Waga (g)"
          value={newComponent.weight}
          onChange={(e) => setNewComponent({...newComponent, weight: e.target.value})}
        />

        <Button 
          variant="contained" 
          color="primary"
          onClick={addComponent}
        >
          Dodaj część
        </Button>
      </Box>

      <Box sx={{ mt: 4 }}>
        {components.map((comp, index) => (
          <Card key={index} sx={{ mb: 1 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontWeight="bold">{comp.name.split(':')[1]}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {comp.name.split(':')[0]} • {comp.weight}g
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                color="error"
                onClick={() => removeComponent(index)}
              >
                Usuń
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {components.length > 0 && (
        <Box sx={{ 
          mt: 4,
          p: 3,
          bgcolor: 'background.default',
          borderRadius: 1,
          textAlign: 'center'
        }}>
          <Typography variant="h6">
            Łączna waga: {(totalWeight / 1000).toFixed(2)} kg
          </Typography>
        </Box>
      )}
    </Box>
  );
}
