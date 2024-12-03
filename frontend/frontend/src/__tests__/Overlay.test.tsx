import { render, screen, fireEvent } from '@testing-library/react';
import Overlay from '../components/Overlay';

describe('Overlay Component', () => {
  const mockSetCreateMenuOpen = jest.fn();

  test('should render when createMenuOpen is true', () => {
    render(
      <Overlay createMenuOpen={true} setCreateMenuOpen={mockSetCreateMenuOpen} />
    );

    expect(screen.getByTestId('overlay')).toBeInTheDocument();
  });

  test('should not render when createMenuOpen is false', () => {
    render(
      <Overlay createMenuOpen={false} setCreateMenuOpen={mockSetCreateMenuOpen} />
    );

    expect(screen.queryByTestId('overlay')).not.toBeVisible();
  });

  test('should toggle createMenuOpen when clicked', () => {
    render(
      <Overlay createMenuOpen={true} setCreateMenuOpen={mockSetCreateMenuOpen} />
    );

    const overlay = screen.getByTestId('overlay');
    fireEvent.click(overlay);

    expect(mockSetCreateMenuOpen).toHaveBeenCalledWith(false);
  });
});
