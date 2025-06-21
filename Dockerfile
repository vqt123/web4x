# Use an image that already has Chrome installed
FROM ghcr.io/puppeteer/puppeteer:21.5.2

# Switch to pptruser and set working directory
USER pptruser
WORKDIR /home/pptruser

# Copy files
COPY --chown=pptruser:pptruser test-web4x.js ./
COPY --chown=pptruser:pptruser index.html ./
COPY --chown=pptruser:pptruser game-config.json ./

# Create screenshots directory
RUN mkdir -p /home/pptruser/screenshots

CMD ["node", "test-web4x.js"]