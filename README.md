# React App Deployment with Jenkins on AWS EC2 (Amazon Linux)

This guide explains how to deploy a React app on an AWS EC2 Linux server using Jenkins and Nginx.

## Project Flow

GitHub → Jenkins → Build React App → Deploy to Nginx

Whenever you push code to GitHub, Jenkins will pull the latest code, build it, and deploy it automatically.

---

## Prerequisites

- AWS EC2 Instance on :contentReference[oaicite:0]{index=0}
- `.pem` key pair
- GitHub repository with React project on :contentReference[oaicite:1]{index=1}
- Security Group ports open:

| Port | Use |
|------|-----|
| 22 | SSH |
| 8080 | Jenkins |
| 80 | Website |

---

## Step 1: Connect to EC2

```bash
chmod 400 jenkins3211.pem
ssh -i "jenkins3211.pem" ec2-user@YOUR_PUBLIC_IP
```

Switch to root user:

```bash
sudo su
```

---

## Step 2: Install Required Packages

```bash
dnf update -y
dnf install git nodejs nginx -y
```

Check versions:

```bash
git --version
node -v
nginx -v
```

---

## Step 3: Install Java 21

Latest :contentReference[oaicite:2]{index=2} requires Java 21.

```bash
dnf install java-21-amazon-corretto -y
alternatives --config java
```

Choose Java 21 and verify:

```bash
java -version
```

---

## Step 4: Install Jenkins

```bash
wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo

rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io-2023.key

dnf install jenkins -y
```

---

## Step 5: Set Java Path for Jenkins

Edit file:

```bash
nano /etc/sysconfig/jenkins
```

Add:

```bash
JENKINS_JAVA_CMD="/usr/lib/jvm/java-21-amazon-corretto.x86_64/bin/java"
```

Save and exit.

---

## Step 6: Start Jenkins

```bash
systemctl daemon-reload
systemctl enable jenkins
systemctl restart jenkins
systemctl status jenkins
```

If successful:

```bash
active (running)
```

---

## Step 7: Get Jenkins Initial Password

```bash
cat /var/lib/jenkins/secrets/initialAdminPassword
```

Copy the password.

---

## Step 8: Open Jenkins in Browser

```text
http://YOUR_PUBLIC_IP:8080
```

- Paste password  
- Install suggested plugins  
- Create admin user

---

## Step 9: Configure Nginx

Open config:

```bash
nano /etc/nginx/nginx.conf
```

Inside server block:

```nginx
location / {
    root /usr/share/nginx/html;
    index index.html;
    try_files $uri /index.html;

    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

Restart Nginx:

```bash
nginx -t
systemctl restart nginx
systemctl enable nginx
```

---

## Step 10: Allow Jenkins sudo Without Password (Important)

To allow Jenkins to restart Nginx or copy files without password:

```bash
sudo visudo
```

Add this line at the bottom:

```bash
jenkins ALL=(ALL) NOPASSWD: ALL
```

Save and exit.

### Why This Is Needed

:contentReference[oaicite:3]{index=3} runs jobs using the `jenkins` user.  
Without sudo permission, commands like below may fail:

```bash
sudo systemctl restart nginx
sudo cp -r build/* /usr/share/nginx/html/
```

---

## Step 11: Create Jenkins Job

Go to Jenkins Dashboard:

- Click **New Item**
- Enter name: `react-app`
- Select **Freestyle Project**
- Click **OK**

---

## Step 12: Connect GitHub Repository

Inside Jenkins Job:

### Source Code Management

Select **Git**

Repository URL:

```text
https://github.com/yourusername/react-app.git
```

Branch:

```text
main
```

---

## Step 13: Add Build Step

Add **Execute Shell**

```bash
npm install
npm run build
sudo cp -r build/* /usr/share/nginx/html/
sudo systemctl restart nginx
```

Save the job.

---

## Step 14: Build Project

Click:

```text
Build Now
```

After success, open:

```text
http://YOUR_PUBLIC_IP
```

Your React app will be live.

---

## Step 15: Auto Deploy on Git Push

:contentReference[oaicite:4]{index=4} Repo → Settings → Webhooks

Add:

```text
http://YOUR_PUBLIC_IP:8080/github-webhook/
```

Content type:

```text
application/json
```

Now every push to GitHub triggers Jenkins build.

---

## Useful Commands

Check Jenkins:

```bash
systemctl status jenkins
```

Check Nginx:

```bash
systemctl status nginx
```

Check Jenkins logs:

```bash
journalctl -xeu jenkins.service
```

---

## Done

Your React app is now deployed using :contentReference[oaicite:5]{index=5} on :contentReference[oaicite:6]{index=6} EC2 with automatic CI/CD.

```
