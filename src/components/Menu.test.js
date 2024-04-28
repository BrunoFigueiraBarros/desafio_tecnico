import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Menu from './Menu';

describe('Menu Component', () => {
  it('renders without crashing', () => {
    render(<Menu />);
  });

  it('calls handleExpressionButtonClick when expression button is clicked', () => {
    const handleExpressionButtonClick = jest.fn();
    const { getByText } = render(<Menu handleExpressionButtonClick={handleExpressionButtonClick} />);
    fireEvent.click(getByText('Neutra'));
    expect(handleExpressionButtonClick).toHaveBeenCalledWith('NEUTRA');
  });

  it('calls handleAnimationSelection when animation button is clicked', () => {
    const handleAnimationSelection = jest.fn();
    const { getByText } = render(<Menu handleAnimationSelection={handleAnimationSelection} />);
    fireEvent.click(getByText('Caminhar'));
    expect(handleAnimationSelection).toHaveBeenCalledWith(10);
  });
});
