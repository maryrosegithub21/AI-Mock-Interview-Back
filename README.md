# Generative AI Interviewer

This project is an Express.js application that uses Google's Generative AI SDK to simulate a job interview. The AI acts as an interviewer, asking questions based on the user's responses and the specified job role.

## Features

- Uses Google's Generative AI SDK to generate interview questions.
- Customizable interview flow based on user responses.
- Validates the conversation format to ensure proper structure.
- Provides feedback at the end of the interview.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- A Google Generative AI API key

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/generative-ai-interviewer.git
    cd generative-ai-interviewer
    ```

2. Install the required packages:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your Google Generative AI API key:
    ```env
    API_KEY=your_google_generative_ai_api_key
    ```

## Usage

1. Start the server:
    ```sh
    node app.js
    ```

2. The server will run on `http://localhost:3002` by default.

3. To start an interview, send a POST request to `http://localhost:3002/api/interview` with the following JSON payload:
    ```json
    {
        "userResponse": "Your initial response",
        "conversation": [
            {
                "role": "interviewer",
                "parts": [
                    {
                        "text": "Tell me about yourself."
                    }
                ]
            }
        ],
        "role": "Software Engineer"
    }
    ```

## API Endpoint

### POST /api/interview

- **Description**: Starts an interview session with the AI interviewer.
- **Request Body**:
    - `userResponse` (string): The initial response from the user.
    - `conversation` (array): An array of conversation objects. Each object should have a `role` (string) and `parts` (array of objects with `text` (string)).
    - `role` (string): The job role for which the interview is being conducted.

- **Response**:
    - `aiResponse` (string): The AI interviewer's response.

## Example

Here is an example of how to use the API:

```sh
curl -X POST http://localhost:3002/api/interview \
-H "Content-Type: application/json" \
-d '{
    "userResponse": "I am a software engineer with 5 years of experience.",
    "conversation": [
        {
            "role": "interviewer",
            "parts": [
                {
                    "text": "Tell me about yourself."
                }
            ]
        }
    ],
    "role": "Software Engineer"
}'


Acknowledgements
Google Generative AI SDK
Express.js
dotenv
body-parser

Feel free to customize this README file further based on your specific needs and project details.