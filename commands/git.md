# Git console commands

Lokális git állapot megtekintése, változások, commit-olt fájlok ellenőrzése:

`git status`

Minden fájlváltozás hozzáadása az adott branch-hez:

`git add --all`

Authentikáció megőrzése

`git config credential.helper store`

Komment hozzáfűzése az adott git állapothoz:

`git commit -m "[szöveg]"`

Változások és üzenet felküldése a GIT szerverre:

`git push -u origin [branch]`

Változások lehúzása a GIT szerverről:

`git pull`

Lokális változások eldobása:

`git checkout -- [FÁJL ÚTVONALLAL]`

Legutóbbi commit visszavonása:

`git reset --soft HEAD~1`

Fájl visszaállítása a szülő branch állapotára:

`git checkout [origin/develop] -- [FÁJLNÉV]`

Fájl törlése Git verziókövetésből:

`git rm -r --cached [FILE/DIRECTORY]`
