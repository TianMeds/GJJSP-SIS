# GJJSP Project

## Introduction

This is the repository for the GJJSP (Gado and Jess Jalandoni Scholarship Information System) project. It consists of both backend and frontend components.

## Prerequisites

Before running this project on your local system, ensure that you have the following prerequisites installed:

- Node.js
- PHP 8.2

## Getting Started

### Backend

1. Navigate to the backend folder:
    ```bash
    cd gjjsp-backend
    ```

2. Inside the `gjjsp-backend` directory, clone the Laradock repository:
    ```bash
    cd gjjsp-backend
    *sudo rm -rf laradock* # NOTE: Italicize should be in the folder of the first gjjsp-backend
    git clone https://github.com/Laradock/laradock.git
    ```

3. Install the dependencies by running:
    ```bash
    composer install
    # or if you have already installed
    composer update
    ```

4. Create your own `.env` file in the `gjjsp-backend` directory.

5. Finally, go to the `laradock` folder and start the Docker containers:
    ```bash
    cd laradock
    docker-compose up -d nginx
    ```

### Frontend

1. Navigate to the frontend folder:
    ```bash
    cd gjjsp-frontend
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the frontend:
    ```bash
    npm run dev
    ```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the terms of the [BSD 3 Clause License](LICENSE).
