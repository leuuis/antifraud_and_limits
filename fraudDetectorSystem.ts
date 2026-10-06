import { FraudDetectorSystemInterface } from './fraudDetectorSystemInterface';

export default class FraudDetectorSystem extends FraudDetectorSystemInterface {
    // TODO: Define aquí las propiedades privadas de tu clase (como tus Maps o arreglos)

    constructor() {
        super();
        // TODO: Inicializa tus estructuras de datos aquí
    }

    // =========================================================================
    // 🚧 RETO NIVEL 1: POR RESOLVER
    // Debe añadir el monto al usuario y retornar el total acumulado de ese usuario.
    // =========================================================================
    public addTransaction(userId: string, amount: number): number {
        // TODO: Implementa tu solución aquí
        return 0;
    }

    // =========================================================================
    // 🚧 RETO NIVEL 1: POR RESOLVER
    // Retorna el gasto total acumulado de un usuario. Si no existe, retorna 0.
    // =========================================================================
    public getBalance(userId: string): number {
        // TODO: Implementa tu solución aquí
        return 0;
    }

    // =========================================================================
    // 🚧 RETO NIVEL 2: POR RESOLVER
    // Calcula la mediana del usuario. Si es par, aplica "leftmost integer".
    // Si el usuario no existe o no tiene transacciones, retorna null.
    // Recuerda: No mutar el orden del arreglo original si lo guardaste en un Map.
    // =========================================================================
    public getMedianSpent(userId: string): number | null {
        // TODO: Implementa tu solución aquí
        return null;
    }

    // =========================================================================
    // 🚧 RETO NIVEL 3: POR RESOLVER
    // Retorna el top 'k' de usuarios con mayor gasto acumulado.
    // En caso de empate en montos, ordenar alfabéticamente (A-Z) por userId.
    // =========================================================================
    public getTopSpenders(k: number): string[] {
        // TODO: Implementa tu solución aquí
        return [];
    }
}
