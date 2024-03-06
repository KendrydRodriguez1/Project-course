import { HttpAdapter } from "../interface/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';
import {Injectable} from '@nestjs/common'

//va para seed servicies
@Injectable()
// Declara una clase llamada AxiosAdapter que implementa la interfaz HttpAdapter
export class AxiosAdapter implements HttpAdapter {
    // Declara una propiedad privada axios que es de tipo AxiosInstance y la inicializa con la instancia de axios
    private axios: AxiosInstance = axios;

    // Declara un método asincrónico llamado get que acepta un parámetro de tipo string llamado url y devuelve una promesa de tipo T
    async get<T>(url: string): Promise<T> {
        // Intenta realizar una solicitud HTTP GET usando axios
        try {
            // Espera a que la solicitud se complete y desestructura la respuesta para obtener solo los datos
            const { data } = await this.axios.get<T>(url);
            return data;
        }
        catch {
            throw new Error('ERROR');
        }
    }
}
