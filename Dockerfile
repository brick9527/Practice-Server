FROM ubuntu:18.04

LABEL Author="brick9527<brick9527@foxmail.com>"

ENV DEBIAN_FRONTEND="noninteractive"

USER root
WORKDIR /practice-server
COPY . /practice-server/
RUN rm -r /practice-server/template

RUN sed -i s@/archive.ubuntu.com/@/mirrors.aliyun.com/@g /etc/apt/sources.list
RUN apt update
RUN apt upgrade

# 安装tzdata
RUN apt-get update \
&& apt-get install -y apt-utils tzdata \
&& cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
&& dpkg-reconfigure -f noninteractive tzdata \
&& date "+%Y-%m-%d %H:%M:%S"

# 安装node
RUN apt install -y wget
RUN wget https://cdn.npm.taobao.org/dist/node/v14.17.4/node-v14.17.4-linux-x64.tar.gz -P .; \
  tar -zxvf node-v14.17.4-linux-x64.tar.gz; \
  rm node-v14.17.4-linux-x64.tar.gz
ENV PATH=$PATH:/practice-server/node-v14.17.4-linux-x64/bin
RUN node --version && npm --version

# 安装项目依赖
RUN set -x \
  && npm i --production

WORKDIR /template

COPY template /template/
RUN set -x \
  && npm i --production

WORKDIR /practice-server

EXPOSE 3000

CMD [ "npm", "run", "start" ]
