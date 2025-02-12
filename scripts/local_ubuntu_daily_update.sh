#!/bin/bash
df -h

printf "\n\n CREATE BACKUP FROM LOCALHOST DATABASES \n"
USER="root"
PASSWORD=""
HOST="localhost"
# Backup directory
BACKUP_DIR="/backup"
mkdir -p "$BACKUP_DIR"
# Date format for backup files
DATE=$(date +"%Y.%m.%d.%H:%M:%S")
# Get a list of all databases
DATABASES=$(mysql -u "$USER" -h "$HOST" -e "SHOW DATABASES;" | grep -Ev "(Database|information_schema|performance_schema|mysql|sys)")
# Loop through each database and back it up
for DB in $DATABASES; do
  BACKUP_FILE="$BACKUP_DIR/${DB}_backup_$DATE.sql"
  echo "Backing up $DB to $BACKUP_FILE"
  # Dump the database
  mysqldump -u "$USER" -h "$HOST" "$DB" > "$BACKUP_FILE"
  # Check if the backup was successful
  if [ $? -eq 0 ]; then
    echo "Backup of $DB successful!"
    # Compress the SQL file
    gzip "$BACKUP_FILE"
    # Check if compression was successful and remove the original .sql file
    if [ $? -eq 0 ]; then
      echo "Compression of $BACKUP_FILE successful! Saved as $BACKUP_FILE.gz"
    else
      echo "Compression of $BACKUP_FILE FAILED!"
    fi
  else
    echo "Backup of $DB FAILED!"
  fi
done

printf "\n\n SHOW XSESSION-ERRORS \n";
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

printf "\n\n *** removes old revisions of snaps *** \n"
# CLOSE ALL SNAPS BEFORE RUNNING THIS
set -eu
snap list --all | awk '/disabled/{print $1, $3}' |
    while read snapname revision; do
        sudo snap remove "$snapname" --revision="$revision"
    done
sudo snap refresh --list
sudo snap refresh


printf "\n\n *** UPDATE COMPOSER AND COMPOSER UPDATE *** \n\n"
composer --version
composer self-update --stable
composer --version
#composer update;

printf "\n\n *** UPDATE NPM AND NPM UPDATE *** \n\n"
npm -v
npm install -g npm@latest
npm install -g npm-check-updates
npm -v
npm update;

df -h

printf "\n\n check reboot is needed or not \n"
sudo needrestart -r i
if [ -f /var/run/reboot-required ]; then
	printf "\n\n REBOOT REQUIRED \n"
fi

printf "\n\n start Apache2 and MySQL \n"
sudo netstat -nap | grep apache2 | grep :80;
sudo systemctl status apache2 | grep "Main PID"
sudo systemctl restart apache2.service; sudo systemctl restart mysql.service;

printf "\n\n update certificates \n"
sudo update-ca-certificates

printf "\n\n start redshift \n"
redshift -l 47.49:19.04 -t 5500:3000 -g 0.90 -m randr -b 0.90 -v &

printf "\n\n start MailHog \n"
~/go/bin/MailHog &

# Xampp start
#sudo cp /dev/null /opt/lampp/logs/php_error_log
#sudo /opt/lampp/xampp restart;
# Vagrant update
#cd Homestead;
#vagrant up --provision;
