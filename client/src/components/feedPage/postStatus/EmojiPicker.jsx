import React from 'react';
import './EmojiPicker.scss';

const emojis = [
    '😊', '😂', '😍', '😒', '😎', '🥺', '😢', '😠', '😱', '😴',
    '🤔', '🤗', '🤩', '🥳', '😷', '🤒', '🤕', '🥵', '🥶', '🤑',
    '🤠', '😈', '👿', '👻', '💀', '☠️', '👽', '👍', '👎', '👊',
    '✊', '👌', '✌️', '👏', '🙏', '💪', '🚀', '🌈', '🔥', '💔'
];

export const EmojiPicker = ({ onSelect }) => {
    return (
        <div className="emoji-picker">
            {emojis.map((emoji) => (
                <span
                    key={emoji}
                    className="emoji"
                    onClick={() => onSelect(emoji)}
                >
                    {emoji}
                </span>
            ))}
        </div>
    );
};

