<div className={styles.feedbackSection}>
  <label htmlFor="feedback">Leave a comment about this project:</label>
  <textarea
    id="feedback"
    name="feedback"
    rows="4"
    placeholder="Share your thoughts, suggestions, or concerns..."
    value={selectedProject.feedback || ''}
    onChange={(e) =>
      setSelectedProject({ ...selectedProject, feedback: e.target.value })
    }
    className={styles.feedbackTextarea}
  />

  <button
    onClick={async () => {
      try {
        const res = await fetch('/api/submit-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            projectName: selectedProject.name,
            feedback: selectedProject.feedback,
          }),
        });
        if (res.ok) {
          alert('Thank you for your feedback!');
          setSelectedProject({ ...selectedProject, feedback: '' }); // clear field
        } else {
          alert('Failed to submit feedback.');
        }
      } catch (error) {
        console.error('Error submitting feedback:', error);
        alert('Error submitting feedback.');
      }
    }}
    className={styles.submitFeedbackButton}
  >
    Submit Feedback
  </button>
</div>
