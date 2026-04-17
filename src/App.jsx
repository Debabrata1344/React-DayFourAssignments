// App.jsx (or page.jsx)
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";

export default function App() {
  
  const mockFeedbacks = [
    { name: "Alice", message: "Love the UI!" },
  ];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Feedback App</h1>
      <FeedbackForm />
      <FeedbackList feedbacks={mockFeedbacks} />
    </main>
  );
}
