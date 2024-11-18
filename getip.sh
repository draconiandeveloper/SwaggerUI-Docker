#!/bin/sh

#
# Since we renamed the Docker container to "openapi-webserver", we can use that in lieu of
#  the randomly generated Docker container name, thus making it easier to find the IP address
#  of the Docker container's bridged networking interface. This will be the IP address that
#  we can use to access the web server through the web browser on our host system.
#
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' openapi-webserver
