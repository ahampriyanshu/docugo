&emsp;&emsp;&emsp;&emsp; <img src="/images/moodlelogo.png" width="200" height="200"/>  &emsp;&emsp;&emsp; <img src="/images/NGINX.png" height="200" width="400"/>
# What if moodle is running in plain HTML without CSS
## Slashing arguments in NGINX
***
You will need to add the following 'slash arguments' in the nginx.conf file to enable CSS.[further explanation of slash arguments](https://docs.moodle.org/37/en/Using_slash_arguments)<br>

``` vim /etc/nginx/nginx.conf ```

``` 
    location ~ [^/]\.php(/|$) {
    fastcgi_split_path_info  ^(.+\.php)(/.+)$;
    fastcgi_index            index.php;
    fastcgi_pass             127.0.0.1:9000 (or your php-fpm socket);
    include                  fastcgi_params;
    fastcgi_param   PATH_INFO       $fastcgi_path_info;
    fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;<br>
} 
```

If the above does not work try this:

```
    location ~ ^(.+\.php)(.*)$ {
    root /usr/share/nginx/html/moodle/;
    fastcgi_split_path_info  ^(.+\.php)(.*)$;
    fastcgi_index            index.php;
    fastcgi_pass             127.0.0.1:9000;
    include /etc/nginx/mime.types;
    include                  fastcgi_params;
    fastcgi_param   PATH_INFO       $fastcgi_path_info;
    fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
```
**! Voila !**
