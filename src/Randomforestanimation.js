import React, { useState } from 'react';
import { Button, TextField, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stepper, Step, StepLabel } from '@mui/material';

const RandomForestAnimation = () => {
  const [step, setStep] = useState(0);
  const [selectedTree, setSelectedTree] = useState(null);
  const [inputData, setInputData] = useState({
    sepalLength: 5.1,
    sepalWidth: 3.5,
    petalLength: 1.4,
    petalWidth: 0.2,
  });
  const totalSteps = 5;

  const steps = [
    { 
      title: "Conjunto de datos", 
      content: "Datos de entrenamiento con múltiples características de flores Iris",
      icon: "📊"
    },
    { 
      title: "Muestreo aleatorio", 
      content: "Selección aleatoria de subconjuntos de datos y características",
      icon: "🔀"
    },
    { 
      title: "Construcción de árboles", 
      content: "Creación de múltiples árboles de decisión",
      icon: "🌳"
    },
    { 
      title: "Predicciones individuales", 
      content: "Cada árbol realiza una predicción sobre el tipo de flor Iris",
      icon: "🔮"
    },
    { 
      title: "Agregación de resultados", 
      content: "Combinación de predicciones para obtener el tipo de flor Iris final",
      icon: "🎯"
    }
  ];

  const trees = [
    { id: 1, prediction: "Setosa" },
    { id: 2, prediction: "Versicolor" },
    { id: 3, prediction: "Setosa" },
    { id: 4, prediction: "Virginica" },
    { id: 5, prediction: "Setosa" },
  ];

  const sampleData = [
    { id: 1, sepalLength: 5.1, sepalWidth: 3.5, petalLength: 1.4, petalWidth: 0.2, species: "Setosa" },
    { id: 2, sepalLength: 7.0, sepalWidth: 3.2, petalLength: 4.7, petalWidth: 1.4, species: "Versicolor" },
    { id: 3, sepalLength: 6.3, sepalWidth: 3.3, petalLength: 6.0, petalWidth: 2.5, species: "Virginica" },
    { id: 4, sepalLength: 4.9, sepalWidth: 3.0, petalLength: 1.4, petalWidth: 0.2, species: "Setosa" },
    { id: 5, sepalLength: 6.4, sepalWidth: 3.2, petalLength: 4.5, petalWidth: 1.5, species: "Versicolor" },
  ];

  const nextStep = () => {
    setStep((prevStep) => (prevStep + 1) % totalSteps);
    setSelectedTree(null);
  };

  const handleTreeClick = (treeId) => {
    setSelectedTree(treeId);
  };

  const getFinalPrediction = () => {
    const counts = trees.reduce((acc, tree) => {
      acc[tree.prediction] = (acc[tree.prediction] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
  };

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: parseFloat(e.target.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    nextStep();
  };

  return (
    <Paper className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-md space-y-6" elevation={3}>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((stepItem, index) => (
          <Step key={index}>
            <StepLabel>{stepItem.title}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {step === 0 && (
        <div className="mt-4 space-y-4">
          <Typography variant="h6">Dataset de ejemplo: Iris</Typography>
          <Typography variant="body1">El dataset de Iris contiene medidas de 3 especies de flores Iris:</Typography>
          <ul>
            <li>Setosa</li>
            <li>Versicolor</li>
            <li>Virginica</li>
          </ul>
          <Typography variant="body2" color="textSecondary">
            Características medidas: longitud y ancho del sépalo y pétalo (en cm).
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Longitud Sépalo</TableCell>
                  <TableCell>Ancho Sépalo</TableCell>
                  <TableCell>Longitud Pétalo</TableCell>
                  <TableCell>Ancho Pétalo</TableCell>
                  <TableCell>Especie</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sampleData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.sepalLength}</TableCell>
                    <TableCell>{row.sepalWidth}</TableCell>
                    <TableCell>{row.petalLength}</TableCell>
                    <TableCell>{row.petalWidth}</TableCell>
                    <TableCell>{row.species}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <TextField
              label="Longitud del sépalo (cm)"
              variant="outlined"
              type="number"
              step="0.1"
              name="sepalLength"
              value={inputData.sepalLength}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Ancho del sépalo (cm)"
              variant="outlined"
              type="number"
              step="0.1"
              name="sepalWidth"
              value={inputData.sepalWidth}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Longitud del pétalo (cm)"
              variant="outlined"
              type="number"
              step="0.1"
              name="petalLength"
              value={inputData.petalLength}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              label="Ancho del pétalo (cm)"
              variant="outlined"
              type="number"
              step="0.1"
              name="petalWidth"
              value={inputData.petalWidth}
              onChange={handleInputChange}
              fullWidth
            />
          </div>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Clasificar flor
          </Button>
        </form>
      )}

      {step >= 2 && (
        <div className="mt-6">
          <Typography variant="h6">Árboles de decisión:</Typography>
          <div className="flex justify-center space-x-2">
            {trees.map((tree) => (
              <Button
                key={tree.id}
                onClick={() => handleTreeClick(tree.id)}
                variant={selectedTree === tree.id ? 'contained' : 'outlined'}
                color={selectedTree === tree.id ? 'success' : 'default'}
              >
                🌳
              </Button>
            ))}
          </div>
          {selectedTree && (
            <Typography variant="body1" align="center" className="mt-2">
              Árbol {selectedTree} predice: {trees.find(t => t.id === selectedTree).prediction}
            </Typography>
          )}
        </div>
      )}

      {step === 4 && (
        <Paper className="mt-4 p-4" elevation={2} style={{ backgroundColor: '#fffbe0' }}>
          <Typography variant="h6">Predicción final:</Typography>
          <Typography variant="body1">
            Basado en la mayoría de votos, la flor es probablemente: <strong>{getFinalPrediction()}</strong>
          </Typography>
        </Paper>
      )}

      <div className="flex justify-between items-center mt-6">
        <Typography variant="body2" color="textSecondary">Paso {step + 1} de {totalSteps}</Typography>
        <Button onClick={nextStep} variant="contained" color="primary">
          Siguiente ➡️
        </Button>
      </div>
    </Paper>
  );
};

export default RandomForestAnimation;