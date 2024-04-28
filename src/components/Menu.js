import React, { useState, useEffect } from 'react';

const Menu = ({ handleExpressionButtonClick, handleAnimationSelection }) => {

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

 
    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

     
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

   
    const menuStyle = {
        position: 'absolute',
        top: '10px',
        right: windowWidth < 600 ? '2px' : '20px', 
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif'
    };

    const titleStyle = {
        textAlign: 'center',
        fontSize: windowWidth < 600 ? '12px' : 'inherit' 
    };

    const buttonStyle = {
        display: 'block',
        width: windowWidth < 600 ? '80px' : '150px', 
        padding: '10px 15px',
        marginBottom: '10px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: 'white',
        fontSize: windowWidth < 600 ? '12px' : '16px', 
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
    };

    return (
        <div style={menuStyle}>
            <MenuSection title="Expressões" titleStyle={titleStyle}>
                <MenuItem label="Neutra" onClick={() => handleExpressionButtonClick('NEUTRA')} buttonStyle={buttonStyle} />
                <MenuItem label="Zangado" onClick={() => handleExpressionButtonClick('ANGRY')} buttonStyle={buttonStyle} />
                <MenuItem label="Surpreso" onClick={() => handleExpressionButtonClick('SURPRISED')} buttonStyle={buttonStyle} />
                <MenuItem label="Triste" onClick={() => handleExpressionButtonClick('SAD')} buttonStyle={buttonStyle} />
            </MenuSection>

            <MenuSection title="Estados" titleStyle={titleStyle}>
                <MenuItem label="Caminhar" onClick={() => handleAnimationSelection(10)} buttonStyle={buttonStyle} />
                <MenuItem label="Dançar" onClick={() => handleAnimationSelection(0)} buttonStyle={buttonStyle} />
                <MenuItem label="Correr" onClick={() => handleAnimationSelection(6)} buttonStyle={buttonStyle} />
                <MenuItem label="Sentar" onClick={() => handleAnimationSelection(7)} buttonStyle={buttonStyle} />
               
            </MenuSection>
        </div>
    );
};

const MenuSection = ({ title, titleStyle, children }) => (
    <div style={{ marginBottom: '15px' }}>
        <h3 style={titleStyle}>{title}</h3>
        {children}
    </div>
);

const MenuItem = ({ label, onClick, buttonStyle }) => (
    <button style={buttonStyle} onClick={onClick}>
        {label}
    </button>
);

export default Menu;
