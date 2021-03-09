# node-red-contrib-puppeteer-core-chromium

> NodeRED nodes to control a headless chrome/chromium browswer with puppeteer.

## Get started

You'll usually use nodes in this order:

```
launch -> new page -> goto -> selector/click/screenshot/etc
```

You can specify the location of your chrome/chromium browser in `launch` node.

*To learn how to use puppeteer, see it's [documentation](https://pptr.dev/).*

-----

## Using with alpine docker

```
# Dockerfile

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    ttf-freefont \
    chromium \
    # Cleanup
    && apk del --no-cache make gcc g++ python binutils-gold gnupg libstdc++ \
    && rm -rf /usr/include \
    && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
    && echo
```