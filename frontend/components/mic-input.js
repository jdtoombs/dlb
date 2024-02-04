import { postAudio } from "./api.js";

class MicInput extends HTMLElement {
  constructor() {
    super();
    this.recording = false;
    this.mediaRecorder = undefined;
    this.chunks = [];
    this.attachShadow({ mode: "open" });
    this.render();
  }

  toggleRecording() {
    this.recording = !this.recording;
    if (this.recording) this.startRecording();
    if (!this.recording) this.mediaRecorder.stop();
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
		  <style>
		  </style>
		  <div class="mic-input">
			<button class="record">${this.recording ? "Listening" : "Start"}</button>
		  </div>
		  `;
    this.recordButton = this.shadowRoot.querySelector(".record");
    this.recordButton.removeEventListener("click", () => this.toggleRecording);
    this.recordButton.addEventListener("click", () => this.toggleRecording());
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    // Clean up
    if (this.recordButton)
      this.recordButton.removeEventListener("click", this.toggleRecording);
  }

  startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.mediaRecorder.onstart = () => {
            console.log("recording started");
          };
          this.mediaRecorder.ondataavailable = (e) => {
            if (!!e.data.size) this.chunks.push(e.data);
          };
          this.mediaRecorder.onstop = () => {
            console.log("recording stopped");
            const blob = new Blob(this.chunks, { type: "audio/wav" });
            this.chunks = [];
            // call to endpoint here
            // postAudio(blob, "");
          };
        })
        .catch((err) => console.log("Failed to get microphone", err));
    }
  }
}

window.customElements.define("mic-input", MicInput);
