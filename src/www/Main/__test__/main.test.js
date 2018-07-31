import React from 'react';
import Main from '../Main';

import renderer from 'react-test-renderer';

import {cloneObject} from '../helpers';

test('Render correctly', () => {
    const tree = renderer.create(<Main/>).toJSON();
    expect(tree).toMatchSnapshot();
});

test('Test clone object', () => {
    const object = [
        [1,2],
        [3,4]
    ];
    const newObject = cloneObject(object);

    expect(object).not.toBe(newObject);
});
