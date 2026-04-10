# Plugins
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Auto restore
set -g @continuum-restore 'on'

# Initialize TPM (MUST be last line)
run '~/.tmux/plugins/tpm/tpm'

# Save session
bind S run-shell "~/.tmux/plugins/tmux-resurrect/scripts/save.sh"

# Restore session
bind R run-shell "~/.tmux/plugins/tmux-resurrect/scripts/restore.sh"
