/**
 * Post audio data to the server.
 *
 * @param {Blob} audioBlob The audio data to be sent.
 * @param {string} url The URL of the API endpoint.
 * @returns {Promise<Response>} The response from the fetch request.
 */
export async function postAudio(audioBlob) {
  const url = "http://localhost:5000/openai/transcribe";
  let formData = new FormData();
  formData.append("audio", audioBlob, "audio.webm");

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Failed to post audio data:", error);
    throw error;
  }
}
