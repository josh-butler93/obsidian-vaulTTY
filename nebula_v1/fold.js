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
  .nested-sidebar-folder{display:none!important}.subfolder-add{margin-left:8px}.subfolder-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;margin-bottom:10px}.subfolder-card{min-width:0;border:1px solid #433a63;background:#121025;color:#dad4ec;border-radius:9px;padding:10px;text-align:left;transition:.18s}.subfolder-card:hover,.subfolder-card.drop-target{border-color:var(--folder-color);box-shadow:0 0 17px color-mix(in srgb,var(--folder-color) 35%,transparent);transform:translateY(-2px)}.subfolder-card i{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--folder-color);box-shadow:0 0 10px var(--folder-color);margin-right:6px}.subfolder-card span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;margin-top:4px}.subfolder-card small{color:#8a849f;font:9px 'DM Mono'}
  @media(max-width:800px){.nebula-launchpad{right:10px;bottom:10px}.nebula-launchpad>span{display:none}.nebula-launchpad a{font-size:9px;padding:5px}}
`
document.head.append(launchpadStyle)
document.body.append(launchpad)

// Nebula folders: nested folders live with their notes, rather than in the sidebar.
window.addEventListener('load', () => {
  const originalRender = render
  let dragged = null
  const persist = () => { save(); originalRender() }

  render = function enhancedRender() {
    originalRender()
    const active = document.querySelector('.folder.active[data-folder]')?.dataset.folder || 'inbox'
    const list = document.querySelector('#note-list')
    const panel = document.querySelector('.notes-head')
    if (!list || !panel) return

    data.folders.filter(folder => folder.parentId).forEach(folder => {
      document.querySelector(`[data-folder="${folder.id}"]`)?.classList.add('nested-sidebar-folder')
    })

    if (!panel.querySelector('#new-subfolder')) {
      const button = document.createElement('button')
      button.id = 'new-subfolder'
      button.className = 'round subfolder-add'
      button.title = 'New subfolder here'
      button.textContent = '⊞'
      button.onclick = () => {
        const name = prompt('Subfolder name')
        if (!name?.trim()) return
        const colors = ['#9a7cff', '#55e6d1', '#fb82bb', '#ffc873']
        data.folders.push({ id: uid(), name: name.trim(), color: colors[data.folders.length % colors.length], parentId: active })
        persist()
      }
      panel.append(button)
    }

    const children = data.folders.filter(folder => folder.parentId === active)
    if (children.length) {
      const group = document.createElement('div')
      group.className = 'subfolder-grid'
      group.innerHTML = children.map(folder => `<button class="subfolder-card" draggable="true" data-subfolder="${folder.id}" style="--folder-color:${folder.color}"><i></i><span>${esc(folder.name)}</span><small>${data.notes.filter(note => note.folderId === folder.id).length} notes</small></button>`).join('')
      list.prepend(group)
    }

    list.querySelectorAll('.note').forEach(note => {
      note.draggable = true
      note.ondragstart = event => { dragged = { type: 'note', id: note.dataset.note }; event.dataTransfer.effectAllowed = 'move' }
    })
    list.querySelectorAll('.subfolder-card').forEach(card => {
      card.ondragstart = event => { dragged = { type: 'folder', id: card.dataset.subfolder }; event.dataTransfer.effectAllowed = 'move' }
      card.ondragover = event => { event.preventDefault(); card.classList.add('drop-target') }
      card.ondragleave = () => card.classList.remove('drop-target')
      card.ondrop = event => {
        event.preventDefault(); card.classList.remove('drop-target')
        if (!dragged || dragged.id === card.dataset.subfolder) return
        if (dragged.type === 'note') data.notes.find(note => note.id === dragged.id).folderId = card.dataset.subfolder
        if (dragged.type === 'folder') data.folders.find(folder => folder.id === dragged.id).parentId = card.dataset.subfolder
        persist(); dragged = null
      }
      card.onclick = () => { folder = card.dataset.subfolder; preview = false; render() }
    })

    const editor = document.querySelector('#editor')
    editor?.addEventListener('dblclick', event => {
      if (event.target.closest('.markdown') && preview) document.querySelector('#toggle-preview')?.click()
      if (event.target === editor && !preview) document.querySelector('#body')?.focus()
    }, { once: true })
  }
  render()
})
