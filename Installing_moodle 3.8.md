# Step 1: Install Ubuntu 14.04LTS

Server Edition amd64 Preferred

http://www.ubuntu.com/download
Ubuntu Server 14.04LTS amd64 has all the required packages for upgrading to Moodle 2.7
Ubuntu Server 14.04LTS has some minor differences from 12.04LTS, mainly to the Apache Sites Configuration, now resides at /etc/apache2/sites-available/000-default.conf and the Default Webroot now at /var/www/html/. This document has been updated to reflect those changes.
Step 2: Install Apache/MySQL/PHP
Open up Terminal and install the following;

sudo apt-get update sudo apt-get install apache2 mysql-client mysql-server php5
'It will prompt you to set the root password for mysql - take note of it, you will need it in step 6.

Step 3: Install Additional Software
sudo apt-get install graphviz aspell php5-pspell php5-curl php5-gd php5-intl php5-mysql php5-xmlrpc php5-ldap
Restart Apache so that the modules are loaded correctly

sudo service apache2 restart
We will be using Git to install/update the Moodle Core Application

sudo apt-get install git-core
Step 4: Download Moodle
Setup your local repository and download Moodle, We will use /opt for this installation.

cd /opt

sudo git clone git://git.moodle.org/moodle.git

cd moodle

sudo git branch -a

sudo git branch --track MOODLE_26_STABLE origin/MOODLE_26_STABLE

sudo git checkout MOODLE_26_STABLE
Step 5: Copy local repository to /var/www/html/
sudo cp -R /opt/moodle /var/www/html/ sudo mkdir /var/moodledata sudo chown -R www-data /var/moodledata sudo chmod -R 777 /var/moodledata sudo chmod -R 0755 /var/www/html/moodle
Step 6: Setup MySQL Server
First we need to change the default storage engine to innodb

You should not need to make innodb the default storage engine anymore, the latest version of Moodle will select it automatically during install. It is always a good idea to make it default anyway.
sudo vi /etc/mysql/my.cnf
Scroll down to the [mysqld] section and under Basic Settings add the following line under the last statement

default-storage-engine = innodb
In order to save my.cnf using the editor, press the Esc (Escape) key, type the following in sequence which will save :w then close the editor :q

:w :q
Restart MySQL Server for changes to take effect

sudo service mysql restart
Now we need to create the Moodle MySQL User with the correct permissions

Use the password you created in step 1

mysql -u root -p mysql>CREATE DATABASE moodle DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
Where it says "moodledude" and "passwordformoodledude" you should change to the username and password of your choosing.

mysql>GRANT SELECT,INSERT,UPDATE,DELETE,CREATE,CREATE TEMPORARY TABLES,DROP,INDEX,ALTER ON moodle.* TO moodledude@localhost IDENTIFIED BY 'passwordformoodledude'; mysql>quit;
Step 7: Complete Setup
Note - If you are not comfortable using terminal to create the config.php file that needs to be created when going through the installer, you should temporarily make the webroot writable by doing the following:
sudo chmod -R 777 /var/www/moodle
After you have ran the installer and you have moodle setup, you NEED to revert permissions so that it is no longer writable using the below command.

sudo chmod -R 0755 /var/www/moodle
Open your browser and go to http://IP.ADDRESS.OF.SERVER/moodle

Follow the prompts selecting:

Database Type
Choose: mysqli

Database Settings
Host server: localhost

Database: moodle

User: moodledude (the user you created when setting up the database)

Password: passwordformoodledude (the password for the user you created)

Tables Prefix: mdl_

Environment Checks
This will indicate if any elements required to run moodle haven't been installed.

Next next next...
follow prompts and confirm installation

Create a Site Administrator Account
Create your moodle user account which will have site administrator permissions.

The password you select has to meet certain security requirements.

Installation Complete
Congrats! You can now start using Moodle!

Don't Forget
If you made the webroot writable, revert permissions

sudo chmod -R 0755 /var/www/moodle
System Paths After Install
After installing Moodle you should set the system paths.

Navigate to Site Administration > Server > System Paths

Input the following;

Path to Du: /usr/bin/du

Path to Apsell: /usr/bin/aspell

Path to dot: /usr/bin/dot

Save Changes

Suggestions: Enable Zend OpCache/Change Document Root
Since we have installed Ubuntu Server 14.04LTS, we can use the built-in PHP OPcache, https://docs.moodle.org/26/en/OPcache
Within the link above, https://docs.moodle.org/26/en/OPcache add the recommended settings to your 05-opcache.ini file.

sudo vi /etc/php5/apache2/conf.d/05-opcache.ini
Restart Apache for changes to take effect.

sudo service apache2 restart
That's it for the Zend OpCache!

You can also install a GUI to view the status of your Zend OpCache, not recommended on production servers.

cd /var/www/html/moodle/
Download the PHP Script to your Moodle directory, you should also add this file to /opt/moodle/.git/info/exclude file so it does not get removed when upgrading your installation.

sudo wget https://github.com/rlerdorf/opcache-status/blob/master/opcache.php
Visit http://ip.address.of.server/moodle/opcache.php

Don't like http://ip.address.of.server/moodle?

Open up Apache Config and change the document root

sudo vi /etc/apache2/sites-available/000-default.conf
On the line where DocumentRoot is;


Change From: DocumentRoot /var/www/html

Change To: DocumentRoot /var/www/html/moodle
:w :q
Restart Apache for changes to take effect.

sudo service apache2 restart
Important note!

If you have already installed Moodle then you should make the below changes.

Edit config.php for Moodle

Under $CFG->wwwroot change to http://ip.address.of.server/ instead of http://ip.address.of.server/moodle
