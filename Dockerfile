FROM httpd:2.4
COPY ./src/ /usr/local/apache2/htdocs/
COPY .conf /usr/local/apache2/conf/httpd.conf
