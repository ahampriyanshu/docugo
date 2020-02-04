<img src="/images/moodlelogo.png" width="200" height="200"/>           <img src="/images/NGINX.png" height="200" width="400"/>
# What if moodle is running in plain HTML without CSS
***
## PHP-FPM
Nginx is usually configured to interface with PHP via php-fpm.PHP-FPM's default behaviour for pools is usually to restrict the execution of scripts to a specific extension, for example .php. You should ensure that your php-fpm is configured 

 ``` vim /etc/php5/fpm/pool.d/www.conf ```
* Add .php extention
``` security.limit_extensions = .php ```

## Slashing arguments in NGINX
***
Nginx
Add the following 'slash arguments' compatible 'location' block to your vhosts 'server' in your nginx configuration (further explanation at 'Using slash arguments').

nginx.conf location:

location ~ [^/]\.php(/|$) {
    fastcgi_split_path_info  ^(.+\.php)(/.+)$;
    fastcgi_index            index.php;
    fastcgi_pass             127.0.0.1:9000 (or your php-fpm socket);
    include                  fastcgi_params;
    fastcgi_param   PATH_INFO       $fastcgi_path_info;
    fastcgi_param   SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
If the above does not work try the following: Note: This was for CentOS 7.6 (1804), MariaDB 10.3, Nginx 1.15 and PHP 7.3.5

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
