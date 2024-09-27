import React, { useState } from 'react';

const Theory = () => {
    const AccordionItem = ({ title, children }) => {
        const [isOpen, setIsOpen] = useState(false);
        return (
            <div className="border-b border-gray-200">
                <button
                className="flex justify-between items-center w-full py-4 px-6 text-left font-semibold"
                onClick={() => setIsOpen(!isOpen)}
                >
                {title}
                <span>{isOpen ? '▲' : '▼'}</span>
                </button>
                {isOpen && (
                <div className="py-4 px-6">
                    {children}
                </div>
                )}
            </div>
        );
    };
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Teoría de Random Forest</h3>
            <div className="border border-gray-200 rounded-lg">
                <AccordionItem title="¿Qué es Random Forest?">
                    <p>Random Forest es un algoritmo de aprendizaje automático que crea múltiples árboles de decisión y los combina para mejorar la precisión y evitar el sobreajuste. Se basa en el concepto de ensamble, donde cada árbol contribuye con una 'votación' para la predicción final.</p>
                </AccordionItem>

                <AccordionItem title="Fundamentos Matemáticos">
                    <p>Random Forest utiliza una combinación de muestreo aleatorio de los datos y selección aleatoria de características para construir árboles de decisión. El proceso puede evaluarse con:</p>
                    <pre className="bg-gray-100 p-2 rounded mt-2">
                        {`1. Bagging (Bootstrap Aggregating): Genera múltiples muestras de los datos originales.
2. Promedio de predicciones: El resultado es el promedio para regresión o la votación para clasificación.`}
                    </pre>
                    <p className="mt-2">Estos principios permiten que el modelo sea más robusto y generalice mejor en comparación con un solo árbol de decisión.</p>
                </AccordionItem>

                <AccordionItem title="Proceso de Construcción">
                    <ol className="list-decimal list-inside">
                        <li>Generar múltiples subconjuntos de datos a partir del conjunto de entrenamiento original mediante muestreo aleatorio con reemplazo (bagging).</li>
                        <li>Construir un árbol de decisión para cada subconjunto utilizando una selección aleatoria de características.</li>
                        <li>Realizar la predicción final mediante el promedio o la votación de todos los árboles construidos.</li>
                    </ol>
                </AccordionItem>

                <AccordionItem title="Ventajas y Desventajas">
                    <h4 className="font-semibold">Ventajas:</h4>
                    <ul className="list-disc list-inside mb-2">
                        <li>Reduce el sobreajuste en comparación con un solo árbol de decisión.</li>
                        <li>Manejo eficaz de grandes conjuntos de datos con muchas características.</li>
                        <li>Funciona bien con datos faltantes y desbalanceados.</li>
                    </ul>
                    <h4 className="font-semibold">Desventajas:</h4>
                    <ul className="list-disc list-inside">
                        <li>El modelo es menos interpretable en comparación con un solo árbol.</li>
                        <li>Mayor tiempo de computación debido a la construcción de múltiples árboles.</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Aplicaciones Prácticas">
                    <p>Random Forest se utiliza en una variedad de aplicaciones, incluyendo:</p>
                    <ul className="list-disc list-inside">
                        <li>Clasificación de imágenes</li>
                        <li>Predicción de enfermedades médicas</li>
                        <li>Análisis de riesgo financiero</li>
                        <li>Detección de fraudes</li>
                        <li>Análisis de mercado</li>
                    </ul>
                </AccordionItem>

                <AccordionItem title="Comparación con Otros Modelos">
                    <p>Random Forest es uno de varios modelos utilizados para clasificación y regresión. Otros modelos comunes incluyen:</p>
                    <ul className="list-disc list-inside">
                        <li>Árboles de decisión: Más simples, pero menos precisos que Random Forest.</li>
                        <li>Gradient Boosting: Otro modelo de ensamble que puede superar a Random Forest en precisión, pero requiere más ajuste de parámetros.</li>
                        <li>Máquinas de soporte vectorial (SVM): Adecuadas para datos con alta dimensionalidad, pero más complejas de entrenar.</li>
                    </ul>
                </AccordionItem>
            </div>
        </div>
    );
};

export default Theory;