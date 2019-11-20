FROM nginx

COPY dist /usr/share/nginx/html
COPY distribution/nginx.conf /etc/nginx/nginx.conf
COPY distribution/entrypoint.sh /opt/entrypoint.sh
RUN chmod +x /opt/entrypoint.sh

STOPSIGNAL SIGQUIT

ENTRYPOINT [ "/opt/entrypoint.sh" ]
CMD [ "nginx", "-g", "daemon off;" ]