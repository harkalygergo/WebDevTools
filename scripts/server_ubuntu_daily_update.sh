#!/bin/bash
 # STATUS
#/etc/init.d/clamav-daemon status
#sudo /etc/init.d/dovecot status
# clean server
df -h

printf "\n\n SHOW SIZE OF /var/log \n\n"
du -h /var/log

printf "\n\n SHOW SYSLOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/syslog

printf "\n\n SHOW AUTH LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/auth.log

printf "\n\n SHOW MAIL LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/mail.log

printf "\n\n SHOW BOOT LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/boot.log

printf "\n\n SHOW DAEMON LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/daemon.log

printf "\n\n SHOW KERN LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/kern.log

printf "\n\n SHOW CRON LOG LAST 20 ROWS \n\n"
tail -n 20 /var/log/cron.log

printf "\n\n SHOW BTMP LAST 20 ROWS \n\n"
tail -n 20 /var/log/btmp

printf "\n\n REMOVE LOGS \n\n"
sudo rm -r /var/log/*.gz;
sudo rm -r /tmp/*;
#sudo rm -r .cache/;
#mkdir .cache;
# update server

printf "\n\n AUTOREMOVE \n\n"
sudo apt autoremove;

printf "\n\n CLEAN \n\n"
sudo apt-get clean;

printf "\n\n UPDATES \n\n"
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get dist-upgrade;
sudo apt autoremove;
sudo apt-get clean;

df -h

sudo needrestart -r i
if [ -f /var/run/reboot-required ]; then
  echo 'reboot required'
fi
#sudo reboot;
