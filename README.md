# WebDevTools

Useful files and informations for any developer.

---

## Usage

Under `useful` folder there are multipe files which can be used in any (new) project.

 - *typography-content.html*: copy this content into your CMS to see unirsally what basic elements looks like

## Useful links

PHP Standards Recommendations

- https://www.php-fig.org/psr/
  - magyar fordítás: https://github.com/dominicus75/fig-standards
- https://phptherightway.com/

PHP Standards based packages

- https://thephpleague.com/

PHP Debug tools

- https://phpstan.org/

Server test

- https://bench.sh/

## Useful commands

### Git

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

### Snap

Install .snap file: `sudo snap install --dangerous [FILE.snap]`

### Symfony

Make entity and repository: `php bin/console make:entity`

Migrate database: `php bin/console make:migration`

Make a Controller: `symfony console make:controller XYZController`
