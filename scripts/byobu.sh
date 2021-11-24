#!/bin/bash

if [ -z "$(byobu-tmux list-sessions | grep 'dev-puzzle-convent')" ]
then
  byobu-tmux new-session -d -t 'dev-puzzle-convent' # creates a new detached byobu-tmux session

  byobu-tmux rename-window "Puzzle Convent"
  byobu-tmux send-keys -t 0 'cd ~/Code/github/puzzle/convent' 'C-m'
  byobu-tmux send-keys -t 0 'code .' 'C-m'
  byobu-tmux split-window -h
  byobu-tmux send-keys -t 1 'cd ~/Code/github/puzzle/convent' 'C-m'
  byobu-tmux send-keys -t 1 'npm start' 'C-m'
fi
# Enter byobu-tmux
byobu-tmux attach -t 'dev-puzzle-convent'
