FROM node:16


# Set working directory
WORKDIR /opt/API_backend

# Add package.json and package-lock.json
COPY package.json package-lock.json /opt/API_backend/

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . /opt/API_backend

# Expose the port the app runs on
EXPOSE 3001

# Start the application
CMD ["npm", "start"]
