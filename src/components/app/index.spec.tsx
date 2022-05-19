import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import App from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('When rendering App', () => {
  it('should render', () => {
    const component = shallow(<App />);

    expect(component.exists()).toBe(true);
  });
});
