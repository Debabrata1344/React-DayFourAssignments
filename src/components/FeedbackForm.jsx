import React, { useState, useActionState, useOptimistic } from 'react';
import { submitFeedbackAction } from '../actions/feedback';
import SubmitButton from './SubmitButton';
import FeedbackList from './FeedbackList';

const FeedbackForm = () => {
    const [confirmedFeedbacks, setConfirmedFeedbacks] = useState([]);

    // 1. Action State - Handles the server response
    const [state, formAction] = useActionState(async (prevState, formData) => {
        const result = await submitFeedbackAction(prevState, formData);
        if (result.success) {
            setConfirmedFeedbacks((prev) => [...prev, result.newEntry]);
        }
        return result;
    }, null);

    // 2. Optimistic State - Updates the UI instantly
    const [optimisticFeedbacks, addOptimistic] = useOptimistic(
        confirmedFeedbacks,
        (current, newFB) => [...current, { ...newFB, isPending: true }]
    );

    const handleSubmit = async (formData) => {
        // Add the "temporary" item to the list immediately
        addOptimistic({
            rating: formData.get("rating"),
            comment: formData.get("comment"),
            id: Date.now(),
        });

        // Run the actual server call
        await formAction(formData);
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <select name="rating">
                    <option value="Excellent ">Excellent </option>
                    <option value="Very Good ">Very Good </option>
                    <option value="Good ">Good </option>
                    <option value="Bad ">Bad </option>
                    <option value="Very Bad ">Very Bad </option>
                </select>

                <textarea name="comment" placeholder="Tell us more..." />

                <SubmitButton />

                {state?.error && <p style={{ color: 'red' }}>{state.error}</p>}
            </form>

            <div style={{ marginTop: '30px' }}>
                <h3>Recent Feedback</h3>
                <FeedbackList feedbacks={optimisticFeedbacks} />
            </div>
        </div>
    );
};

export default FeedbackForm;