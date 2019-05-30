FROM node:10.16.0

# Switch to /i5sing-web
RUN mkdir -p /opt/i5sing-web
WORKDIR /opt/i5sing-web

# copy source
COPY . ./

# Install deps
RUN npm install yarn -g
RUN yarn

#Compile
RUN npm run build

# Ports
ENV PORT=3033
EXPOSE 3033

ENTRYPOINT ["npm", "start"]
