#!/bin/sh

/usr/local/bin/aws s3 cp ./data s3://tyson.gern.us/hangry/data --recursive --acl public-read
/usr/local/bin/aws s3 cp ./fonts s3://tyson.gern.us/hangry/fonts --recursive --acl public-read
/usr/local/bin/aws s3 cp ./js s3://tyson.gern.us/hangry/js --recursive --acl public-read
/usr/local/bin/aws s3 cp ./style s3://tyson.gern.us/hangry/style --recursive --acl public-read
/usr/local/bin/aws s3 cp ./index.html s3://tyson.gern.us/hangry/ --acl public-read