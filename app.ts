import 'dotenv/config';
import express from 'express';
import mainRouter from './src/mainRouter.js';
import { baseMiddleware } from './src/middlewares/base.middleware.js';
import { globalErrorHandler } from './core/middlewares/globalErrorHandler.js';
import cookieParser from 'cookie-parser';
import { Options } from 'swagger-jsdoc';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { limiter } from './core/middlewares/rateLimiter.js';
import { checkCache } from './core/middlewares/cacheMiddleware.js';

const app = express();
const port = 3001;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(baseMiddleware);
// app.use(limiter(1, 60));
app.use(checkCache);

// Routes
app.use(mainRouter);

// Error handlers
app.use(globalErrorHandler);

// Swagger
export const swaggerOptions: Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: process.env.APP_NAME ?? 'New App',
            version: process.env.APP_VERSION ?? '1.0.0',
            description: process.env.APP_DESCRIPTION ?? 'New App',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
    },
    // Path to the API docs (where your route files are)
    apis: ['./src/modules/**/*.ts'],
};
const specs = swaggerJsdoc(swaggerOptions);
app.use(process.env.SWAGGER_ENDPOINT ?? '/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port} \nSwagger docs on http://localhost:${port}${process.env.SWAGGER_ENDPOINT ?? '/api-docs'}`);
});
