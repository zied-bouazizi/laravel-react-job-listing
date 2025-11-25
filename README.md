# Laravel React Job Listing

An application for browsing and managing jobs with Laravel and React.

## Features

1. User registration and login
2. Browse all public jobs
3. Search and filter jobs
4. Authenticated users can manage their own jobs
5. View only the jobs created by the logged-in user
6. Display job details with full information

## Installation

> [!TIP]
> Make sure your environment is set up properly. You will need PHP 8.2, Composer and Node.js installed and the commands `php`, `composer`, `node` and `npm` should be available in your terminal.

1. Clone the project
2. Navigate to the project's root directory using terminal
3. Copy `.env.example` into `.env` file `cp .env.example .env`
4. Open `.env` and configure database credentials
5. Run `composer install`
6. Set application key `php artisan key:generate --ansi`
7. Run migrations `php artisan migrate`
8. Start artisan server `php artisan serve`
9. Open new terminal and navigate to the `react` folder
10. Copy `react/.env.example` into `.env` and adjust the `VITE_API_BASE_URL` parameter
11. Run `npm install`
12. Start vite server for React `npm run dev`
