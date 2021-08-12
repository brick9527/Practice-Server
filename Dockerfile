FROM registry.cn-hangzhou.aliyuncs.com/fdblogimages/practice-server-base:0.1.0

LABEL author="brick9527<brick9527@foxmail.com>"
LABEL name="practice_server_base"

USER root
WORKDIR /practice-server
COPY . /practice-server/
RUN rm -r /practice-server/template

WORKDIR /template
COPY template /template/
RUN npm i --production

WORKDIR /practice-server

EXPOSE 3000

CMD [ "npm", "run", "start" ]
