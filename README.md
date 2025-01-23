# WebDevTools
###### Version: 2025.01.23.1

Useful files and informations for any developer.

---

## Usage

Under `useful` folder there are multiple files which can be used in any (new) project.

 - *typography-content.html*: copy this content into your CMS to see universally what basic elements looks like

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

### File

Rename files and resize images in directory.

```
i=1;
for file in ./*;
    do
        filename=$(basename "$file");
        extension="${filename##*.}";
        file_mime=$(file --mime-type "${file}");
        mime=$(echo "$file_mime" | awk '{ print $2 }');
        if [[ "$mime" == "image/jpeg" || "$mime" == "image/png" ]]; then
            convert -resize 1500x1500 $file $file;
            echo "$file image converted";
        fi
        mv "$file" 20230702-Budapest-$i."${extension}";
        i=$((i+1));
    done
```
