//sirve para las configuraciones de las vriables de entorno
export const EnvConfiguration = () => ({
    enviroment: process.env.NODE_ENV || 'dev', //verifica si estamos en entorno de desarrollo o produccion
    mongodb: process.env.MONGODB,
    port: process.env.PORT || 3002,
    defaultLimit: process.env.DEFAULT_LIMIT || 7,
})