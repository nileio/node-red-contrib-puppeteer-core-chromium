# node-red-contrib-puppeteer-core

# Forked from node-red-contrib-puppeteer-new

Fork reason, chromium dependency issues in alpine when installed via npm. Solution: use `puppeteer-core` and use `apk` to install chromium

```
# Dockerfile example

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

NodeRED nodes to control a headless chrome with puppeteer

## Documentation

This project is in a very early stage, so nothing is documentated now. To get a raw idea you can have a look to the puppeteer documentation https://github.com/GoogleChrome/puppeteer/blob/v1.1.1/docs/api.md

