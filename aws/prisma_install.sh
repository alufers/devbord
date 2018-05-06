#!/bin/bash
apt-get update -qq
apt-get install -y apt-transport-https ca-certificates git
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" | tee /etc/apt/sources.list.d/docker.list
apt-get update -qq
apt-get purge lxc-docker || true
apt-get -y install linux-image-extra-$(uname -r) linux-image-extra-virtual
apt-get -y install docker-engine
usermod -aG docker ubuntu
mkdir -p /etc/systemd/system/docker.service.d
# printf "[Service]\nExecStart=\nExecStart=/usr/bin/dockerd -H fd:// -H tcp://0.0.0.0:2375\n" >>  /etc/systemd/system/docker.service.d/docker.conf
systemctl daemon-reload
systemctl restart docker
curl -L https://github.com/docker/compose/releases/download/1.21.0/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
mkdir -p /home/ubuntu
cd /home/ubuntu
git clone https://github.com/alufers/devbord.git
cd devbord
cd server
docker-compose up -d
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
command -v nvm
npm i -g prisma
sleep 20
prisma deploy
