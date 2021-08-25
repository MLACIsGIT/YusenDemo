import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

const PORT = process.env.API_DOC_PORT || 5000;
const swaggerDocument = YAML.load('./openapi.yaml');
const app = express();

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => console.log(`API Doc Server running on port ${PORT}`));