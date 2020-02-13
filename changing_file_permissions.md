# In Linux and Unix, everything is a file,directories are files, files are files and even devices are files.

Each file has access restrictions with permissions, user restrictions with owner/group association. Permissions are referred to as bits.. With the help of some of the user-friendly desktop interfaces available for example Ubuntu,Kali,Fedorra,etc user can change the file permission and even ownership with GUI.
***
## With CLI
To change or edit files that are owned by root, sudo must be used.
The commands for modifying file permissions and ownership are:

* chmod – change permissions
* chown – change ownership.
There are three types of access restrictions:

|Permission | Action | chmod option |
|-----------|--------|--------------|
|read       | view | 	r or 4      |
|write      | edit |  w or 2      |
|execute    | execute|  x or 1      |

|User | ls -l  |
|-----------|--------|
| owner     |-rwx------| 	
| gruop     | ----rwx---| 
| other    | -------rwx|


| Options | Definition |
----------|------------|
|u |owner | 
|g |group |
|o |other |
|a |all |
|x |execute|
|w |write|
|r |read |
|+|add permission|
|-|remove permission|
|=|set permission|





***
## With GUI

* Open Nautilus(default file manager in ubuntu)
* Navigate to the target file or folder
* Right click the file or folder
* Select Properties
* Click on the Permissions tab
* Click on the Access files in the Others section
* Select “Create and delete files”
* Click Change Permissions for Enclosed Files
* In the resulting window, Select Read and Write under Files and Create and delete files under Folders (Figure A)
* Click Change
* Click Close.
