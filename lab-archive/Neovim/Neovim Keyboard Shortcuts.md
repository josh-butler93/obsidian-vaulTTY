-Command:
  - press the space bar to get the keyboard shortcut keybindings
    - Window navigation in Neovim:
    - Ctrl + w + h    # left
    - Ctrl + w + j    # down
    - Ctrl + w + k    # up
    - Ctrl + w + l    # right
   - Other useful shortcuts:
      - Command: 
        - Ctrl + w + w    # cycle between windows
        - Ctrl + w + c    # close current window
        - Ctrl + w + s    # split horizontally
        - Ctrl + w + v    # split vertically
        - Ctrl + w + =    # equalize window sizes
- Alternative - add to your init.vim/config for vim-style navigation without Ctrl+w:
- Script Below:
  - Script:
-- lua config example
vim.keymap.set('n', '<C-h>', '<C-w>h')
vim.keymap.set('n', '<C-j>', '<C-w>j')
vim.keymap.set('n', '<C-k>', '<C-w>k')
vim.keymap.set('n', '<C-l>', '<C-w>l')
This lets you use Ctrl + h/j/k/l directly

- Command:
  - To shift between different files you are editing
    - command:
	    - shift + h

Fuzzy Finder Menu
- command:
	- press space + space
		- once the file is open if you press it again you can open a new file
	- press  shift + h to toggle between the two files
	- press control + h to jump between the side bar

Lazy git
- command:
	- press space + g + g
