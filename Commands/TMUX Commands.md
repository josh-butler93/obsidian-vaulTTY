command:
- tmux show-options -g prefix

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