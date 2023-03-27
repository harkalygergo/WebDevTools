#!/bin/bash
 # STATUS
#/etc/init.d/clamav-daemon status
#sudo /etc/init.d/dovecot status
# clean server
sudo rm -r /var/log/*.gz;
sudo rm -r /tmp/*;
#sudo rm -r .cache/;
#mkdir .cache;
# update server
sudo apt autoremove;
sudo apt-get clean;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get dist-upgrade;
sudo apt autoremove;
sudo apt-get clean;
sudo needrestart -r i
if [ -f /var/run/reboot-required ]; then
  echo 'reboot required'
fi
#sudo reboot;
