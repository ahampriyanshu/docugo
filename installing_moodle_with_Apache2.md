# Install Moodle with Apache2,MySQL and PHP-FPM
***
Moodle relies on a few pieces of software, including a spell-checking library and a graphing library. Moodle is a PHP application, and it has a few additional PHP library dependencies as well. Before we install Moodle, let’s install all of the prerequisite libraries using the package manager. First, ensure you have the latest list of packages:

``` $ sudo apt-get update ```
Then install Moodle’s dependencies:

``` $ sudo apt-get install aspell graphviz php7.4-curl php7.4-gd php7.4-intl php4.0-ldap php7.4-mysql php7.4-pspell php7.4-xml php7.4-xmlrpc php7.4-zip ```
Next, restart the Apache web server to load the modules you just installed:

``` $ sudo systemctl restart apache2 ```
Now we are ready to download and install Moodle itself. We’ll use curl to download Moodle from the official distribution server.
***
The following command will go to the Moodle website and get the compressed package that contains the entire current, stable version of Moodle into the file moodle.tgz. The -L flag tells curl to follow redirects.

``` $ curl -L https://download.moodle.org/download.php/direct/stable38/moodle-latest-38.tgz > moodle.tgz ```
Now we can uncompress the file with the tar program and place the resulting files in the web document root:

``` $ sudo tar -xvzf moodle.tgz -C /var/www/html```

***
``` $ sudo mkdir /var/www/moodledata ```

Then set its ownership to make sure that the web service user www-data can access the directory:

```$ sudo chown -R www-data /var/www/moodledata ```

Then change the permissions on the folder so that only the owner has full permissions:

```$ sudo chmod -R 0770 /var/www/moodledata
```
## Now set up your admin account
***
* Set the language you want to use and click Next.
* On the next screen, set the Data Directory to /var/moodledata and click Next.
* On the the Choose Database Driver page, set Database driver to Improved MySQL (native mysqli). Then click Next.
* On the Database setting page, enter the username and password for the Moodle MySQL user. The other ### fields can be left as they are. Click Next to continue.
* Review the license agreement and confirm that you agree to its terms by pressing Continue.
* Review the Server Checks page for any possible issues. Ensure the message “Your server environment meets all minimum requirements” exists at the bottom and press Continue.
* Moodle will install several components, displaying “Success” messages for each. Scroll to the bottom and press Continue.
* You’ll then see a page where you can set up your administrator account for Moodle.
* For Username, enter anything you’d like, ar accept the default.
* For Choose an authentication method, leave the default value in place.
* For New password, enter the password you’d like to use.
* For Email, enter your email address.
* Set the rest of the fields to appropriate values.
* Click Update profile.
* On the Front Page Settings screen, fill in the Full site name, the Short name for site, set a location, and select whether you want to allow self-registration via email. Then click Save changes.
* Once you’ve done this. you’ll be taken to the dashboard of your new Moodle installation, logged in as the admin user.
