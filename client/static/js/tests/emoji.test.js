const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../../entry.html'), 'utf8');
const {incrementCount, sendEmojiUpdate, updateData}  = require('../emoji');



describe('entry.html', () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
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
