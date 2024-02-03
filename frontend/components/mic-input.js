class MicInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
		<style>
		</style>
		<div class="mic-input">
		  <button class="record">Start</button>
		</div>
	`;
    this.shadowRoot.addEventListener("click", () => this.onClick());
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener("click", () => this.onClick());
  }

  onClick() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      console.log("getUserMedia supported.");
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {})
        .catch((err) => console.log("Failed to get microphone", err));
    }
  }
}

window.customElements.define("mic-input", MicInput);
