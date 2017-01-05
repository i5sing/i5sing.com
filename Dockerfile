FROM node:6.9

# Switch to /i5sing-web
RUN mkdir -p /opt/i5sing-web
WORKDIR /opt/i5sing-web

# copy source
COPY . ./

# Install deps
RUN npm install

#Compile
RUN npm run build

# Ports
ENV PORT=3033
EXPOSE 3033

ENTRYPOINT ["npm", "start"]