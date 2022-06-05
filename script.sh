#!/bin/bash 
docker build -t debbyiscoding .
docker run -d -p 80:3000 --name=debbyiscoding debbyiscoding