#!/bin/bash

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
