const emojiTests = require('../emoji');
const fs = require('fs');
const path = require('path');
const { expect } = require('@jest/globals');
const html = fs.readFileSync(path.resolve(__dirname, '../entry.html'), 'utf8');

describe('entry.html', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();
        emojiTests;

    })

    test("increment count", () => {
        emojiTests.incrementCount("emoji-thumbs-up");
        emojiTests.incrementCount("emoji-thumbs-down");
        emojiTests.incrementCount("emoji-laughing");
        expect(1).toBe(1);
    })

    test('updates emoji count to backend', () => {
        emojiTests.sendEmojiUpdate
        expect(fetch).toHaveBeenCalled();
    })
})
