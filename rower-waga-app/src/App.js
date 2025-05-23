import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialComponents = [
  { name: "Rama (AliExpress)", weight: 1680 },
  { name: "Koła Accent Race (komplet)", weight: 2198 },
  { name: "Amortyzator RockShox Recon Silver RL", weight: 1950 },
  { name: "Sztyca PRO LT", weight: 285 },
  { name: "Kierownica Race Face Aeffect R", weight: 350 },
  { name: "Mostek Race Face Aeffect R", weight: 170 },
  { name: "Suport SRAM DUB", weight: 90 },
  { name: "Korby SRAM NX", weight: 700 },
  { name: "Manetka Shimano SL-M5100", weight: 120 },
  { name: "Przerzutka Shimano RD-M5100", weight: 320 },
  { name: "Stery FSA NO.53", weight: 100 },
  { name: "Łańcuch KMC X11", weight: 270 },
  { name: "Kaseta Shimano CS-M5100", weight: 595 },
  { name: "Opony Maxxis Forekaster (2x)", weight: 1450 },
  { name: "Pedały SPD Shimano", weight: 380 },
  { name: "Siodełko Italia X1", weight: 300 },
  { name: "Hamulce Shimano MT200 (komplet)", weight: 600 },
  { name: "Tarcze hamulcowe (2x)", weight: 250 },
  { name: "Drobne elementy (linki, pancerze itd.)", weight: 300 },
];

export default function RowerWagaApp() {
  const [components, setComponents] = useState(initialComponents);

  const updateWeight = (index, newWeight) => {
    const updated = [...components];
    updated[index].weight = parseFloat(newWeight) || 0;
    setComponents(updated);
  };

  const totalWeight = components.reduce((sum, comp) => sum + comp.weight, 0);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Kalkulator wagi roweru</h1>
      {components.map((comp, index) => (
        <Card key={index} className="mb-2">
          <CardContent className="flex items-center justify-between p-4">
            <Label className="w-2/3">{comp.name}</Label>
            <Input
              type="number"
              className="w-1/3"
              value={comp.weight}
              onChange={(e) => updateWeight(index, e.target.value)}
            />
          </CardContent>
        </Card>
      ))}
      <div className="text-xl font-semibold text-right mt-4">
        Łączna masa: {(totalWeight / 1000).toFixed(2)} kg
      </div>
    </div>
  );
}
