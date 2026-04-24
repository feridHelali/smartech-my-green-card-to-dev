# Linux CLI Cheat Sheet

## Navigation
```bash
pwd                    # current directory
ls -la                 # list with hidden + details
cd /path/to/dir        # absolute path
cd ../..               # two levels up
cd ~                   # home directory
cd -                   # previous directory
```

## File Operations
```bash
cp src dest            # copy file
cp -r src/ dest/       # copy directory recursively
mv src dest            # move / rename
rm file                # delete file
rm -rf dir/            # delete directory ⚠️
mkdir -p a/b/c         # create nested dirs
ln -s target link      # symbolic link
```

## Viewing Files
```bash
cat file               # print entire file
less file              # paginated view (q to quit)
head -n 20 file        # first 20 lines
tail -n 20 file        # last 20 lines
tail -f file           # follow (live logs)
```

## Search
```bash
find . -name "*.js"    # find files by name
find . -type d         # find directories
grep -rn "pattern" .   # recursive search in files
grep -i "pattern" file # case-insensitive
grep -v "pattern" file # invert match (exclude)
```

## Permissions
```bash
chmod 755 file         # rwxr-xr-x
chmod +x script.sh     # add execute bit
chown user:group file  # change owner
ls -la                 # see permissions
```

## Permission bits: rwxrwxrwx (owner/group/others)
```
r = 4  w = 2  x = 1
7 = rwx   6 = rw-   5 = r-x   4 = r--
755 → owner: rwx, group: r-x, others: r-x
```

## Processes
```bash
ps aux                 # all processes
top / htop             # live process monitor
kill -9 <PID>          # force kill process
pkill <name>           # kill by name
& at end               # run in background
jobs                   # list background jobs
fg %1                  # bring job 1 foreground
```

## Networking
```bash
curl -X GET url        # HTTP GET
curl -X POST url -H "Content-Type: application/json" -d '{"k":"v"}'
wget url               # download file
netstat -tlnp          # listening ports
ss -tlnp               # modern netstat
ping host              # connectivity test
traceroute host        # route trace
nslookup domain        # DNS lookup
```

## Environment
```bash
export VAR=value       # set env variable
echo $VAR              # read env variable
env                    # list all env variables
source .env            # load .env file into shell
which node             # locate binary
```

## Pipes & Redirection
```bash
cmd1 | cmd2            # pipe stdout to stdin
cmd > file             # redirect stdout to file (overwrite)
cmd >> file            # redirect stdout to file (append)
cmd 2>&1               # redirect stderr to stdout
cmd 2>/dev/null        # discard errors
cat file | grep "err" | wc -l  # chain: count error lines
```

## Package Management
```bash
# Debian/Ubuntu
apt update && apt upgrade
apt install <package>
apt remove <package>

# RHEL/CentOS
yum install <package>
dnf install <package>   # modern yum
```

## SSH
```bash
ssh user@host           # connect
ssh -p 2222 user@host   # custom port
scp file user@host:/path  # copy file to remote
ssh-keygen -t ed25519   # generate key pair
ssh-copy-id user@host   # install public key
```

## Useful Combos
```bash
# Count files in directory
ls | wc -l

# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Watch log file for errors
tail -f app.log | grep -i error

# Disk usage, sorted
du -sh * | sort -rh | head -20

# System info
uname -a && free -h && df -h
```
