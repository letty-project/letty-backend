const path = require("path");
const swaggerAutogen = require("swagger-autogen");

const options = {
  info: {
    version: "1.0.0",
    title: "Letty",
    description:
      "API 문서",
  },
  host: "http://localhost:4000",
  basePath: "/api",
  apis: ["../routes/*.ts"], //Swagger 파일 연동
};

const outputFile = "./src/api/swagger/swagger-output.json";
const endpointsFiles = [path.join(__dirname, '../routes/*.ts')];

swaggerAutogen(outputFile, endpointsFiles, options);