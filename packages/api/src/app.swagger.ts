import { INestApplication } from '@nestjs/common';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import YAML from 'yamljs';

export function setupSwagger(app: INestApplication) {
  const swaggerUiOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'CodersCamp App REST API docs',
  };

  SwaggerModule.setup('swagger', app, YAML.load('./rest-api-docs.yaml'), swaggerUiOptions);
}
