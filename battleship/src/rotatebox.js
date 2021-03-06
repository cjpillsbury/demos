import { LitElement, html, css as litCSS } from 'lit-element';
import { adjustCSS, observe } from "spanning-css-polyfill";

import "./infoxbox.js";

const css = (strings, ...values) => {
  const string = adjustCSS(strings[0], "rotate-box");
  return litCSS([string], ...values);
};

export class RotateBox extends LitElement {
  static styles = css`
    :host {
      width: 100%;
      height: 100%;
      z-index: 99;
      position: absolute;
      top: 0;
      left: 0;
      visibility: hidden;
    }

    *,
    *::after,
    *::before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
    }

    #rotate-infobox {
        width: 90%;
        height: 90%;
        position: absolute;
        top: 5%;
        left: 5%;
        font-size: 2vmax;
        opacity: 1;
        text-align: center;
    }

    @media all and (orientation:landscape) {
      :host {
        visibility: hidden;
      }
    }

    @media all and (orientation:portrait) {
      :host {
        visibility: visible;
      }
    }

    @media (screen-spanning: single-fold-vertical) {
      :host {
        visibility: hidden;
      }
    }

    @media (screen-spanning: single-fold-horizontal) {
      :host {
        visibility: hidden;
      }
    }
  `;

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    observe(this);
  }

  firstUpdated() {
    this._text = this.shadowRoot.querySelector('#rotate-message');
  }

  setLabel(text) {
    this._text.innerHTML = text;
  }

  hide() {
    this.shadowRoot.host.style.visibility = 'hidden';
  }

  show() {
    // Unset the attribute so the rest of the CSS will apply.
    this.shadowRoot.host.style.visibility = '';
  }

  render() {
    return html`
      <div id="fullscreen-rotate">
        <info-box id="rotate-infobox">
          <div slot="label" id="rotate-message">Ahoy Captain!<br>Please rotate your device to play.</div>
        </info-box>
      </div>
    `;
  }
}

customElements.define("rotate-box", RotateBox);
