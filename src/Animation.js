import React, { useState } from 'react';
import Randomforestanimation from './Randomforestanimation'; // Importa el primer componente de animación
import RandomforestanimationR from './RandomforestanimationR'; // Importa el segundo componente de animación

const AnimationSwitcher = () => {
    const [activeAnimation, setActiveAnimation] = useState(1); // Controla cuál animación está activa
    const handleSwitch = (animationNumber) => {
        setActiveAnimation(animationNumber);
    };
    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-center space-x-4">
                <button
                    onClick={() => handleSwitch(1)}
                    className={`bg-indigo-500 hover:bg-indigo-700 text-white p-2 rounded ${activeAnimation === 1 ? 'font-bold' : ''}`}
                >
                    Clasificación
                </button>
                <button
                    onClick={() => handleSwitch(2)}
                    className={`bg-violet-500 hover:bg-violet-700 text-white p-2 rounded ${activeAnimation === 2 ? 'font-bold' : ''}`}
                >
                    Regresión
                </button>
            </div>

            <div className="mt-5">
                {activeAnimation === 1 && <Randomforestanimation />}
                {activeAnimation === 2 && <RandomforestanimationR />}
            </div>
        </div>
    );
};

export default AnimationSwitcher;