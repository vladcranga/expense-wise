/**
 * AWS Lambda function for calculator operations.
 * Expects JSON body: { "operation": "+|-|*|/", "num1": number, "num2": number }
 * Returns: { "result": number }
 */
exports.handler = async (event) => {
    try {
        // Parse the request body
        const body = typeof event.body === 'string' ? JSON.parse(event.body) : event;
        
        const { operation, num1, num2 } = body;
        
        // Convert to numbers
        const n1 = parseFloat(num1);
        const n2 = num2 !== null ? parseFloat(num2) : null;
        
        // Perform calculation
        let result;
        switch (operation) {
            case '+':
                result = n1 + n2;
                break;
            case '-':
                result = n1 - n2;
                break;
            case '*':
                result = n1 * n2;
                break;
            case '/':
            case '÷':
                if (n2 === 0) {
                    return {
                        statusCode: 400,
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type',
                            'Access-Control-Allow-Methods': 'POST, OPTIONS'
                        },
                        body: JSON.stringify({ error: 'Division by zero' })
                    };
                }
                result = n1 / n2;
                break;
            default:
                return {
                    statusCode: 400,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Content-Type',
                        'Access-Control-Allow-Methods': 'POST, OPTIONS'
                    },
                    body: JSON.stringify({ error: `Unsupported operation: ${operation}` })
                };
        }
        
        // Return success response
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ result })
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};
