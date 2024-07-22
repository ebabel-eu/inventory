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
      <h2>Upload *-Inventory.txt files</h2>
      <form id="uploadForm" onSubmit={handleSubmit}>
        <input type="file" name="file" multiple accept=".txt" />
        <button type="submit">Upload</button>
      </form>

      <h2>Current inventory</h2>


    </main>
  );
};

export default Home;
