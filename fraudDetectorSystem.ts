import { FraudDetectorSystemInterface } from './fraudDetectorSystemInterface';

interface TransactionRecord { // Define la interfaz para representar una transacción con timestamp
    amount: number;
    timestamp: number;
}

export default class FraudDetectorSystem extends FraudDetectorSystemInterface {
    // TODO: Define aquí las propiedades privadas de tu clase (como tus Maps o arreglos)
    private userTransactions = new Map<string, TransactionRecord[]>; // Mapa para almacenar transacciones por usuario, cada transacción incluye monto y timestamp

    constructor() {
        super();
        // TODO: Inicializa tus estructuras de datos aquí
        this.userTransactions = new Map<string, TransactionRecord[]>(); // Inicializa el mapa de transacciones por usuario
    }

    // =========================================================================
    // 🚧 RETO NIVEL 1: RESUELTO
    // Debe añadir el monto al usuario y retornar el total acumulado de ese usuario.
    // =========================================================================
    public addTransaction(userId: string, amount: number): number {
        // TODO: Implementa tu solución aquí
        if (!this.userTransactions.has(userId)) {
            this.userTransactions.set(userId, []);
        }

        this.userTransactions.get(userId)?.push({ amount, timestamp: Date.now() }); // Simulamos un timestamp actual para las transacciones sin tiempo específico

        return this.getBalance(userId);
    }

    // =========================================================================
    // 🚧 RETO NIVEL 1: RESUELTO
    // Retorna el gasto total acumulado de un usuario. Si no existe, retorna 0.
    // =========================================================================
    public getBalance(userId: string): number {
        // TODO: Implementa tu solución aquí
        const transactions = this.userTransactions.get(userId);
        if (!transactions || transactions.length === 0) {
            return 0;
        }

        return transactions.reduce((acc, tx) => acc + tx.amount, 0); // Accedemos a la propiedad 'amount' de cada transacción para calcular el total
    }

    // =========================================================================
    // 🚧 RETO NIVEL 2: RESUELTO
    // Calcula la mediana del usuario. Si es par, aplica "leftmost integer".
    // Si el usuario no existe o no tiene transacciones, retorna null.
    // Recuerda: No mutar el orden del arreglo original si lo guardaste en un Map.
    // =========================================================================
    public getMedianSpent(userId: string): number | null {
        // TODO: Implementa tu solución aquí
        const transactions = this.userTransactions.get(userId);
        if (!transactions || transactions.length === 0) {
            return null;
        }

        // Se accede correctamente a la propiedad 'amount' de cada transacción para calcular la mediana
        const sortedTransactions = [...transactions].sort((a, b) => a.amount - b.amount); // Clonar y ordenar los montos de menor a mayor para no alterar el historial original
        const midIndex = Math.floor((sortedTransactions.length - 1) / 2);

        return sortedTransactions[midIndex].amount; // Retornar la propiedad 'amount' de la transacción en la posición media, aplicando la regla "leftmost" para casos pares
    }

    // =========================================================================
    // 🚧 RETO NIVEL 3: POR RESOLVER
    // Retorna el top 'k' de usuarios con mayor gasto acumulado.
    // En caso de empate en montos, ordenar alfabéticamente (A-Z) por userId.
    // =========================================================================
    public getTopSpenders(k: number): string[] {
        // TODO: Implementa tu solución aquí
        if (k < 1 || this.userTransactions.size === 0) {
            return [];
        }
        return Array.from(this.userTransactions.entries())
            .map(([userId, transactions]) => {
                const totalSpent = transactions.reduce((acc, curr) => acc + curr, 0);
                return { userId, totalSpent };
            })
            .sort((a, b) => {
                if (b.totalSpent !== a.totalSpent) {
                    return b.totalSpent - a.totalSpent; // Ordenar por gasto total descendente
                }
                return a.userId.localeCompare(b.userId); // Ordenar alfabéticamente en caso de empate
            })
            .slice(0, k)
            .map(spender => spender.userId)
    }

    // =========================================================================
    // 🚧 CHALLENGE NIVEL 4: UNSOLVED 🚧
    // El sistema arrojará error de compilación hasta que implementes estos contratos.
    // =========================================================================

    /**
     * Should register a transaction with a timestamp and return the updated 
     * active balance for the user within a 60,000ms rolling window.
     */
    public addTransactionWithTime(userId: string, amount: number, timestamp: number): number {
        // TODO: Implementa tu solución aquí para el Nivel 4
        return 0;
    }

    /**
     * Should return the top 'k' spenders considering ONLY active transactions
     * across the system relative to the currentTimestamp.
     */
    public getTopSpendersAtTime(k: number, currentTimestamp: number): string[] {
        // TODO: Implementa tu solución aquí para el Nivel 4
        return [];
    }
}
