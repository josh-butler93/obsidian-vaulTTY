window.addEventListener('load', () => {
  // The main page declares these as browser-global variables. This replaces its
  // folder rendering with a parent/child model while retaining saved notes.
  data.folders.forEach(item => { if (item.parentId === undefined) item.parentId = null })
  let previewMode = false
  const trail = []
  const colors = ['#9a7cff', '#55e6d1', '#fb82bb', '#ffc873']
  const persist = () => localStorage.setItem('nebula-vanilla-v1', JSON.stringify(data))
  const current = () => data.notes.find(item => item.id === selected)
  const roots = () => data.folders.filter(item => item.id === 'inbox' || !item.parentId)
  const children = id => data.folders.filter(item => item.parentId === id)
  const parent = id => data.folders.find(item => item.id === id)?.parentId || 'inbox'
  const directNotes = id => data.notes.filter(item => id === 'inbox' ? true : item.folderId === id).sort((a,b) => b.updatedAt.localeCompare(a.updatedAt))
  const name = id => data.folders.find(item => item.id === id)?.name || 'All notes'
  const update = changes => { const item = current(); if (!item) return; Object.assign(item, changes, { updatedAt: new Date().toISOString() }); persist() }

  function draw() {
    const activeFolder = folder || 'inbox'
    const notes = directNotes(activeFolder).filter(item => `${item.title} ${item.body}`.toLowerCase().includes(search.toLowerCase()))
    if (!data.folders.some(item => item.id === activeFolder)) folder = 'inbox'
    document.querySelector('#folders').innerHTML = roots().map(item => `<button class="folder ${folder === item.id ? 'active' : ''}" data-core-folder="${item.id}">${item.id === 'inbox' ? '◈' : '<i style="background:'+item.color+'"></i>'} ${esc(item.name)}<small>${item.id === 'inbox' ? data.notes.length : directNotes(item.id).length}</small></button>`).join('')
    document.querySelector('#custom-folders').innerHTML = ''
    document.querySelector('#crumb').textContent = folder === 'inbox' ? 'Your universe' : `Folder / ${name(folder)}`
    document.querySelector('#folder-title').textContent = name(folder)
    document.querySelector('#count').textContent = `${notes.length} ${notes.length === 1 ? 'note' : 'notes'} · ${children(folder).length} subfolder${children(folder).length === 1 ? '' : 's'}`
    const backTo = trail.at(-1) || parent(folder)
    document.querySelector('#note-list').innerHTML = `<div class="subfolder-toolbar"><span>${folder === 'inbox' ? 'Folders in Your universe' : `<button class="up-folder" data-core-up="${backTo}">← Back to ${esc(name(backTo))}</button>`}</span><button data-core-new-folder="${folder}">⊞ New subfolder</button></div>${children(folder).map(item => `<button class="subfolder-card" draggable="true" data-core-folder="${item.id}" data-core-drop="${item.id}" style="--folder-color:${item.color}"><i></i><b>${esc(item.name)}</b><small>${directNotes(item.id).length} notes · ${children(item.id).length} folders</small></button>`).join('')}${notes.map(item => `<button class="note ${item.id === selected ? 'active' : ''}" draggable="true" data-core-note="${item.id}"><b>${esc(item.title || 'Untitled note')}</b><p>${esc(item.body || 'No additional text')}</p><time>${new Date(item.updatedAt).toLocaleDateString(undefined,{month:'short',day:'numeric'})}</time></button>`).join('') || '<div class="empty">No notes here yet.</div>'}`
    drawEditor()
  }

  function drawEditor() {
    const note = current()
    const editor = document.querySelector('#editor')
    if (!note) { editor.innerHTML = '<div class="empty"><b>✦</b><h2>A blank orbit awaits</h2><button data-core-new-note>Create note</button></div>'; return }
    editor.innerHTML = `<header class="editor-top"><span class="sync"><i></i>Saved locally</span><div><button data-core-preview class="${previewMode ? 'on' : ''}">${previewMode ? '✎ Edit' : '◉ Preview'}</button><select data-core-move>${data.folders.map(item => `<option value="${item.id}" ${item.id === note.folderId ? 'selected' : ''}>${esc(name(item.id))}</option>`).join('')}</select><button class="trash" data-core-delete>⌫</button></div></header><input class="title" data-core-title value="${esc(note.title)}">${previewMode ? `<article class="markdown">${md(note.body)}</article>` : `<textarea class="body" data-core-body placeholder="Start writing something luminous…">${esc(note.body)}</textarea>`}<footer><span>${note.body.trim() ? note.body.trim().split(/\s+/).length : 0} words</span><span>${previewMode ? 'Markdown preview' : 'Saved automatically'}</span></footer>`
  }

  const newNote = () => { const id = uid(); data.notes.unshift({ id, title:'Untitled note', body:'', folderId: folder || 'inbox', updatedAt:new Date().toISOString() }); selected = id; previewMode = false; persist(); draw(); setTimeout(() => document.querySelector('[data-core-title]')?.focus(), 0) }
  document.querySelector('#new-note').onclick = newNote
  document.querySelector('#new-note-2').onclick = newNote
  document.querySelector('#new-folder').onclick = () => { const label = prompt('Top-level folder name'); if (!label?.trim()) return; data.folders.push({ id:uid(), name:label.trim(), color:colors[data.folders.length % colors.length], parentId:null }); persist(); draw() }
  document.body.onclick = event => {
    const target = event.target.closest('[data-core-folder],[data-core-note],[data-core-new-folder],[data-core-new-note],[data-core-preview],[data-core-delete],[data-core-up]')
    if (!target) return
    if (target.dataset.coreFolder) { if (target.closest('.subfolder-card')) trail.push(folder); else trail.length = 0; folder = target.dataset.coreFolder; previewMode = false; draw(); return }
    if (target.dataset.coreUp) { folder = trail.pop() || target.dataset.coreUp; previewMode = false; draw(); return }
    if (target.dataset.coreNote) { selected = target.dataset.coreNote; previewMode = false; draw(); return }
    if (target.dataset.coreNewNote !== undefined) return newNote()
    if (target.dataset.coreNewFolder) { const label = prompt(`New folder inside ${name(target.dataset.coreNewFolder)}`); if (label?.trim()) { data.folders.push({ id:uid(), name:label.trim(), color:colors[data.folders.length % colors.length], parentId:target.dataset.coreNewFolder }); persist(); draw() } return }
    if (target.dataset.corePreview !== undefined) { previewMode = !previewMode; draw(); return }
    if (target.dataset.coreDelete !== undefined && confirm(`Delete “${current().title}”?`)) { data.notes = data.notes.filter(item => item.id !== selected); selected = directNotes(folder)[0]?.id || ''; persist(); draw() }
  }
  document.body.oninput = event => { if (event.target.matches('[data-core-title]')) update({ title:event.target.value }); if (event.target.matches('[data-core-body]')) update({ body:event.target.value }) }
  document.body.onchange = event => { if (event.target.matches('[data-core-move]')) { update({ folderId:event.target.value }); draw() } }
  let dragged
  document.addEventListener('dragstart', event => { const note = event.target.closest('[data-core-note]'), child = event.target.closest('.subfolder-card'); if (note) dragged = { type:'note', id:note.dataset.coreNote }; if (child) dragged = { type:'folder', id:child.dataset.coreFolder } })
  document.addEventListener('dragover', event => { if (event.target.closest('[data-core-drop]')) event.preventDefault() })
  document.addEventListener('drop', event => { const target = event.target.closest('[data-core-drop]'); if (!target || !dragged) return; event.preventDefault(); const destination = target.dataset.coreDrop; if (dragged.type === 'note') data.notes.find(item => item.id === dragged.id).folderId = destination; if (dragged.type === 'folder' && dragged.id !== destination) data.folders.find(item => item.id === dragged.id).parentId = destination; dragged = null; persist(); draw() })
  document.querySelector('#editor').ondblclick = event => { if (event.target.closest('.markdown') && previewMode) { previewMode = false; draw() } }
  document.querySelector('#search').oninput = event => { search = event.target.value; draw() }
  const css = document.createElement('style')
  css.textContent = `.subfolder-toolbar{display:flex;justify-content:space-between;align-items:center;color:#8a849f;font:10px 'DM Mono';padding:5px 2px 9px}.subfolder-toolbar button{border:1px solid #6d5bb155;background:#1a1630;color:#c8baff;border-radius:6px;padding:6px;font:10px 'DM Mono'}.subfolder-toolbar .up-folder{padding:0;border:0;background:transparent;color:#b9a8ff}.subfolder-toolbar .up-folder:hover{color:#fff;text-shadow:0 0 10px #a58bff}.subfolder-card{width:100%;display:grid;grid-template-columns:10px 1fr;gap:4px;border:1px solid #403661;background:#141126;color:#e0daf1;border-radius:9px;padding:10px;text-align:left;margin:0 0 6px}.subfolder-card:hover{border-color:var(--folder-color);box-shadow:0 0 16px color-mix(in srgb,var(--folder-color) 35%,transparent)}.subfolder-card i{grid-row:span 2;width:8px;height:8px;border-radius:50%;background:var(--folder-color);box-shadow:0 0 9px var(--folder-color);margin-top:4px}.subfolder-card b{font-size:12px}.subfolder-card small{color:#89819f;font:9px 'DM Mono'}`
  document.head.append(css)
  draw()
})
