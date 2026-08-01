document.addEventListener('click', event => {
  const heading = event.target.closest('.markdown h1,.markdown h2,.markdown h3')
  if (!heading) return
  event.stopImmediatePropagation()
  const siblings = [...heading.closest('.markdown').children]
  const start = siblings.indexOf(heading)
  const level = Number(heading.tagName.slice(1))
  const collapse = !heading.classList.contains('folded')
  heading.classList.toggle('folded', collapse)

  for (let index = start + 1; index < siblings.length; index += 1) {
    const element = siblings[index]
    if (/^H[1-3]$/.test(element.tagName) && Number(element.tagName.slice(1)) <= level) break
    element.classList.toggle('folded-content', collapse)
  }
}, true)

const launchpad = document.createElement('div')
launchpad.className = 'nebula-launchpad'
launchpad.innerHTML = `
  <span>Launchpad</span>
  <a href="https://colab.research.google.com/" target="_blank" rel="noopener" title="Open Google Colab">◉ Colab</a>
  <a href="https://vscode.dev/" target="_blank" rel="noopener" title="Open VS Code for the web">⌘ VS Code</a>
  <a href="https://github.com/" target="_blank" rel="noopener" title="Open GitHub">◈ GitHub</a>
  <a href="https://www.google.com/" target="_blank" rel="noopener" title="Open a new browser tab">◧ Browse</a>`

const launchpadStyle = document.createElement('style')
launchpadStyle.textContent = `
  .nebula-launchpad{position:fixed;right:22px;bottom:20px;z-index:10;display:flex;align-items:center;gap:6px;padding:7px 8px;border:1px solid #443868;background:#0b091bdf;box-shadow:0 10px 35px #070411aa,0 0 20px #8066e522;backdrop-filter:blur(12px);border-radius:10px;font:10px 'DM Mono'}
  .nebula-launchpad>span{color:#9189aa;padding:0 4px;text-transform:uppercase;letter-spacing:1px}.nebula-launchpad a{color:#c8c0e4;text-decoration:none;border:1px solid transparent;border-radius:6px;padding:6px 7px}.nebula-launchpad a:hover{color:#fff;background:#6e56ca55;border-color:#ad96ff77;box-shadow:0 0 12px #8b6eff55}
  @media(max-width:800px){.nebula-launchpad{right:10px;bottom:10px}.nebula-launchpad>span{display:none}.nebula-launchpad a{font-size:9px;padding:5px}}
`
document.head.append(launchpadStyle)
document.body.append(launchpad)
