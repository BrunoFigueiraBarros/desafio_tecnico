import React from 'react';

const Menu = ({ handleExpressionButtonClick, handleAnimationSelection }) => {
    return (
        <div style={menuStyle}>
            <MenuSection title="Expressões">
                <MenuItem label="Neutra" onClick={() => handleExpressionButtonClick('NEUTRA')} />
                <MenuItem label="Zangado" onClick={() => handleExpressionButtonClick('ANGRY')} />
                <MenuItem label="Surpreso" onClick={() => handleExpressionButtonClick('SURPRISED')} />
                <MenuItem label="Triste" onClick={() => handleExpressionButtonClick('SAD')} />
            </MenuSection>

            <MenuSection title="Estados">
                <MenuItem label="Caminhar" onClick={() => handleAnimationSelection(10)} />
                <MenuItem label="Dançar" onClick={() => handleAnimationSelection(0)} />
                <MenuItem label="Correr" onClick={() => handleAnimationSelection(6)} />
                <MenuItem label="Sentar" onClick={() => handleAnimationSelection(7)} />
            </MenuSection>
        </div>
    );
};

const MenuSection = ({ title, children }) => (
    <div style={{ marginBottom: '15px' }}>
        <h3 style={titleStyle}>{title}</h3>
        {children}
    </div>
);

const MenuItem = ({ label, onClick }) => (
    <button style={buttonStyle} onClick={onClick}>
        {label}
    </button>
);

const menuStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
};

const titleStyle = {
    textAlign: 'center'
};

const buttonStyle = {
    display: 'block',
    width: '150px',
    padding: '10px 15px',
    marginBottom: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
};

export default Menu;
