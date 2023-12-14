import { render, screen } from '@testing-library/react';
import LanguageComponent from './language.component';
import { LanguageProvider } from './language.context';
import userEvent from '@testing-library/user-event';

describe('LanguageComponent', () => {
  beforeEach(() => {
    render(
      <LanguageProvider>
        <LanguageComponent />
      </LanguageProvider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // const Component = () => (
  //   <LanguageProvider>
  //     <LanguageComponent />
  //   </LanguageProvider>
  // );

  it('Should render correctly three buttons', () => {
    // render(<LanguageComponent />, { wrapper: LanguageProvider });
    // render(<Component />);

    const buttons = screen.getAllByRole('button');

    expect(buttons.length).toBe(3);
  });

  it('Should translate the tex of the buttons to spanish when user clicks on Spanish button', () => {
    const buttonsText = ['Español', 'Portugués', 'Inglés'];

    // render(<Component />);

    const button = screen.getByRole('button', { name: 'Spanish' });

    userEvent.click(button);

    buttonsText.forEach((text) => {
      const button = screen.getByRole('button', { name: text });
      expect(button).toBeInTheDocument();
    });
  });
});
