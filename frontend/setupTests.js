import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.fetch = require('jest-fetch-mock');

global.flushPromises= () => new Promise( resolve => setImmediate(resolve));

beforeEach(() => {
    global.console.error = jest.fn();
});

afterEach(() => {
    expect(global.console.error).not.toBeCalled();
});
