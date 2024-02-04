/**
 * Post audio data to the server.
 *
 * @param {Blob} audioBlob The audio data to be sent.
 * @param {string} url The URL of the API endpoint.
 * @returns {Promise<Response>} The response from the fetch request.
 */
export async function postAudio(audioBlob, url) {
  let formData = new FormData();
  formData.append("audio", audioBlob, "audio.wav");

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
