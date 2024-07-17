'use client';

const Home = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    const formData = new FormData(event.currentTarget); // Create FormData from the form
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData, // Send the form data
      });
      if (response.ok) {
        console.log('Upload successful');
        // Handle success response
      } else {
        console.error('Upload failed');
        // Handle error response
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle exception
    }
  };

  return (
    <main>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <input type="file" name="file" />
        <button type="submit">Upload</button>
      </form>
    </main>
  );
};

export default Home;
