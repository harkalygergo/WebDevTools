#!/bin/bash
df -h

printf "\n\n show xsession-errors \n";
cd
tail -n 30 .xsession-errors
printf "\n\n remove xsession-errors \n";
rm .xsession-errors

printf "\n\n empty php_error_log \n";
sudo cp /dev/null /opt/lampp/logs/php_error_log

printf "\n clear cache \n"
cd .cache
shopt -s extglob
sudo rm -rv !("JetBrains")
sudo journalctl --vacuum-time=1d
#sudo rm -r /var/log/*.gz;
#sudo rm -r /tmp/*;
sudo apt autoremove;
sudo apt-get clean;
sudo apt-get update;
sudo apt-get upgrade;
sudo apt-get dist-upgrade;
sudo apt autoremove;
sudo apt-get clean;

printf "\n\n removes old revisions of snaps \n"
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu
snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        sudo snap remove "$snapname" --revision="$revision"
    done
sudo snap refresh --list
sudo snap refresh

df -h

printf "\n\n start Apache2 and MySQL \n"
sudo netstat -nap | grep apache2 | grep :80;
sudo systemctl status apache2 | grep "Main PID"
sudo systemctl restart apache2.service; sudo systemctl restart mysql.service;

printf "\n\n start redshift \n"
redshift -l 47.49:19.04 -t 5500:3000 -g 0.80 -m randr -b 0.85 -v &

printf "\n\n start MailHog \n"
~/go/bin/MailHog &

# Xampp start
#sudo cp /dev/null /opt/lampp/logs/php_error_log
#sudo /opt/lampp/xampp restart;
# Vagrant update
#cd Homestead;
#vagrant up --provision;
