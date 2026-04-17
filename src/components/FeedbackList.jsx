import React from 'react';

const FeedbackList = ({ feedbacks }) => {
    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {feedbacks.map((fb) => (
                <li
                    key={fb.id}
                    style={{
                        padding: '15px',
                        borderBottom: '1px solid #13984b',
                        opacity: fb.isPending ? 0.5 : 1 // The "Optimistic" look
                    }}
                >
                    <strong style={{ color: '#19c86b' }}>{fb.rating} </strong> 
                    <p style={{ textSizeAdjust: '100%' }}>{fb.comment}</p>
                   
                    {fb.isPending && <small style={{ color: '#888' }}> (Sending...)</small>}
                </li>
            ))}
        </ul>
    );
};

export default FeedbackList;