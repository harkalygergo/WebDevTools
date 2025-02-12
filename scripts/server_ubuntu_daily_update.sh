#!/bin/bash
 # STATUS
#/etc/init.d/clamav-daemon status
#sudo /etc/init.d/dovecot status
# clean server
df -h

printf "\n\n *** SHOW SIZE OF /var/log *** \n\n"
du -h /var/log

printf "\n\n *** SHOW SYSLOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/syslog

printf "\n\n *** SHOW AUTH LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/auth.log

printf "\n\n *** SHOW MAIL LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/mail.log

printf "\n\n *** SHOW BOOT LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/boot.log

printf "\n\n *** SHOW DAEMON LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/daemon.log

printf "\n\n *** SHOW KERN LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/kern.log

printf "\n\n *** SHOW CRON LOG LAST 20 ROWS *** \n\n"
tail -n 20 /var/log/cron.log

#printf "\n\n *** SHOW BTMP LAST 20 ROWS *** \n\n"
#tail -n 20 /var/log/btmp

printf "\n\n *** EMPTY ROUNDCUBE IMAP AND SMTP LOGS *** \n\n"
tail /var/log/roundcube/imap.log
cat /dev/null > /var/log/roundcube/imap.log
tail /var/log/roundcube/smtp.log
cat /dev/null > /var/log/roundcube/smtp.log

printf "\n\n *** REMOVE ZIPPED LOGS *** \n\n"
sudo rm -r /var/log/*.gz;
#sudo rm -r /tmp/*;
#sudo rm -r .cache/;
#mkdir .cache;
# update server

printf "\n\n *** AUTOREMOVE *** \n\n"
sudo apt autoremove;

printf "\n\n *** CLEAN *** \n\n"
sudo apt-get clean;

printf "\n\n *** UPDATES *** \n\n"
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get dist-upgrade;
sudo apt autoremove;
sudo apt-get clean;

printf "\n\n *** UPDATE COMPOSER *** \n\n"
composer --version
composer self-update --stable
composer --version
composer update;

printf "\n\n *** UPDATE NPM *** \n\n"
npm -v
npm install -g npm@latest
npm install -g npm-check-updates
npm -v
npm update;

df -h

printf "\n\n *** CHECK RESTART AND REBOOT REQUIRED *** \n\n"
sudo needrestart -r i
if [ -f /var/run/reboot-required ]; then
  echo 'reboot required'
fi
#sudo reboot;
