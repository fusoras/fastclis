class CopyButton extends HTMLElement {
  connectedCallback() {
    this.addEventListener('click', async ev => {
      const $target = ev.target instanceof Element ? ev.target : null
      const $btn = $target?.closest('[data-copy]')
      if (!($btn instanceof HTMLElement)) return

      const $source = document.querySelector(this.dataset.copyTarget ?? '')
      if (!$source) return

      const text = $source.textContent ?? ''
      if (!text) return
      if (!navigator.clipboard?.writeText) return
      await navigator.clipboard.writeText(text)

      this.dataset.copied = 'true'
      $btn.setAttribute('aria-label', 'Copiado')
      $btn.setAttribute('title', 'Copiado')
      globalThis.setTimeout(() => {
        delete this.dataset.copied
        $btn.setAttribute('aria-label', 'Copiar texto')
        $btn.setAttribute('title', 'Copiar texto')
      }, 2000)
    })
  }
}

customElements.define('copy-button', CopyButton)
