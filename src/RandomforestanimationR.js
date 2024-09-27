import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RandomForestAnimation = () => {
  const [step, setStep] = useState(0);
  const [selectedTree, setSelectedTree] = useState(null);
  const [inputData, setInputData] = useState({
    size: 1500,
    bedrooms: 3,
    age: 10,
    location: 7,
  });
  const [prediction, setPrediction] = useState(null);
  const totalSteps = 5;

  const steps = [
    { 
      title: "Conjunto de datos", 
      content: "Datos de entrenamiento con múltiples características de casas",
      icon: "📊"
    },
    { 
      title: "Muestreo aleatorio", 
      content: "Selección aleatoria de subconjuntos de datos y características",
      icon: "🔀"
    },
    { 
      title: "Construcción de árboles", 
      content: "Creación de múltiples árboles de regresión",
      icon: "🌳"
    },
    { 
      title: "Predicciones individuales", 
      content: "Cada árbol realiza una predicción sobre el precio de la casa",
      icon: "🔮"
    },
    { 
      title: "Agregación de resultados", 
      content: "Promedio de las predicciones para obtener el precio final estimado",
      icon: "🎯"
    }
  ];

  const sampleData = [
    { id: 1, size: 1200, bedrooms: 3, age: 5, location: 8, price: 250000 },
    { id: 2, size: 1800, bedrooms: 4, age: 15, location: 6, price: 320000 },
    { id: 3, size: 1500, bedrooms: 3, age: 10, location: 7, price: 280000 },
    { id: 4, size: 2200, bedrooms: 5, age: 2, location: 9, price: 450000 },
    { id: 5, size: 1000, bedrooms: 2, age: 20, location: 5, price: 180000 },
  ];

  const nextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, totalSteps - 1));
  };

  const handleTreeClick = (treeId) => {
    setSelectedTree(treeId);
  };

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulamos predicciones de 5 árboles
    const treePredictions = Array(5).fill().map(() => 
      Math.round((200000 + Math.random() * 100000 + 
        inputData.size * 100 + 
        inputData.bedrooms * 10000 - 
        inputData.age * 1000 + 
        inputData.location * 5000) / 1000) * 1000
    );
    const averagePrediction = Math.round(treePredictions.reduce((a, b) => a + b) / treePredictions.length);
    
    setPrediction({
      trees: treePredictions.map((pred, index) => ({ id: index + 1, prediction: pred })),
      finalPrediction: averagePrediction
    });
    setStep(2);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-3xl font-bold text-center text-blue-600">Animación de Random Forest: Predicción de Precios de Casas</h2>
      
      <div className="flex items-center justify-center space-x-4">
        <span className="text-4xl">{steps[step].icon}</span>
        <div>
          <h3 className="text-xl font-semibold">{steps[step].title}</h3>
          <p className="mt-2 text-gray-600">{steps[step].content}</p>
        </div>
      </div>

      {step === 0 && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Dataset de ejemplo: Precios de Casas</h4>
            <p>El dataset contiene las siguientes características:</p>
            <ul className="list-disc list-inside">
              <li>Tamaño (pies cuadrados)</li>
              <li>Número de dormitorios</li>
              <li>Edad de la casa (años)</li>
              <li>Ubicación (escala del 1 al 10)</li>
              <li>Precio (USD)</li>
            </ul>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">ID</th>
                  <th className="py-2 px-4 border-b">Tamaño</th>
                  <th className="py-2 px-4 border-b">Dormitorios</th>
                  <th className="py-2 px-4 border-b">Edad</th>
                  <th className="py-2 px-4 border-b">Ubicación</th>
                  <th className="py-2 px-4 border-b">Precio</th>
                </tr>
              </thead>
              <tbody>
                {sampleData.map((row) => (
                  <tr key={row.id}>
                    <td className="py-2 px-4 border-b">{row.id}</td>
                    <td className="py-2 px-4 border-b">{row.size}</td>
                    <td className="py-2 px-4 border-b">{row.bedrooms}</td>
                    <td className="py-2 px-4 border-b">{row.age}</td>
                    <td className="py-2 px-4 border-b">{row.location}</td>
                    <td className="py-2 px-4 border-b">${row.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size">Tamaño (pies cuadrados)</Label>
              <Input
                type="number"
                name="size"
                value={inputData.size}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="bedrooms">Número de dormitorios</Label>
              <Input
                type="number"
                name="bedrooms"
                value={inputData.bedrooms}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="age">Edad de la casa (años)</Label>
              <Input
                type="number"
                name="age"
                value={inputData.age}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="location">Ubicación (1-10)</Label>
              <Input
                type="number"
                min="1"
                max="10"
                name="location"
                value={inputData.location}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Predecir Precio</Button>
        </form>
      )}

      {prediction && (
        <div className="mt-6 space-y-4">
          <h4 className="text-lg font-semibold mb-2">Árboles de regresión:</h4>
          <div className="flex justify-center space-x-2">
            {prediction.trees.map((tree) => (
              <Button
                key={tree.id}
                onClick={() => handleTreeClick(tree.id)}
                className={`p-2 ${selectedTree === tree.id ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                🌳
              </Button>
            ))}
          </div>
          {selectedTree && (
            <p className="mt-2 text-center">
              Árbol {selectedTree} predice: ${prediction.trees.find(t => t.id === selectedTree).prediction.toLocaleString()}
            </p>
          )}
          <div className="mt-4 p-4 bg-yellow-100 rounded-lg">
            <h4 className="text-lg font-semibold mb-2">Predicción final:</h4>
            <p>Basado en el promedio de las predicciones, el precio estimado de la casa es: <strong>${prediction.finalPrediction.toLocaleString()}</strong></p>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <span className="text-sm text-gray-500">Paso {step + 1} de {totalSteps}</span>
        <Button onClick={nextStep} className="bg-blue-500 hover:bg-blue-600 text-white">
          Siguiente ➡️
        </Button>
      </div>
    </div>
  );
};

export default RandomForestAnimation;
