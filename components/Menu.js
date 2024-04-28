import React from 'react';

const Menu = ({ handleExpressionButtonClick, handleAnimationSelection }) => {
    return (
        <div style={{
            position: 'absolute',
            top: '10px',
            right: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '15px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ marginBottom: '15px' }}>
                <h3>Expressões</h3>
                <button onClick={() => handleExpressionButtonClick('NEUTRA')}>
                    Neutra
                </button>
                <button onClick={() => handleExpressionButtonClick('ANGRY')}>
                    Zangado
                </button>
                <button onClick={() => handleExpressionButtonClick('SURPRISED')}>
                    Surpreso
                </button>
                <button onClick={() => handleExpressionButtonClick('SAD')}>
                    Triste
                </button>
            </div>
            <div>
                <h3>Estados</h3>
                <button onClick={() => handleAnimationSelection(10)}>
                    Caminhar
                </button>
                <button onClick={() => handleAnimationSelection(0)}>
                    Dançar
                </button>
                <button onClick={() => handleAnimationSelection(6)}>
                    Correr
                </button>
                <button onClick={() => handleAnimationSelection(7)}>
                    Sentar
                </button>
            </div>
        </div>
    );
};

export default Menu;
