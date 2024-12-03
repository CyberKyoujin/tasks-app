# Python version
FROM python:3.11.5

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project
COPY . .

# Specify port 8000
EXPOSE 8000

# Run migrations and start server
CMD ["sh", "-c", "python backend/manage.py makemigrations && python backend/manage.py migrate && python backend/manage.py runserver 0.0.0.0:8000"]

