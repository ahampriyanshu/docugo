# Common error one may face while installing moodle
***
## 504 timeout error
A 504 Gateway Timeout Error indicates that a web server attempting to load a page for you did not get a timely response from another server from which it requested information.

Edit to nginx.conf file 

``` nano /etc/nginx/nginx.conf ```

Add these variables to nginx.conf file:

http {  
  
  proxy_connect_timeout       600;
  proxy_send_timeout          600;
  proxy_read_timeout          600;
  send_timeout                600;
  fastcgi_read_timeout        180;
  client_header_timeout       600;
  client_body_timeout         600;
  client_max_body_size        32m;
  fastcgi_buffers 8           128k;
  fastcgi_buffer_size         128k;
}

And then restart:

``` service nginx reload 
    service nginx restart
```
