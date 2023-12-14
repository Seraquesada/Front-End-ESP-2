import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FollowingButtonComponent from './following-button.component';

describe('FollowingButtonComponent', () => {
  const mock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render correctly when isFav is set true', () => {
    const props = {
      isFav: true,
      onToggleFavorite: jest.fn()
    };

    render(<FollowingButtonComponent {...props} />);

    const image = screen.getByAltText('is_favorite');

    expect(image).toBeInTheDocument();
  });

  it('Should render correctly when isFav is set false', () => {
    const props = {
      isFav: false,
      onToggleFavorite: jest.fn()
    };

    render(<FollowingButtonComponent {...props} />);

    const image = screen.getByAltText('is_not_favorite');

    expect(image).toBeInTheDocument();
  });

  it('Should call onToggleFavorite function when user clicks on button', () => {
    const props = {
      isFav: true,
      // onToggleFavorite: jest.fn()
      onToggleFavorite: mock
    };

    render(<FollowingButtonComponent {...props} />);

    const button = screen.getByRole('button');

    userEvent.click(button);

    // expect(props.onToggleFavorite).toBeCalled();
    expect(props.onToggleFavorite).toBeCalledWith(!props.isFav);
  });

  it('', () => {
    expect(mock).toBeCalled();
  });
});
