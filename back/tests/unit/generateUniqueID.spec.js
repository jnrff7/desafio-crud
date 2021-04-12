const generateUniqueID = require('../../src/utils/generateUniqueID');

describe('Generate Unique ID', () => {

    it('Must generate an number', () => {
        const id = generateUniqueID();
        expect(id).toHaveLength(8);
    }); 

});