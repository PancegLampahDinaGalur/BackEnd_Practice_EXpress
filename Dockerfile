# Use the official Node.js image as the base image
FROM node:16.13


# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate-

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["sh", '-c',  "npx prisma migrate dev & yarn dev"]