#!/bin/bash

docker build . -f ./pack/base_image/Dockerfile -t registry.cn-hangzhou.aliyuncs.com/fdblogimages/practice-server-base:$1