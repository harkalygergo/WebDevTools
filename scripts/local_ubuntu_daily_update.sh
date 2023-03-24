#!/bin/bash
df -h
echo "xsession-errors";
tail -n 30 .xsession-errors
rm .xsession-errors
cd
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
sudo systemctl status apache2 | grep "Main PID"
sudo service apache2 stop;
sudo service apache2 start;
sudo netstat -nap | grep apache2 | grep :80;
df -h;
# Removes old revisions of snaps
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu
snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        sudo snap remove "$snapname" --revision="$revision"
    done
df -h
sudo snap refresh --list
sudo snap refresh
# Xampp start
#sudo cp /dev/null /opt/lampp/logs/php_error_log
#sudo /opt/lampp/xampp restart;
# Vagrant update
#cd Homestead;
#vagrant up --provision;
