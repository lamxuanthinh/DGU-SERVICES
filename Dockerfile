FROM node:20
WORKDIR /app
RUN npm i npm@latest -g
COPY package.json package-lock.json  ./
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ];\
    then npm ci; \
    else npm ci --only=production; \
    fi
COPY . ./
EXPOSE 5005
CMD ["npm","start"]



