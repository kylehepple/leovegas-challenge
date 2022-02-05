const template = document.createElement('template');
template.innerHTML = `
  <style>

    .game-entry-container {
      background: var(--grey-background);
      box-shadow: 0 0 11px rgba(33, 33, 33, .2);
      cursor: pointer;
      margin: 10px 0 15px 0;
      padding-top: 10px;
      border-bottom: var(--accent-color) 5px solid;
      transition: box-shadow .3s;
    }

    .game-entry-container:hover {
      box-shadow: 0 0 11px rgba(33, 33, 33, .5);
    }

    .game-entry-name {
      color: var(--text-color, black);
      height: 48px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    img {
      max-width: 90%;
      height: auto;
    }

  </style>

  <div class="game-entry-container">
    <img alt="Image unavailable" src=""/>
    <p class="game-entry-name"></p>
  </div>
`;

export class GameEntry extends HTMLElement {

  _IMAGESRC: string;
  _GAMENAME: string;
  root: ShadowRoot;
  nameElement: HTMLParagraphElement;
  imgElement: HTMLImageElement;

  static get observedAttributes(): string[] {
    return ['gameName', 'imageSrc'];
  }

  get gameName(): string {
    return this._GAMENAME;
  }

  set gameName(value) {
    this._GAMENAME = value;
    this.nameElement.innerText = this._GAMENAME;
  }

  get imageSrc(): string {
    return this._IMAGESRC;
  }

  set imageSrc(value) {
    this._IMAGESRC = value;
    this.imgElement.src = `http://${this._IMAGESRC}`;
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));
    this.nameElement = this.root.querySelector('.game-entry-name');
    this.imgElement = this.root.querySelector('img');
  }

  attributeChangedCallback(attrName, oldValue, newValue): void {
    if (oldValue !== newValue) {
      this[attrName] = newValue;
    }
  }

}

customElements.define('game-entry', GameEntry);
