command:
- tmux show-options -g prefix
 - command:
  - contrl + space + s
    - click on a session and press the below key to kill a session
      - x 
         - when prompted press the y button to kill the session
create a new session
- tmux new -s <session_name>
- control + space then d
	- detach from session
- tmux ls to 
	- lists out sessions
- tmux attach -t <session_name or session_number>
	- this allows you to reattach to a session
when in the session run the below command to switch between the two of them
- control + space then s
	- select the session you want to go between
While in a session to create a new one from there run
- control + space then : (semicolon)
	- new -s <session_name>
To kill a session
- command:
	- tmux kill-session -t <session_name or #>
	- Ctrl + b + s, then `x` on the target 
		- then press y

**Kill current session**|`Ctrl + b` then `:kill-session`
**Kill named session** tmux kill-session -t <name>
Kill all sessions  tmux kill-server
Kill all except current tmux kill-session -a
Interactive kill Ctrl + b + s, then `x` on the targeto 

To get windows to split run the below command

Horizontal Split
- control + space + "

Verticle Split
- control + space + %

# Moving between panes

CTRL + Space → arrow keys

Example:

- `→` go right
- `←` go left
- `↑` go up
- `↓` go down

# Resize panes

Hold prefix, then:

CTRL + Space → hold arrow keys

# Bonus (super useful)

## Create new window (tab)
CTRL + Space → c

## Switch windows 
 - This works with the step above and will have the different buffers listed at the top

CTRL + Space → n   (next)  
CTRL + Space → p   (previous)


## Setting up TMUX Resurrect
  1. Clone the github repo 
  2. Run the installer ~/.tmux/plugins/tpm/bin/install_plugins
  3. create a config file ~/.tmux.conf and add the proper key binds 
      -((!Side Note))-> the save and restore keybinds need to be added in order for the functionality of it to work 
  4. After editing the config file either run the below commands 
    - Command:
      - tmux source-file ~/.tmux.conf 
      - tmux kill-server && tmux

## Save and Restore setup 
- Command:
  - contrl + space + S <shift + s> to save the setup 
  - tmux kill-server
  - tmux -> this reopens tmux 
  - tmux source-file ~/.tmux.conf -> this will reload the save keybindings 
  - contrl + space + R <shift + r> this restores the previous sessions
