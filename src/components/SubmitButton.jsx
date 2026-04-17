import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="btn"
            style={{
                backgroundColor: pending ? '#692228' : '#280cdd',
                cursor: pending ? 'not-allowed' : 'pointer'
            }}
        >
            {pending ? "Processing..." : "Submit Feedback"}
        </button>
    );
};

export default SubmitButton;