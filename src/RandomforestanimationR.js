import React, { useState } from 'react';
import { Button, IconButton, Typography, Paper, Stepper, Step, StepLabel, Box } from '@mui/material';
import { ArrowForward, ArrowBack } from '@mui/icons-material';

const RandomForestAnimation = () => {
  const [step, setStep] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const steps = [
    { title: "Datos de Entrada", content: "Conjunto de datos con características y valores objetivo" },
    { title: "Muestreo Bootstrap", content: "Crear múltiples subconjuntos de datos con reemplazo" },
    { title: "Creación de Árboles", content: "Construir árboles de decisión para cada subconjunto" },
    { title: "Predicción", content: "Cada árbol hace una predicción independiente" },
    { title: "Promedio de Predicciones", content: "Calcular el promedio de todas las predicciones" },
    { title: "Resultado Final", content: "Obtener la predicción final del Random Forest" }
  ];

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Box sx={{ p: 4, maxWidth: '800px', margin: '0 auto' }}>
      
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          {steps[step].title}
        </Typography>
        <Typography>{steps[step].content}</Typography>
      </Paper>

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Button 
          onClick={prevStep} 
          disabled={step === 0} 
          variant="contained" 
          startIcon={<ArrowBack />}
        >
          Anterior
        </Button>
        <Button 
          onClick={nextStep} 
          disabled={step === steps.length - 1} 
          variant="contained" 
          endIcon={<ArrowForward />}
        >
          Siguiente
        </Button>
      </Box>

      <Stepper activeStep={step} alternativeLabel>
        {steps.map((_, index) => (
          <Step key={index}>
            <StepLabel>{index + 1}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={8}>
        <Button 
          onClick={() => setShowExplanation(!showExplanation)} 
          variant="outlined"
          fullWidth
        >
          {showExplanation ? "Ocultar Explicación" : "Mostrar Explicación"}
        </Button>

        {showExplanation && (
          <Paper elevation={2} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Explicación del Paso
            </Typography>
            <Typography>{getStepExplanation(step)}</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

const getStepExplanation = (step) => {
  const explanations = [
    "En este paso, se prepara el conjunto de datos de entrada. Estos datos contienen características (variables independientes) y valores objetivo (variable dependiente) que se utilizarán para entrenar el modelo de Random Forest.",
    "El muestreo Bootstrap implica crear múltiples subconjuntos de datos seleccionando muestras con reemplazo del conjunto de datos original. Esto introduce variabilidad en los datos utilizados para entrenar cada árbol.",
    "Para cada subconjunto de datos creado en el paso anterior, se construye un árbol de decisión. Cada árbol se entrena de forma independiente, lo que permite capturar diferentes patrones en los datos.",
    "Una vez que los árboles están entrenados, cada uno hace una predicción independiente para un nuevo dato de entrada. Esto aprovecha la diversidad de los árboles para capturar diferentes aspectos de los datos.",
    "Las predicciones de todos los árboles se combinan calculando el promedio. Este enfoque de 'sabiduría de la multitud' ayuda a reducir el sobreajuste y mejora la generalización del modelo.",
    "El promedio calculado en el paso anterior se convierte en la predicción final del modelo de Random Forest. Esta predicción suele ser más robusta y precisa que la de un solo árbol de decisión."
  ];
  return explanations[step];
};

export default RandomForestAnimation;