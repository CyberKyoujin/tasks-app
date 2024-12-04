# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install system dependencies (if needed)
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements.txt
COPY base/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the backend code into the container
COPY . .

# Expose port 8000 for Django development server
EXPOSE 8000

# Run migrations and start the server
CMD ["sh", "-c", "python base/manage.py migrate && python base/manage.py runserver 0.0.0.0:8000"]

